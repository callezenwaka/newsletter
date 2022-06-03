<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/login">Login</router-link>
  </nav>
</template>

<script lang="ts">
// @ is an alias to /src
import { defineComponent } from "vue";
export default defineComponent({
  name: "HeaderView",
  // setup() {
  //   console.info(Date.now());
  // },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
