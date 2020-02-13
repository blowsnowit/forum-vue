
export default {
  ADD_ACTIVE(state){
    state.active++;
  },
  SET_ISMOBILE(state,isMobile){
    state.isMobile = isMobile;
  },

  SET_UN_READ_NOTIFY_NUM(state,num){
    state.unReadNotifyNum = num;
  }
}
