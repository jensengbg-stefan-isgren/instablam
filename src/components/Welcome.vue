<template>
  <div class="welcome">
    <h1 class="welcome_title">Welcome to Instablam</h1>
    <li>Snap Photos</li>
    <li>Add filter functions</li>
    <li>Easy to use</li>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.welcome {
  width: 90%;
  margin: auto;
  text-align: center;
}

li {
  list-style: none;
  font-family: $header;
  color: rgb(66, 66, 66);
}

.welcome_title {
  font-family: $title;
  color: rgb(66, 66, 66);
}
</style>