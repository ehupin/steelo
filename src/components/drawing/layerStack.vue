<template>
  <div id="layer-stack">
    <button @click="addLayer">Add layer</button>

    <layer v-for="layerId in $store.state.shots[shotId].layers"
           :key="layerId"
           :layerId="layerId"
           :shotId="shotId"></layer>
  </div>
</template>
<style>
  #layer-stack{
    margin: 10px;
  }

</style>
<script>
  import layer from './layer.vue'

  export default {
    components: {layer},
    props: {
      shotId: '',
    },
    methods: {
      addLayer(){
        this.$store.commit('ADD_LAYER', {shotId: this.shotId})
      }
    }
  }

</script>
