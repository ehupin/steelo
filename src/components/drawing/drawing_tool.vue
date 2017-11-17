<template>
  <div id="background" v-if="visible">
    <div id="drawing_tool">
      <div>Shot {{$store.getters.getShotIndex(shotId)}}</div>
      <div id="main_area">
        <draw_area ref="drawCanvas"></draw_area>
        <layerStack/>
      </div>


      <button @click="saveThumbnail">Save</button>
    </div>
  </div>
</template>

<style scoped>
  #background{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.79);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #main_area{
    display: flex;
    flex-direction: row;
  }
</style>

<script>
  import draw_area from './draw_area.vue'
  import layerStack from './layerStack.vue'

  import {EventBus} from '../../_eventBus.js'

  export default {
    components: {draw_area, layerStack},
    mounted(){
      EventBus.$on('thumbnailClicked', this.setShot)
    },
    data(){
      return {
        visible: false
      }
    },
    computed: {
      shotId(){
        return this.$store.state.drawingToolShot
      }
    },
    methods: {
      saveThumbnail(){
        let imageUrl = this.$refs.drawCanvas.$refs.canvas.toDataURL("image/png")
        this.$store.commit('SET_SHOT_IMAGE', {shotId: this.shotId, imageUrl: imageUrl})
        this.$emit('exit')
      },
      setShot(shotId){
        this.visible= true;
        this.$store.commit('SET_DRAWINGTOOL_SHOT', {shotId: shotId})

        let outputCanvas = new Can
        for (let layer in this.$store.state.shots[shotId].visibleLayers){
        }
      }
    }

  }
</script>


