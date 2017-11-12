<template>
  <div id="sb_sheetItem" draggable="true" @dragstart="dragStart">
    <sb_sheet_drop_area :nextShotId="shotId"/>
    <div id="sb_shot">
      <div>{{$store.getters.getShotIndex(shotId).toString().padStart(3,'0')}}</div>

      <div :style="style" @click="thumbnailClicked">
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
  #sb_sheetItem{
    display: flex;
    flex-direction: row;
    padding-bottom: 20px;
    cursor: grab;
  }
  #sb_shot{
    padding: 20px;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
  }
  img{
    width: inherit;
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
    data: function(){
      return {
        thumbnailWidth : 300
      }
    },
    mixins: [sb_shot_item_MIXIN]
//    props: {
//      shotId : '',
//    },
//    computed: {
//      style(){
//        return {
//          width: this.thumbnailWidth + 'px',
//          height: this.thumbnailWidth / this.$store.state.frameRatio + 'px',
//          border: 'solid black 1px',
//        }
//      },
//      isLast(){
//        return this.$store.getters.getShotIndex(this.shotId) == this.$store.state.shotsOrder.length -1
//      }
//    },
//    methods:{
//      thumbnailClicked(){
//        EventBus.$emit('openDrawingTool', this.shotId)
//      },
//      dragStart(event){
//        console.log(event)
//        event.dataTransfer.setData("text", this.shotId);
//      }
//    }
  }
</script>
