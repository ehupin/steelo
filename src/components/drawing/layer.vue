<template>
  <div class="layer" @click="activate" :class="{activated: $store.state.activeLayer === layerId}">
    <button @click="toggleVisibility" :class="{notvisible: $store.state.shots[shotId].visibleLayers.indexOf(layerId) == -1}">V</button>
    <input v-model="name" placeholder="Name..."/>
  </div>
</template>
<style>
  .layer{
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
    padding: 10px;
    margin: 5px;
    margin-left: 15px;
    background: #f4f4f4;

  }
  .activated{
    background: white;
    /* box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.2); */
    margin-left: 0;
  }
  .notvisible{
    color: #d2d2d2;
  }
  .layer input {
    font-style: italic;
    border: none;
    outline-width: 0;
    background: none;
  }
</style>

<script>
export default {
  props:{
    layerId: '',
    shotId: '',
  },
  data(){
    return {
      visibility: true,
    }
  },
  mounted(){
    this.activate()
  },
  computed: {
    name: {
      get () {
        return this.$store.state.layers[this.layerId].name
      },
      set (value) {
        this.$store.commit('SET_LAYER_NAME', {layerId: this.layerId, name: value})
      }
    }
  },
  methods: {
    activate(){
      this.$store.commit('SET_ACTIVE_LAYER', {layerId: this.layerId})
    },
    toggleVisibility(event){
      event.stopPropagation()
      this.$store.commit('TOGGLE_LAYER_VISIBILITY', {layerId: this.layerId, shotId: this.shotId})
    }
  }
}
</script>
