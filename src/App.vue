<template>

  <div id="app">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <sb_list></sb_list>
    <div id="mainArea">
      <drawing_tool></drawing_tool>
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
    font-family: "Lucida Console";
    font-size: 12px;
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


  export default {
    name: 'app',
    components: {sb_sheet, sb_list, drawing_tool},
  }
</script>


