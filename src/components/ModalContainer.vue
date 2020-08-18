<template>
  <div>
    <v-dialog v-model="active" persistent width="600">
      <div >
        <slot></slot>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    active: Boolean,
    cancellable: [Number, Boolean]
  },

  mounted() {
    window.addEventListener("keydown", this.onKeyDown);
  },

  destroyed() {
    window.removeEventListener("keydown", this.onKeyDown);
  },

  methods: {
    cancel() {
      if (this.cancellable) {
        this.close();
      }
    },

    close() {
      this.$emit("close");
    },

    onKeyDown(event) {
      if (event.key === "Escape") {
        this.cancel();
      }
    }
  }
};
</script>

<style lang="scss">

</style>