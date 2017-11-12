import {EventBus} from '../_eventBus.js'

export const sb_shot_item_MIXIN =  {
  data(){
    return {
      thumbnailHeight: 0
    }
  },
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
      }
    },
    isLast() {
      return this.$store.getters.getShotIndex(this.shotId) == this.$store.state.shotsOrder.length - 1
    },
    paddedNumber(){
      return this.$store.getters.getShotIndex(this.shotId).toString().padStart(3,'0')
    }
  },
  methods: {
    thumbnailClicked() {
      EventBus.$emit('openDrawingTool', this.shotId)
    },
    dragStart(event) {
      console.log(event)
      event.dataTransfer.setData("text", this.shotId);
    }
  }
}
