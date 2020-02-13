const CodeMirror = require("codemirror/lib/codemirror");

CodeMirror.defineOption("topic", true, function(cm, val, old) {
  cm.on("change", onChange);
  // console.log("matchTags",cm,val);
});

const openTag = "#";
const closeTag = "#";
function onChange(cm,a,b){
  //查找话题
  let lines = [];
  cm.eachLine(line =>{
    lines.push(line);
  })
  let result = matchTopics(cm,lines);
  let callback = cm.getOption('matchTopics');
  //调用回调
  callback(result);
  // console.log(cm,a);
}

function matchTopics(cm,lines){

  let words = [];
  //findWordAt
  let lineNum = 0;
  for (let line of lines){
    let start = null;
    let stop = null;
    let word = "";
    let lastStart = 0;

    let text = line.text;

    checkMarks(cm,text,lineNum);
    for (let i = 0; i < text.length; i++) {
      let char = text.charAt(i);

      if (char === openTag && start == null){
        start = i;
        continue;
      }
      //防止和 md的 h标签重复
      if (start != null && text.charAt(start + 1) === " "){
        start = null;
        continue;
      }
      if (char === closeTag && start != null){
        stop = i;
      }

      if (stop - start === 1){
        start = i;
        stop = null;
        continue;
      }

      if (start != null && stop == null){
        word += char;
      }
      if (start != null && stop != null){
        if (stop - start > 1){
          words.push(word);

          //添加样式
          let from = {
            line: lineNum,
            ch: start
          };
          let to = {
            line: lineNum,
            ch: stop + 1
          };

          clearMarks(cm,from,to);

          cm.markText(from,to, {className: "CodeMirror-matching-topic"});
        }
        lastStart = stop + 1;
        word = "";
        start = null;
        stop = null;
      }
    }
    lineNum++;
  }

  return words;
}
function checkMarks(cm,text,lineNum) {
  let from = {
    line: lineNum,
    ch: 0
  };
  let to = {
    line: lineNum,
    ch: text.length - 1
  };
  let marks = cm.findMarks(from,to);
  for (let mark of marks){
    if (mark.className === "CodeMirror-matching-topic"){
      let pos = mark.find();
      let str = cm.getRange(pos.from,pos.to);
      if (!(str.substring(0,0) === openTag && str.substring(str.length - 1,str.length - 1) === closeTag)){
        mark.clear();
      }
    }
  }
}
function clearMarks(cm,from,to){
  let marks = cm.findMarks(from,to);
  for (let mark of marks){
    if (mark.className === "CodeMirror-matching-topic"){
      //清除标记
      mark.clear();
    }
  }
}
