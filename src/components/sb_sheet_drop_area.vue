<template>
  <div class="interShot"
        :class="{ expanded: expanded,
                  vertical: orientation === 'vertical',
                  horizontal: orientation === 'horizontal'
                }"

        @mouseover="mouseOver=true; expanded=true"
        @mouseout="mouseOver=false; expanded=false"
        @click="insertShot"

        @dragenter="onDragOver"
        @dragleave="dragLeave">
    <div v-if="mouseOver" class="plusSign" key="add">
      +
    </div>
    <div v-else class="dropArea" key="add" :class="{
                vertical: orientation === 'vertical',
                horizontal: orientation === 'horizontal'
              }">
      <div class="dropIcon top"
           v-if="dragOver"
           @dragover="dragOverMoveIcon"
           @dragleave="aboutToMove=false"
           @drop="moveDroppedShot"
           :class="{overed: aboutToMove}">
        <img class="dropIconImage" src="../assets/icons/move.png">
      </div>

      <div class="dropIcon"
           v-if="dragOver"
           @dragover="dragOverCopyIcon"
           @dragleave="aboutToCopy=false"
           @drop="copyDroppedShot"
           :class="{overed: aboutToCopy}">
        <img class="dropIconImage" src="../assets/icons/copy.png">
      </div>
    </div>


  </div>
</template>

<style>

  .interShot{
    cursor: pointer;
    display: flex;
    transition: width 0.3s, height 0.3s;
  }
  .vertical{
    font-size: 60px;
    height: inherit;
    width: 30px;
    flex-direction: column;
  }
  .horizontal{
    font-size: 30px;
    height: 12px;
    width: inherit;
    flex-direction: row;
  }
  .expanded.vertical{
    width: 60px;
    transition: width 0.3s;
  }
  .expanded.horizontal{
    height: 35px;
    transition: height 0.3s;
  }
  .dropArea.vertical {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%
  }
  .dropArea.horizontal {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%
  }
  .dropIcon{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #c4c4c4;
  }
  .dropIcon.overed {
    background-color: #282828;
  }
  .dropIcon.top{
    border-bottom: solid white 1px;
  }
  .dropIconImage{
    pointer-events: none;
  }
  .plusSign{
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: #282828;
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
        dragDepth: 0,
      }
    },
    props: {
      nextShotId: '',
      previousShotId: '',
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
        this.dragDepth += 1
        this.expanded = true;
        this.dragOver = true;
      },
      dragLeave(event){
        this.dragDepth -= 1
        if (this.dragDepth === 0){
          this.dragOver = false;
          this.expanded = false;
        }
        event.stopPropagation();
        event.preventDefault();
      },
      dragOverMoveIcon(event){
        event.preventDefault();
        event.stopPropagation();
        this.aboutToMove=true
      },
      dragOverCopyIcon(event){
        event.preventDefault();
        event.stopPropagation();
        this.aboutToCopy=true
      },
      moveDroppedShot(event){
        event.preventDefault();
        let shotId = event.dataTransfer.getData("text");
        this.$store.commit('MOVE_SHOT', {shotId: shotId, before: this.nextShotId})
        this.dragOver = false;
        this.expanded = false;
      },
      copyDroppedShot(event){
        event.preventDefault();
        let shotId = event.dataTransfer.getData("text");
        this.$store.commit('COPY_SHOT', {shotId: shotId, before: this.nextShotId})
        this.dragOver = false;
        this.expanded = false;
      }
    }
  }
</script>
