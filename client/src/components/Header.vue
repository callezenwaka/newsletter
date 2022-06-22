<template>
  <nav>
    <router-link to="/">Home</router-link> 
    <router-link v-if="isAuthor" to="/about">About</router-link> 
    <router-link v-if="isAuthor" to="/post">Post</router-link> 
    <router-link v-if="!isAuthor" to="/register">Register</router-link> 
    <router-link v-if="!isAuthor" to="/login">Login</router-link> 
    <router-link v-if="isAuthor" class="" to="/login" @click="handleLogout">Logout</router-link>
  </nav>
   <div class="nav--route">{{ $route.name }} &vert;</div>
</template>

<script lang="ts">
// @ is an alias to /src
import { defineComponent } from "vue";
export default defineComponent({
  name: "HeaderView",
  setup() {
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

nav {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  padding: 30px;
  box-shadow: 0 2px 4px 0 #000;
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
.nav--route {
  text-align: left;
  margin-top: 1rem;
}
</style>
