const state = {
  nm: window.localStorage.getItem('nowNm') || '成都',
  id: window.localStorage.getItem('nowId') || 51
}

const action = {

}

const mutations = {
  SAVE_STATE(state,payload){
    state.nm = payload.nm;
    state.id = payload.id;
  }
}

export default {
  namespaced: true,
  state,
  action,
  mutations
}