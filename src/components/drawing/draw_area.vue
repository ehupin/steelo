<template>
  <div id="draw_area" :style="style">

    <layer_canvas v-for="layerId in $store.state.shots[shotId].layers"
                  ref="layers"
                  :key="layerId"
                  :layerId="layerId"
                  :shotId="shotId"></layer_canvas>

  </div>
</template>

<style>
  #draw_area{
    /*background: linear-gradient(45deg, rgba(0,0,0,0.0980392) 25%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.0980392) 75%, rgba(0,0,0,0.0980392) 0), linear-gradient(45deg, rgba(0,0,0,0.0980392) 25%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.0980392) 75%, rgba(0,0,0,0.0980392) 0), rgb(255, 255, 255);*/
    /*background-repeat: repeat;*/
    border: black 2px solid;
    background: linear-gradient(45deg,
                                white 25%,
                                rgba(0,0,0,0) 25%,
                                rgba(0,0,0,0) 75%,
                                white 75%,
                                white 0),
                                linear-gradient(45deg,
                                                white 26%,
                                                rgba(0,0,0,0) 26%,
                                                rgba(0,0,0,0) 74%,
                                                white 74%,
                                                white 0),
                                                rgba(0, 0, 0, 0.05);
    background-repeat: repeat;
    background-position: 0 0, 10px 10px;
    background-origin: padding-box;
    background-clip: border-box;
    background-size: 20px 20px;
  }
</style>

<script>

  import layer_canvas from './layer_canvas.vue'
  import drawing_canvas from './drawing_canvas.vue'

  export default {
    components: {layer_canvas, drawing_canvas},
    computed:{
      width(){
        return this.$store.state.frameWidth
      },
      height(){
        return this.width / this.$store.state.frameRatio
      },
      style(){
        return{
          width: this.width + 'px',
          height: this.height + 'px',
        }
      },
      shotId(){
        return this.$store.state.drawingToolShot
      },
    },
  }
</script>
