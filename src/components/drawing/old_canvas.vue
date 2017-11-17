<template>
  <!--<div>-->
    <canvas ref='canvas'
            :width="width"
            :height="height"
            :style="style"
            @mousedown="startDraw"
            @mousemove="moveDraw"
            @mouseup="isDrawing=false"
            @mouseout="isDrawing=false">
    </canvas>
    <!--<button @click="importImage">po</button>-->
  <!--</div>-->
</template>

<style>
  canvas{
    background-color: white;
    border:1px solid #000000;
  }
</style>

<script>
  export default {
    props:{
      layerId:''
    },


    data: function(){
      return {
        prevPos: {x:0, y:0},
        context: null,
        isDrawing: false,
      }
    },
    mounted: function(){
      this.context = this.$refs.canvas.getContext("2d")
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
          width: this.width,
          height: this.height,
        }
      },
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
        let eventPos = this.getEventPos(e)
        let posX = eventPos.x
        let posY = eventPos.y

        this.context.beginPath();
        this.context.moveTo(this.prevPos.x, this.prevPos.y);
        this.context.lineTo(posX, posY);
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 1.5;
        this.context.stroke();

        this.prevPos.x = posX;
        this.prevPos.y = posY;
      },
      importImage: function(){
        let imageObj = new Image();
        let that =  this
        imageObj.onload = function() {
          that.context.drawImage(imageObj, 0, 0);
        };
        imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
      }
    }
  }
</script>
