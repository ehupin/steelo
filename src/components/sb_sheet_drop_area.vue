<template>
  <div class="interShot"
        :class="{ expanded: expanded,
                  vertical: orientation === 'vertical',
                  horizontal: orientation === 'horizontal'
                }"

        @mouseover="mouseOver=true; expanded=true"
        @mouseout="mouseOver=false; expanded=false"
        @click="insertShot"

        @dragover="onDragOver"
        @dragleave="dragLeave">

    <div v-if="mouseOver" class="plusSign">
      +
    </div>

      <div class="dropIcon top"
           v-if="dragOver"
           @dragover="aboutToMove=true"
           @dragleave="aboutToMove=false"
           @drop="moveDroppedShot"
           :class="{overed: aboutToMove}">
        <img class="dropIconImage" src="../assets/icons/move.png">
      </div>

      <div class="dropIcon"
           v-if="dragOver"
           @dragover="aboutToCopy=true"
           @dragleave="aboutToCopy=false"
           @drop="copyDroppedShot"
           :class="{overed: aboutToCopy}">
        <img class="dropIconImage" src="../assets/icons/copy.png">
      </div>
    <!--</div>-->

  </div>
</template>

<style>
  .fade-enter-active{
    transition: opacity 4s
  }

  .fade-enter,
  .fade-leave-to
  {
    /*opacity: 0;*/
  }

  .interShot{
    cursor: pointer;
    transition: width 0.3s, height 0.3s, background 0.3s;
    display: flex;

  }
  .vertical{
    height: inherit;
    width: 30px;
    flex-direction: column;
  }
  .horizontal{
    height: 8px;
    width: inherit;
    flex-direction: row;
  }
  .expanded{
    background-color: #ececec;
    transition: width 0.3s, height 0.3s, background 0.3s;
  }
  .expanded.vertical{
    font-size: 60px;
    width: 60px;
  }
  .expanded.horizontal{
    font-size: 20px;
    height: 35px;
  }
  .dragArea{
    display: flex;
    flex-direction: column;
    height: 100%
  }

  .dropIcon{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .dropIcon.top{
    border-bottom: solid white 1px;
  }
  .dropIcon.overed{
    background-color: #414141;
  }
  .dropIconImage{
    pointer-events: none;
  }
  .plusSign{
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: inherit;
    height: 100%;
    width: 100%;
    background-color: #414141;
  }
</style>

<script>
  export default {
    data(){
      return{
        expanded: false,
        mouseOver: false,
        dragOver : false,
        aboutToCopy:false,
        aboutToMove:false,
      }
    },
    props: {
      nextShotId: '',
      orientation: {
        default: 'vertical'
      },
    },
    methods:{
      insertShot(){
        this.$store.commit('ADD_SHOT', {before: this.nextShotId})
        this.expanded = false;
        this.mouseOver = false;
      },
      onDragOver(event){
        event.preventDefault();
        event.stopPropagation();
        this.dragOver = true;
        this.expanded = true;
      },
      dragLeave(event){
        this.dragOver = false;
        this.expanded = false;
        event.preventDefault();
        event.stopPropagation();
      },
      moveDroppedShot(event){
        event.preventDefault();
        var shotId = event.dataTransfer.getData("text");
        this.$store.commit('MOVE_SHOT', {shotId: shotId, before: this.nextShotId})
        this.dragOver = false;
        this.expanded = false;
      },
      copyDroppedShot(event){
        event.preventDefault();
        var shotId = event.dataTransfer.getData("text");
        this.$store.commit('COPY_SHOT', {shotId: shotId, before: this.nextShotId})
        this.dragOver = false;
        this.expanded = false;
      }
    }
  }
</script>
