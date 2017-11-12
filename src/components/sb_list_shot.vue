<template>
  <div id="sb_listItem" draggable="true" @dragstart="dragStart">

    <sb_sheet_drop_area :nextShotId="shotId" orientation="horizontal"/>

    <div id="sb_list_shot">

      <div :style="thumbnailStyle" @click="thumbnailClicked">
        <img :src="$store.getters.getShotThumbnail(shotId).src" />
      </div>

      <div id="shot_details">Shot {{paddedNumber}}</div>

      <!--<div id="description">-->
        <!--<input placeholder="Description..."/>-->
      <!--</div>-->

    </div>

    <sb_sheet_drop_area v-if="isLast" orientation="horizontal"/>

  </div>
</template>

<style scoped>

  #sb_list_shot{
    display: flex;
    flex-direction: row;
    margin: 0px;
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
