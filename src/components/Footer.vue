<template>
  <footer class="footer_menu">
    <img @click="toHome" src="@/assets/icons/home.svg" alt />
    <img @click="toCapturePhoto" src="@/assets/icons/openCapturePhoto.svg" alt />
    <img v-if="!this.sub" @click="askUserForPermission" src="@/assets/icons/notification-disabled.png" alt />
    <img v-else @click="unregisterSubscription" src="@/assets/icons/notification-enabled.png" alt />
  </footer>
</template>

<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    navigator.serviceWorker.ready.then(reg => {
      reg.pushManager.getSubscription().then(sub => {
        this.sub = sub;
      });
    });
  },
  data() {
    return {
      sub: null
    };
  },
  methods: {
    async askUserForPermission() {
      Notification.requestPermission(result => {
        if (result !== "granted") {
          console.log("user dont wan´t subscription");
        } else {
          this.registerSubscription();
        }
      });
    },
    async unregisterSubscription() {
      if (this.sub) {
        let result = await this.sub.unsubscribe();
        if (result) {
          this.sub = null;
          console.log("Unsubscribed");
        }
      }
    },
    ...mapActions(["getStream", "capturePhoto"]),
    async registerSubscription() {
      let reg;
      if (!("serviceWorker" in navigator)) {
        return;
      }
      navigator.serviceWorker.ready
        .then(serviceWorker => {
          reg = serviceWorker;
          serviceWorker.pushManager.getSubscription();
        })
        .then(subscription => {
          if (subscription == null) {
            let vapidPublicKey =
              "BE-Fzt6TTM534ns01-SFpY_SJwIbruFGd4s-715LKazGf3x4OJACMAPZ_N4I1hA3ZZEoyocL00x-BfIGjNdMaJ0";
            let convertedPublicKey = this.urlBase64ToUint8Array(vapidPublicKey);
            return reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedPublicKey
            });
          } else {
            console.log("we already have a subscription");
          }
        })
        .then(newSubscription => {
          this.sub = newSubscription;
          fetch("http://localhost:3000/notifications/save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(newSubscription)
          });
        });
    },
    urlBase64ToUint8Array(base64String) {
      var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      var base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

      var rawData = window.atob(base64);
      var outputArray = new Uint8Array(rawData.length);

      for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    },
    toCapturePhoto() {
      const path = `/capturePhoto`;
      if (this.$route.path !== path) this.$router.push("/capturePhoto");
    },
    toHome() {
      const path = `/`;
      if (this.$route.path !== path) this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  height: 30px;
  width: 30px;
}

.footer_menu {
  width: 100%;
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>