<template>
  <div>
  <layer_canvas v-for="layerId in $store.state.shots[shotId].layers"
      ref="layers"
      :key="layerId"
      :layerId="layerId"
      :shotId="shotId"></layer_canvas>
  </div>
</template>

<style>
</style>

<script>
  import layer_canvas from './layer_canvas.vue'

  export default {
    components: {layer_canvas},
    props:{
      shotId: ''
    },
    mounted: function(){
      this.context = this.$refs.canvas.getContext("2d")
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
      shotId(){
          return this.$store.state.drawingToolShot
      },
      layers(){
        for (let layerId in this.$store.state.shots[this.shotId].layers){
        }
      }
    },
    methods:{
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
        let eventPos = this.getEventPos(e);
        let posX = eventPos.x;
        let posY = eventPos.y;

        this.context.beginPath();
        this.context.moveTo(this.prevPos.x, this.prevPos.y);
        this.context.lineTo(posX, posY);
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 1.5;
        this.context.stroke();


        this.prevPos.x = posX;
        this.prevPos.y = posY;
      }
    }
  }
</script>
