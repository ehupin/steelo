<template>
  <div id="app">
    <sb_list></sb_list>
    <div id="mainArea">
      <drawing_tool v-if="showDrawingTool" :shotId="shotIdToDraw" @exit="showDrawingTool=false"></drawing_tool>
      <sb_sheet></sb_sheet>
    </div>

  </div>
</template>

<style>
  body, html, #app{
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  body, input {
    font-family: Ubuntu;
    font-size: 12;
  }
  #app{
    display: flex;
    flex-direction: row;
  }
  #mainArea{
    width: 100%;
    height: 100%;
  }
</style>

<script>

  import sb_list from './components/sb_list.vue'
  import sb_sheet from './components/sb_sheet.vue'
  import drawing_tool from './components/drawing/drawing_tool.vue'
  import {EventBus} from './_eventBus.js'

  export default {
    name: 'app',
    components: {sb_sheet, sb_list, drawing_tool},
    data () {
      return {
        showDrawingTool: false,
        shotIdToDraw: '',
      }
    },
    mounted(){
      EventBus.$on('openDrawingTool', shotId => {
        this.shotIdToDraw = shotId;
        this.showDrawingTool= true;
      })
    },
  }
</script>


