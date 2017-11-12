<template>
  <div>
    <div id="sb_list">
      <sb_list_shot v-for="shotId in $store.state.shotsOrder" :key="shotId" :shotId="shotId">
      </sb_list_shot>
    </div>
  </div>
</template>
<style>
  #sb_list{
    width: 200px;
    padding: 5px;
    height: 100%;
    overflow: scroll;
    background: #eee;
  }
</style>
<script>
  import sb_list_shot from './sb_list_shot.vue'

  export default {
    components:{sb_list_shot},
    computed:{
    }
  }

</script>
