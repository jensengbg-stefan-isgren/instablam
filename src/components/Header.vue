<template>
  <header class="header">
    <img class="logo" src="@/assets/icons/camera-logo.svg" alt />
    <h1>Instablam</h1>
    <nav>
      <img @click="toggleMenu" class="menu" src="@/assets/icons/menu.svg" alt />
      <ul v-if="showMenu == true" class="navigation">
        <li @click="$router.push('/Admin')">Admin</li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showMenu: true
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: $title;
  font-size: 1.2rem;
  color: rgb(66, 66, 66);
}

.logo {
  margin-left: 8px;
  height: 25px;
}

.menu {
  height: 20px;
}

.header {
  background-color: white;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navigation {
  list-style: none;
}

li {
  padding: 10px 0;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: black;
}

a:visited {
  text-decoration: none;
}
</style>>
