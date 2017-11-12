<template>
  <div id="background">
    <div id="drawing_tool">
      <div>Shot {{$store.getters.getShotIndex(shotId)}}</div>
      <draw_area ref="drawCanvas"></draw_area>
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
  #drawin_tool{
    width: 80%;
    height: 80%;
  }
</style>

<script>
  import draw_area from './draw_area.vue'
  export default {
    components: {draw_area},
    props:{
      shotId: '',
    },
    mounted(){
      let image = this.$store.getters.getShotImage(this.shotId)
      this.$refs.drawCanvas.$refs.canvas.getContext('2d').drawImage(image, 0, 0)
    },
    methods: {
      saveThumbnail(){
        let imageUrl = this.$refs.drawCanvas.$refs.canvas.toDataURL("image/png")
        this.$store.commit('SET_SHOT_IMAGE', {shotId: this.shotId, imageUrl: imageUrl})
        this.$emit('exit')
      }
    }

  }
</script>
