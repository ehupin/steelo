<template>
  <div id="sb_list_shot">


    <div :style="style">
      <img :src="$store.getters.getShotThumbnail(shotId).src" />
    </div>

    <div id="shot_details">Shot {{$store.getters.getShotIndex(shotId)}}</div>
  </div>
</template>

<style scoped>

  #sb_list_shot{
    display: flex;
    flex-direction: row;
    margin: 5px;
    padding: 5px;
    background: white;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
  }
  img{
    width: inherit;
  }

  #shot_details{
    padding-left: 5px;
  }
</style>

<script>
  export default {
    data: function(){
      return {
        thumbnailWidth : 60,
      }
    },
    props: {
      shotId : '',
    },
    computed: {
      style(){
        return {
          width: this.thumbnailWidth + 'px',
          height: this.thumbnailWidth / this.$store.state.frameRatio + 'px',
          border: 'solid black 1px',
        }
      }
    }
  }
</script>
