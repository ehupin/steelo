import Vue from 'vue'
import Vuex from 'vuex'
import uuidv4 from 'uuid'

Vue.use(Vuex)

function Shot(){
  this.id = uuidv4();
  this.description = '';
  this.image = new Image()
  this.layers = []
}

const store = new Vuex.Store({
  state: {
    frameRatio: 1.77,
    shots: {},
    shotsOrder: [],
    layers: {}
  },
  actions: {
    addShot({commit}) {
      commit('ADD_SHOT')
    },
  },
  mutations: {
    ADD_SHOT(state, data){
      let shot = new Shot();
      Vue.set(state.shots, shot.id, shot);

      if (data && data.before){
        let insertIndex = state.shotsOrder.indexOf(data.before);
        state.shotsOrder.splice( insertIndex, 0, shot.id );
      }else{
        state.shotsOrder.push(shot.id);
      }

    },
    CHANGE_RATIO(state){
      state.frameRatio = 1.7
    },
    SET_SHOT_IMAGE(state, data){
      let newImage = new Image()
      newImage.src = data.imageUrl
      Vue.set(state.shots[data.shotId], 'image', newImage);
    },
    MOVE_SHOT(state,data){
      let from = state.shotsOrder.indexOf(data.shotId);
      state.shotsOrder.splice(from, 1);

      if (data && data.before){
        let to = state.shotsOrder.indexOf(data.before);
        state.shotsOrder.splice( to, 0, data.shotId );
      }else{
        state.shotsOrder.push(data.shotId)
      }


    }
  },
  getters: {
    getShotIndex:(state, geters) => (shotId) =>{
      return state.shotsOrder.indexOf(shotId)
    },
    getShotThumbnail:(state, geters) => (shotId) =>{
      return state.shots[shotId].image
    },
    getShotImage:(state, geters) => (shotId) =>{
      return state.shots[shotId].image
    }
  },
  modules:{

  }

})

export default store
