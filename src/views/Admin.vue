<template>
  <div class="notification_section">
    <img src="/images/icons/icon-128x128.png" alt />
    <label for="push_text">Title</label>
    <input v-model="title" type="text" id="push_text" />
    <label for="push_body">Message</label>
    <input v-model="body" type="text" id="push_body" />
    <button @click="SendPushNotification">Send pushnotification</button>
    <button @click="$router.push('/')">Tillbaka till Instablam</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      body: ""
    };
  },
  methods: {
    async SendPushNotification() {
      let response = await fetch("http://localhost:3000/notifications/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: this.title,
          body: this.body
        })
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.notification_section {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>