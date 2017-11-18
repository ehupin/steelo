<template>
  <div id="draw_area"
       ref="drawArea"
       :style="style"
        @mousemove="mouseMove">

    <layer_canvas v-for="layerId in $store.state.shots[shotId].layers"
                  ref="layers"
                  :key="layerId"
                  :layerId="layerId"
                  :shotId="shotId"
                  :color="color"
                  @showColorPicker="showColorPicker"></layer_canvas>

    <color-picker v-show="colorPickerIsVisible"
                  id="color-picker"
                  :style="{left: colorPickerPosition.x, top: colorPickerPosition.y}"
                  v-model="color"></color-picker>

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

  #color-picker{
    position: absolute;
  }
</style>

<script>

  import layer_canvas from './layer_canvas.vue'
  import drawing_canvas from './drawing_canvas.vue'
  import { Chrome } from 'vue-color'

  export default {
    components: {layer_canvas, drawing_canvas, 'color-picker': Chrome},
    mounted(){
      window.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('keyup', this.onKeyUp);
    },
    destroyed(){
      window.removeEventListener('keydown', this.onKeyPress);
      window.removeEventListener('keyup', this.onKeyUp);
    },
    data(){
      return{
        colorPickerIsVisible: false,
        colorPickerPosition: {},
        color: {rgba:{r:0, g:0, b:0, a:1}},
        lastMouseMoveEvent: Object
      }
    },
    props:{
      shotId: '',
    },
    computed: {
      width() {
        return this.$store.state.frameWidth
      },
      height() {
        return this.width / this.$store.state.frameRatio
      },
      style() {
        return {
          width: this.width + 'px',
          height: this.height + 'px',
        }
      },
    },
    methods:{
      onKeyDown(event){
        if (event.keyCode === 67) {
          let overedItems = document.querySelectorAll(":hover")
          if(Object.values(overedItems).includes(this.$refs.drawArea)){

            // the visiblility of color picker is tested (because key down event are fired until
            // a keyup event happen, so the showColorPicker would be  run too many times
            if (!this.colorPickerIsVisible) {
              this.showColorPicker()
            }
          }
        }
      },
      onKeyUp(event){
        if (event.keyCode === 67) {
          this.colorPickerIsVisible = false
        }
      },
      mouseMove(event){
        this.lastMouseMoveEvent = event
      },
      getEventPos(event){
        let rect = this.$refs.drawArea.getBoundingClientRect()
        return {x: event.clientX - rect.left,
          y: event.clientY - rect.top}
      },
      showColorPicker(){
        let mousePosition = this.getEventPos(this.lastMouseMoveEvent)
        this.colorPickerPosition = {x: mousePosition.x - 30 + 'px',
          y: mousePosition.y + 140 + 'px'}
        this.colorPickerIsVisible = true
      }
    },
  }
</script>
