<template>
  <div class="capture_photo_section">
    <Header v-if="showVideoCamera !== true && capturedImage == true" />
    <div class="camera_header">
      <img @click="undoSelect" class="back_icon" src="@/assets/icons/close.svg" alt />
      <span class="camera_text">Photo</span>
    </div>
    <Camera class="camera" v-if="capturedImage == null" />

    <img ref="image" id="photo" :src="capturedImage" data-caman-hidpi-disabled="true" />
    <img class="capture_button" src="@/assets/icons/capture_button.png" alt v-if="capturedImage == null" @click="capturePhoto" />
    <FilterSection v-if="this.capturedImage !== null" class="filter_section" />
    <Footer />
  </div>
</template>

<script>
import FilterSection from "@/components/FilterSection";
import Camera from "@/components/Camera";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  mounted() {
    this.test();
    this.getStream();
  },
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
    Camera,
    FilterSection
  },
  methods: {
    undoSelect() {
      let photo = this.$refs.image;
      if (this.capturedImage == null) {
        this.$router.push("/");
      } else {
        this.showVideoCamera();
        document.querySelector("#photo").remove();
        photo.remove();
      }
    },
    test() {
      let element = this.$refs.image;
      console.log(element);
    },
    ...mapActions([
      "getStream",
      "capturePhoto",
      "undoSelection",
      "showVideoCamera"
    ])
  },
  computed: {
    ...mapState(["mediaTrack", "capturedImage"])
  }
};
</script>

<style lang="scss" scoped>
canvas[style] {
  width: 50% !important;
  height: auto !important;
}

.home {
  position: relative;
  height: 100%;
}

.footer_menu {
  padding: 10px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 50;
}

#photo {
  display: block;
  margin: auto;
  width: 50%;
  height: auto;
}
.back_icon {
  height: 10px;
  width: auto;
}

.camera_header {
  padding: 10px;
}

.camera_text {
  margin-left: 1rem;
  font-family: $header;
}

.filter_section {
  margin-top: 10px;
}

.capture_button {
  margin-top: 5rem;
  display: block;
  margin: auto;
}

.capture_photo_section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: auto;
  max-width: 850px;
}
</style>