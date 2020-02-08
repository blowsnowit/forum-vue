
// Process ~subscript~

'use strict';

// same as UNESCAPE_MD_RE plus a space
var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;


function subscript(state, silent) {
  var found,
      content,
      token,
      max = state.posMax,
      start = state.pos;

  if (state.src.charAt(start) !== '#'/* ~ */) { return false; }
  if (silent) { return false; } // don't run any pairs in validation mode
  if (start + 1 >= max) { return false; }
  console.log('subscript',state,silent,state.src,start);

  state.pos = start + 1;

  while (state.pos < max) {
    console.log(state.src,state.pos,state.src.charAt(state.pos));
    if (state.src.charAt(state.pos) === '#'/* ~ */) {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || state.pos === start  + 1) {
    state.pos = start;
    return false;
  }

  content = state.src.slice(start, state.pos + 1);

  // don't allow unescaped spaces/newlines inside
  console.log('found',content);
  if (!content.match(/#(.*?)#/)) {
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 1;

  // Earlier we checked !silent, but this implementation does not need it
  token         = state.push('sub_open', 'span', 1);
  token.markup  = '#';
  token.attrSet('class','CodeMirror-matching-topic');

  token         = state.push('text', '', 0);
  token.content = content.replace(UNESCAPE_RE, '$1');

  token         = state.push('sub_close', 'span', -1);
  token.markup  = '#';

  state.pos = state.posMax + 1;
  state.posMax = max;
  return true;
}


export default function sub_plugin(md) {
  md.inline.ruler.after('emphasis', 'topic', subscript);
};
