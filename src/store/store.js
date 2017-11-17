import Vue from 'vue'
import Vuex from 'vuex'
import uuidv4 from 'uuid'

Vue.use(Vuex)

function Shot(){
  this.id = uuidv4();
  this.description = '';
  this.image = null;
  this.layers = [];
  this.visibleLayers = []
}

function Layer(){
  this.id = uuidv4();
  this.name = '';
  this.image = null;
}

const store = new Vuex.Store({
  state: {
    frameRatio: 1.77,
    frameWidth: 800,
    shots: {},
    shotsOrder: [],
    layers: {},
    activeLayer: '',
    activeCanvas: Object,
    drawingToolShot:'',
  },
  actions: {
    addShot({commit}) {
      commit('ADD_SHOT')
    },
  },
  mutations: {
    ADD_SHOT(state, data){
      // create shot
      let shot = new Shot();
      shot.image = new Image(state.frameWidth, state.frameWidth/state.frameRatio)
      Vue.set(state.shots, shot.id, shot);

      // create first layer
      let layer =new Layer();
      layer.image = new Image(state.frameWidth, state.frameWidth/state.frameRatio)
      Vue.set(state.layers, layer.id, layer);

      // add layer to shot
      shot.layers.push(layer.id)
      shot.visibleLayers.push(layer.id)

      // insert it in order
      if (data && data.before){
        let insertIndex = state.shotsOrder.indexOf(data.before);
        state.shotsOrder.splice( insertIndex, 0, shot.id );
      }else{
        state.shotsOrder.push(shot.id);
      }
    },
    SET_SHOT_DESCRIPTION(state, data){
      state.shots[data.shotId].description = data.description
    },
    CHANGE_RATIO(state){
      state.frameRatio = 1.7
    },
    SET_SHOT_IMAGE(state, data){
      let newImage = new Image()
      newImage.src = data.imageUrl
      Vue.set(state.shots[data.shotId], 'image', newImage);
    },
    SET_LAYER_IMAGE(state, data){
      let newImage = new Image()
      newImage.src = data.imageUrl
      Vue.set(state.layers[data.layerId], 'image', newImage);
    },

    MOVE_SHOT(state,data){
      // get shot position and remove it from shosOrder list
      let from = state.shotsOrder.indexOf(data.shotId);
      state.shotsOrder.splice(from, 1);

      // if shot must be placed before an other one, insert it
      if (data && data.before){
        let to = state.shotsOrder.indexOf(data.before);
        state.shotsOrder.splice( to, 0, data.shotId );

      // else add it to the end of the list
      }else{
        state.shotsOrder.push(data.shotId)
      }
    },
    COPY_SHOT(state, data){
      let originalShot = state.shots[data.shotId]

      let copiedShot = new Shot();
      copiedShot.description = originalShot.description
      copiedShot.image = originalShot.image.cloneNode()

      Vue.set(state.shots, copiedShot.id, copiedShot);

      // if shot must be placed before an other one, insert it
      if (data && data.before){
        let to = state.shotsOrder.indexOf(data.before);
        state.shotsOrder.splice( to, 0, copiedShot.id );

        // else add it to the end of the list
      }else{
        state.shotsOrder.push(copiedShot.id)
      }
    },
    DELETE_SHOT(state, data){
      let shotIndex = state.shotsOrder.indexOf(data.shotId)
      state.shotsOrder.splice(shotIndex, 1);

      delete state.shots[data.shotId]
    },
    SET_LAYER_NAME(state, data){
      state.layers[data.layerId].name = data.name
    },
    ADD_LAYER(state, data){
      // create first layer
      let layer =new Layer();
      layer.image = new Image(state.frameWidth, state.frameWidth/state.frameRatio)
      Vue.set(state.layers, layer.id, layer);

      // add layer to shot
      state.shots[data.shotId].layers.push(layer.id)
      state.shots[data.shotId].visibleLayers.push(layer.id)

    },
    SET_ACTIVE_LAYER(state, data){
      // add layer to shot
      state.activeLayer = data.layerId
    },
    SET_DRAWINGTOOL_SHOT(state, data){
      // add layer to shot
      state.drawingToolShot = data.shotId
    },
    TOGGLE_LAYER_VISIBILITY(state, data){
      if (state.shots[data.shotId].visibleLayers.indexOf(data.layerId) == -1){
        state.shots[data.shotId].visibleLayers.push(data.layerId)
      }else{
        let layerIndex = state.shots[data.shotId].visibleLayers.indexOf(data.layerId);
        state.shots[data.shotId].visibleLayers.splice(layerIndex, 1);
      }

    },
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
