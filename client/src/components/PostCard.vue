<template>
  <div class="post">
    <h1>{{ post.title }}</h1>
    <h3>{{ new Date(post.date).toDateString() }} - {{ post.author.displayName }}</h3>
    <img :src="post.photoURL" :alt="post.title">
    <p>{{ post.content }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PostCard',
  props: ['post'],
  // setup(props) {
  //   // setup() receives props as the first argument.
  //   console.log(props.post)
  // }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
  width: 100%;
}
</style>
