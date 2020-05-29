import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stream: null,
    capturedImage: null,
    mediaTrack: null,
    showVideoCamera: true,
  },
  mutations: {
    showVideo(state, showCamera) {
      state.showVideoCamera = showCamera;
      state.capturedImage = null;
    },
    addStream(state, stream) {
      state.stream = stream;
      state.mediaTrack = stream.getVideoTracks()[0];
    },
    saveImage(state, imageUrl) {
      state.capturedImage = imageUrl;
    },
    saveMediaTrack(state, mediaTrack) {
      state.mediaTrack = mediaTrack;
    },
  },
  actions: {
    async getStream(context) {
      let stream = await navigator.mediaDevices.getUserMedia({ video: true });
      context.commit("addStream", stream);
      console.log(stream);
    },
    async capturePhoto(context) {
      fetch("http://localhost:3000/notifications/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: "New Picture Taken",
          body: "Nice picture wohooo",
        }),
      });
      const mediaTrack = this.state.stream.getVideoTracks()[0];
      const captureImage = new ImageCapture(mediaTrack);
      const photo = await captureImage.takePhoto();
      const imageUrl = URL.createObjectURL(photo);
      context.commit("saveImage", imageUrl);
    },
    showVideoCamera(context) {
      context.commit("showVideo", true);
    },
  },
  modules: {},
});
