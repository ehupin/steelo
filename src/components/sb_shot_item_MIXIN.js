import {EventBus} from '../_eventBus.js'

export const sb_shot_item_MIXIN =  {
  created(){
    this.thumbnailHeight = this.thumbnailWidth / this.$store.state.frameRatio
  },
  props: {
    shotId: '',
  },
  computed: {
    thumbnailStyle() {
      return {
        width: this.thumbnailWidth + 'px',
        height:  this.thumbnailHeight + 'px',
        border: 'solid black 1px',
        flex: 'none',
      }
    },
    isLast() {
      return this.$store.getters.getShotIndex(this.shotId) == this.$store.state.shotsOrder.length - 1
    },
    isFirst(){
      return this.$store.getters.getShotIndex(this.shotId) == 0
    },
    paddedNumber(){
      return this.$store.getters.getShotIndex(this.shotId).toString().padStart(3,'0')
    },
    description: {
      get () {
        return this.$store.state.shots[this.shotId].description
      },
      set (value) {
        this.$store.commit('SET_SHOT_DESCRIPTION', {shotId: this.shotId, description: value})
      }
    }
  },
  methods: {
    thumbnailClicked() {
      EventBus.$emit('thumbnailClicked', this.shotId)
    },
    dragStart(event) {
      event.dataTransfer.setData("text", this.shotId);
    },
    deleteShot(){
      this.$store.commit('DELETE_SHOT', {shotId: this.shotId})
    }
  }
}
