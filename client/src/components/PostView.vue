<template>
  <div class="post">
    <div v-if="loading">Loading . . .</div>
    <div v-else>
      <!-- <button class="post--edit" @click="handleEdit">&#9998;</button> -->
      <!-- <button class="post--close" @click="handleClose">&times;</button> -->
      <h1>{{ post.title }}</h1>
      <h3>{{ new Date(post.date).toDateString() }} - {{ post.author && post.author.displayName }}</h3>
      <img :src="post.photoURL" :alt="post.title">
      <p>{{ post.content }}</p>
      <!-- {{ post.author && post.author.displayName }} -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Post } from "../types";
import { useQuery } from '@vue/apollo-composable';
import { POST } from "../graphql/Post";
import { useStore } from 'vuex';
// import gql from 'graphql-tag';
export default defineComponent({
  name: 'PostView',
  props: ['id', ''],
  setup(props, context) {
    const store = useStore();
    // setup() receives props as the first argument.
    // console.log(props.id)
    // const
    // const { result, loading } = useQuery(POST);
    const { result, loading } = useQuery(POST, { id: props.id, });

    const post = computed((): Post => result.value?.Post ?? {});
    store.commit('SET_POST', post);
    // console.info(loading);

    // context.emit("handleData", post);


    const handleEdit = async () => {
      console.info('Edit from view');
      context.emit("handleEdit", post);
      return;
    }

    const handleClose = async () => {
      console.info('Close from view');
      context.emit("handleClose");
      return;
    }

    return { post, loading, handleEdit, handleClose };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post {
  position: absolute;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  z-index: 5;
}
.post--edit {
  font-size: xxx-large;
  left: .5rem;
  position: absolute;
  cursor: pointer;
  background-color: transparent;
  border: none;
  z-index: 10;
}
.post--close {
  font-size: xxx-large;
  right: .5rem;
  position: absolute;
  cursor: pointer;
  background-color: transparent;
  border: none;
  z-index: 10;
}
h3 {
  margin: 40px 0 0;
}
/* ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
img {
  width: 100%;
}
</style>
