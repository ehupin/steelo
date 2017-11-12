<template>
  <div id="sb_sheet_background">
    <!--<button @click="$store.commit('ADD_SHOT')">Add shot</button>-->
    <!--<button @click="$store.commit('CHANGE_RATIO')">Change Ratio</button>-->

    <div id="sb_sheet">
      <sb_sheet_shot v-for="shotId in $store.state.shotsOrder" :key="shotId" :shotId="shotId"/>
    </div>

  </div>
</template>

<style>
  #sb_sheet_background{
    background: #eee;
    margin:0px;
    padding:0px;
    width: 100%;
    height: 100%;
    padding: 50px;
    overflow: scroll;

  }
  #sb_sheet{
    width: 80%;
    padding: 30px;
    background: white;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
