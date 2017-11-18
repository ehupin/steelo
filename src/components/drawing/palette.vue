<template>
  <div>
    <div id="brushSize">
      Size: <input v-model="size" value="10">
    </div>
    <chrome-picker v-model="colors" />
  </div>
</template>
<script>
  import { Chrome } from 'vue-color'

  export default {
    components:{'chrome-picker': Chrome},
    data(){
      return{
        size: '',
        colors: Object
      }
    }
  }
</script>
