<template>
  <div>
    <video v-if="showVideoCamera" class="video_player" :src-object.prop.camel="stream" autoplay></video>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["stream", "showVideoCamera"])
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.video_player {
  width: 100%;
  height: auto;
}
</style>