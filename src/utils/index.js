import {quickTimeago} from './TimeUtil'


export default {
  quickTimeago,
  scrollTo(id){
    let top = $("#" + id)[0].offsetTop;
    document.documentElement.scrollTop = top;
  }
}
