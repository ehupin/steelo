<template>
  <div id="layer-stack" :style="{height: height + 'px'}">
    <div id="layer-list-wrapper">
      <div id="layer-list">
        <layer v-for="(layerId,index) in $store.state.shots[shotId].layers"
               :key="layerId"
               :layerId="layerId"
               :index="index"
               :shotId="shotId"></layer>
      </div>
    </div>
    <div id="add-layer-button" @click="addLayer">Add layer</div>
  </div>
</template>
<style>
  #layer-stack {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  #layer-list-wrapper{
    flex: 1;
    display: flex;
    overflow: auto;
  }
  #layer-list {
    min-height: min-content;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    margin-bottom: 10px;
  }

  #add-layer-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    background: #f8f8f8;
    cursor: pointer;
  }

</style>
<script>
  import layer from './layer.vue'

  export default {
    components: {layer},
    props: {
      shotId: '',
    },
    computed:{
      height(){
        return this.$store.state.frameWidth/ this.$store.state.frameRatio
      },
    },
    methods: {
      addLayer(){
        this.$store.commit('ADD_LAYER', {shotId: this.shotId})
      }
    }
  }

</script>
