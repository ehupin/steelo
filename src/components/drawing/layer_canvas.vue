<template>
  <!--<div>-->
    <canvas ref='canvas'
            :class="{inactive: $store.state.activeLayer != layerId}"
            v-show="$store.state.shots[shotId].visibleLayers.indexOf(layerId) != -1"
            :width="width"
            :height="height"
            :style="style"
            @mousedown="startDraw"
            @mousemove="moveDraw"
            @mouseup="endDraw"
            @mouseout="endDraw">
    </canvas>
  <!--</div>-->
</template>

<style>
canvas{
    position: absolute;
    cursor: url("../../assets/icons/pencil.png"), auto;
  }
  .inactive{
    pointer-events: none
  }
</style>

<script>
  export default {
    props:{
      layerId:'',
      shotId: '',
      color: Object,
    },
    mounted(){
      this.context = this.$refs.canvas.getContext("2d")
      let image = this.$store.state.layers[this.layerId].image
      this.context.drawImage(image, 0, 0)
    },
    data: function(){
      return {
        prevPos: {x:0, y:0},
        context: null,
        isDrawing: false,
      }
    },

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
    },
    methods:{
      save(){
        let imageUrl = this.$refs.canvas.toDataURL("image/png")
        this.$store.commit('SET_LAYER_IMAGE', {layerId: this.layerId, imageUrl: imageUrl})
      },
      getEventPos(event){
        let rect = this.$refs.canvas.getBoundingClientRect()
        return {x: event.clientX - rect.left,
                y: event.clientY - rect.top}
      },
      startDraw: function (e) {
        this.isDrawing = true
        this.prevPos.x = this.getEventPos(e)
      },
      moveDraw: function(e){
        if (!this.isDrawing){
          return
        }
        let eventPos = this.getEventPos(e)
        let posX = eventPos.x
        let posY = eventPos.y

        this.context.beginPath();
        this.context.moveTo(this.prevPos.x, this.prevPos.y);
        this.context.lineJoin = this.context.lineCap = 'round';
        this.context.lineTo(posX, posY);
        this.context.strokeStyle = `rgba(${this.color.rgba.r},${this.color.rgba.g},${this.color.rgba.b},${this.color.rgba.a})`;
        this.context.lineWidth = 6;
        this.context.stroke();

        this.prevPos.x = posX;
        this.prevPos.y = posY;

      },
      endDraw(){
        this.isDrawing = false
        this.save()
      },
    }
  }
</script>
