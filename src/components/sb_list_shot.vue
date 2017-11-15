<template>
  <div id="sb_listItem" draggable="true" @dragstart="dragStart">

    <sb_sheet_drop_area :nextShotId="shotId" orientation="horizontal"/>

    <div id="sb_list_shot">

      <div :style="thumbnailStyle" @click="thumbnailClicked">
        <img :src="$store.getters.getShotThumbnail(shotId).src" />
      </div>

      <div class="shot_details">
        <div class="shot_headers">
          Shot {{paddedNumber}}
          <i class="fa fa-close delete-button" @click="deleteShot"></i>
        </div>

        <div id="description">
          <input v-model="description" placeholder="Description..."/>
        </div>
      </div>

    </div>

    <sb_sheet_drop_area v-if="isLast" orientation="horizontal" />

  </div>
</template>

<style scoped>

  .shot_headers{
    display: flex;
    justify-content: space-between;
  }

  .delete-button{
    font-size: 16px;
    color: #ebebeb;
    transition: color 0.1s;
    cursor: pointer;
  }
  .delete-button:hover{
    color: #b7b7b7;
    transition: color 0.1s;
  }

  #sb_list_shot{
    display: flex;
    flex-direction: row;
    margin: 0px;
    padding: 5px;
    background: white;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
  }
  img{
    height: inherit;
  }

  .shot_details{
    padding-left: 5px;
    display: flex;
    flex-direction: column;
  }
  #description input {
    font-style: italic;
    border: none;
    width: 100%;
    outline-width: 0;
  }
  ::-webkit-input-placeholder{
    color: #bfbfbf;
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
        thumbnailWidth : 60,
      }
    }
  }
</script>
