<template>
  <div class="post">
    <div v-if="loading">Loading . . .</div>
    <div v-else>
      <h1>{{ post.title }}</h1>
      <h3>{{ new Date(post.date).toDateString() }} - {{ post.author && post.author.displayName }}</h3>
      <img :src="post.photoURL" :alt="post.title">
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Post } from "../types";
import { useQuery } from '@vue/apollo-composable';
import { POST } from "../graphql/Post";
import { useStore } from 'vuex';
export default defineComponent({
  name: 'PostView',
  props: ['id', ''],
  setup(props) {
    const store = useStore();

    const { result, loading } = useQuery(POST, { id: props.id, });
    const post = computed((): Post => result.value?.Post ?? {});
    store.commit('SET_POST', post);

    return { post, loading };
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
h3 {
  margin: 40px 0 0;
}
img {
  width: 100%;
}
</style>
