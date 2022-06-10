<template>
  <nav>
    <router-link to="/">Home</router-link> 
    <router-link v-if="!isAuthor" to="/register">Register</router-link> 
    <router-link v-if="!isAuthor" to="/login">Login</router-link> 
    <router-link v-if="isAuthor" class="" to="/login" @click="handleLogout">Logout</router-link>
  </nav>
</template>

<script lang="ts">
// @ is an alias to /src
import { defineComponent } from "vue";
export default defineComponent({
  name: "HeaderView",
  setup() {
    // JSON.parse(isAuthor) !== true
    const isAuthor = JSON.parse(localStorage.getItem('isAuthor') as string) === true;

    const handleLogout = async () => {
      localStorage.removeItem('isAuthor');
      localStorage.removeItem('id');
    }

    return { isAuthor, handleLogout }
  },
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
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

nav a {
  padding-left: 1rem;
  padding-right: 1rem;
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
