<template>
  <div id="background" ref="drawingToolBackground" v-if="visible" @click="exit">
    <div id="drawing_tool">
      <div id="shot-number">Shot {{paddedShotNumber}}</div>
      <div id="main_area">
        <draw_area ref="drawCanvas" :shotId="shotId"></draw_area>
        <layerStack :shotId="shotId"/>
      </div>
      <div id="shortcuts"> Press C for color picker</div>
    </div>
  </div>
</template>

<style scoped>
  #background{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #main_area{
    display: flex;
    flex-direction: row;
  }
  #shot-number{
    font-size: 40px;
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
        visible: false,
        shotId: '',
      }
    },
    computed: {
      width(){
        return this.$store.state.frameWidth
      },
      height(){
        return this.width / this.$store.state.frameRatio
      },
      paddedShotNumber(){
        return this.$store.getters.getShotIndex(this.shotId).toString().padStart(3,'0')
      },
    },
    methods: {
      saveThumbnail(){

        let offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = this.width;
        offscreenCanvas.height = this.height;
        let context = offscreenCanvas.getContext('2d');
        for (let layerId of this.$store.state.shots[this.shotId].layers){
          if(this.$store.state.shots[this.shotId].visibleLayers.includes(layerId)){
            context.drawImage(this.$store.state.layers[layerId].image, 0, 0)
          }
        }
        let imageUrl = offscreenCanvas.toDataURL("image/png")
        this.$store.commit('SET_SHOT_IMAGE', {shotId: this.shotId, imageUrl: imageUrl})

      },
      exit(event){
        if (event.target === this.$refs.drawingToolBackground){
          this.saveThumbnail();
          this.visible = false;
        }
      },
      setShot(shotId){
        this.visible= true;
        this.shotId = shotId
      }
    }

  }
</script>


