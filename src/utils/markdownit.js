const md = require('markdown-it')();
const mark = require('./markdown-it-mark.js').default;
md.use(mark);


console.log(md);
export default md;
