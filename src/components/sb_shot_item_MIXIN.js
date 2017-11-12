export const sb_shot_item_MIXIN =  {
  props: {
    shotId: '',
  },
  computed: {
    style() {
      return {
        width: this.thumbnailWidth + 'px',
        height: this.thumbnailWidth / this.$store.state.frameRatio + 'px',
        border: 'solid black 1px',
      }
    },
    isLast() {
      return this.$store.getters.getShotIndex(this.shotId) == this.$store.state.shotsOrder.length - 1
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
