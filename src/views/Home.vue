<template>
  <div class="home">
    <Header />
    <Welcome />
    <DemoPictures />
    <img class="photo" v-for="(photo,index) in photos" :key="index" :src="photo" />
    <Footer class="footer_menu" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import DemoPictures from "@/components/DemoPictures";
import Welcome from "@/components/Welcome";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "Home",
  components: {
    Header,
    Footer,
    Welcome,
    DemoPictures
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState(["capturedImage", "photos", "mediaTrack"])
  }
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  max-height: 100vh;
  margin: auto;
}

.captured_image {
  width: 100%;
  height: auto;
}

.photo {
  width: 100%;
  height: auto;
}

.footer_menu {
  padding: 10px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 50;
}
</style>