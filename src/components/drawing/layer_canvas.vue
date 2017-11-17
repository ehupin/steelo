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
            @mouseup="isDrawing=false"
            @mouseout="isDrawing=false">
    </canvas>
  <!--</div>-->
</template>

<style>
  canvas{
    position: absolute;
  }
  .inactive{
    pointer-events: none
  }
</style>

<script>
  export default {
    props:{
      layerId:'',
      shotId: ''
    },
    mounted(){
      console.log('opopooppo')
      this.context = this.$refs.canvas.getContext("2d")
      let image = this.$store.state.layers[this.layerId].image
      this.context.drawImage(image, 0, 0)
    },
    beforeDestroy(){
      let imageUrl = this.$refs.canvas.toDataURL("image/png")
      this.$store.commit('SET_LAYER_IMAGE', {layerId: this.layerId, imageUrl: imageUrl})
      console.log('boum')
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
      getEventPos(event){
        let rect = this.$refs.canvas.getBoundingClientRect()
        return {x: event.clientX - rect.left,
                y: event.clientY - rect.top}
      },
      startDraw: function (e) {
        console.log(this.$store.state.layers[this.layerId].name)
        console.log(this.context)
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
      },
      draw(drawDatas){

        this.context.beginPath();
        this.context.moveTo(drawDatas.prevPosX, drawDatas.prevPosY);
        this.context.lineTo(drawDatas.currentPosX, drawDatas.currentPosY);
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 1.5;
        this.context.stroke();
      }
    }
  }
</script>
