<template>
  <div ref="droparea" class="drop-area"
        @mouseover="overed=true"
        @mouseout="overed=false"
       :class="{overed: overed}"
        @click="dropAreaClicked"
       @dragover="onDragOver"
       @dragleave="overed=false"
       @drop="itemDroped">

    <div v-if="overed" class="plusSign"> +</div>

  </div>
</template>

<style>
  .drop-area{
    height: inherit;
    width: 10px;
    margin: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    cursor: pointer;
    transition: width 0.1s, background 0.1s;

  }
  .overed{
    width: 60px;
    background-color: #ececec;
    transition: width 0.1s, background 0.1s;
  }

  .plusSign{
    font-size: 60px;
    color: #ffffff;
    user-select: none;
    cursor: inherit;
  }
</style>

<script>
  export default {
    data(){
      return{
        overed: false
      }
    },
    props: {
      nextShotId: '',
    },
    methods:{
      dropAreaClicked(){
        this.$store.commit('ADD_SHOT', {before: this.nextShotId})
      },
      onDragOver(event){
        event.preventDefault();
        this.overed = true;
      },
      itemDroped(event){
        event.preventDefault();
        var shotId = event.dataTransfer.getData("text");
        this.$store.commit('MOVE_SHOT', {shotId: shotId, before: this.nextShotId})
        this.overed = false;
//        ev.target.appendChild(document.getElementById(data));
      }
    }
  }
</script>
