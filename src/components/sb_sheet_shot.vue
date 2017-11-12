<template>
  <div id="sb_sheetItem" draggable="true" @dragstart="dragStart" :style="{height: cardHeight}">

    <sb_sheet_drop_area :nextShotId="shotId"/>


    <div id="sb_shot" >

      <div class="delete-button-container">
        <i class="fa fa-close delete-button"></i>
      </div>

      <div>Shot {{paddedNumber}}</div>

      <div :style="thumbnailStyle" @click="thumbnailClicked">
        <img :src="$store.getters.getShotThumbnail(shotId).src" />
      </div>

      <div id="description">
        <input placeholder="Description..."/>
      </div>

    </div>

    <sb_sheet_drop_area v-if="isLast" />

  </div>
</template>

<style scoped>
  .delete-button-container{
    height: 20px;
    display: flex;
    flex-direction: row-reverse;
  }
  .delete-button{
    font-size: 24px;
    color: #ebebeb;
    transition: color 0.1s;
    cursor: pointer;
  }
  .delete-button:hover{
    font-size: 24px;
    color: #b7b7b7;
    transition: color 0.1s;
  }
  #sb_sheetItem{
    display: flex;
    flex-direction: row;
    padding-bottom: 20px;
    cursor: grab;
  }
  #sb_shot{
    background-color: white;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
  }
  img{
    width: inherit;
    /*cursor: url("../assets/icons/pencil.png")*/
  }
  #description input{
    font-style: italic;
    border: none;
    width: 100%;
    outline-width: 0;
    /*color: #d9d9d9*/
  }

</style>

<script>

  import {EventBus} from '../_eventBus.js'
  import sb_sheet_drop_area from './sb_sheet_drop_area.vue'
  import {sb_shot_item_MIXIN} from './sb_shot_item_MIXIN.js'

  export default {
    components: {sb_sheet_drop_area},
    mixins: [sb_shot_item_MIXIN],
    data: function(){
      return {
        thumbnailWidth : 300
      }
    },
    computed:{
      cardHeight(){
        return this.thumbnailHeight + 100 + 'px'
      }
    }
  }
</script>
