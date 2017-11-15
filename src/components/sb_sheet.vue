<template>
  <div id="sb_sheet_background">

      <sb_sheet_shot v-for="shotId in $store.state.shotsOrder" :key="shotId" :shotId="shotId"/>

  </div>
</template>

<style>
  #sb_sheet_background{
    background: #f6f6f6;
    /* margin: 0px; */
    padding: 10px;
    /* width: 100%; */
    height: 100%;
    /* padding: 50px; */
    overflow: scroll;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;

  }
  #sb_sheet{
    width: 80%;
    padding: 30px;
    background: #eee;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);

  }

</style>

<script>
  import sb_sheet_shot from './sb_sheet_shot.vue'
  import sb_sheet_drop_area from './sb_sheet_drop_area.vue'

  export default {
    components:{sb_sheet_shot, sb_sheet_drop_area},
    mounted(){
      this.$store.commit('ADD_SHOT')
    },
    methods: {
      addShotButtonClicked (){
        this.$store.dispatch('addShot')
      }
    }
  }


</script>
