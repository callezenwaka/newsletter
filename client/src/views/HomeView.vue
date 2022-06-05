<template>
  <div class="home">
    <Header></Header>
    <div class="home--container" v-if="!posts.length">
      <div>
        <div style="width: 700px; height: 43px; background-color: #d7d7d7; margin-bottom: 1rem;"></div>
        <div style="width: 700px; height: 25px; background-color: #d7d7d7; margin-bottom: 1rem;"></div>
        <div style="width: 700px; height: 465px; background-color: #d7d7d7; margin-bottom: 1rem;"></div>
        <div style="width: 700px; height: 50px; background-color: #d7d7d7; margin-bottom: 1rem;"></div><br>

        <div style="width: 700px; height: 43px; background-color: #d7d7d7; margin-bottom: 1rem;"></div>
        <div style="width: 700px; height: 25px; background-color: #d7d7d7; margin-bottom: 1rem;"></div>
        <div style="width: 700px; height: 465px; background-color: #d7d7d7; margin-bottom: 1rem;"></div>
        <div style="width: 700px; height: 50px; background-color: #d7d7d7; margin-bottom: 1rem;"></div>
      </div>
    </div>
    <div class="home--container" v-else-if="posts && posts.length">
      <ul class="post--lists">
        <li v-for="post of posts" :key="post.id">
          <PostCard :post="post"></PostCard>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { computed, defineComponent, onMounted } from "vue";
import PostCard from "@/components/PostCard.vue";
import Header from "@/components/Header.vue";
import { useStore } from 'vuex';
import { Post } from "../types";
// import { useQuery } from '@vue/apollo-composable';
// import { POSTS } from "../graphql/Post";
export default defineComponent({
  name: "HomeView",
  components: {
    PostCard,
    Header,
  },
  setup() {
    const store = useStore();

    onMounted(() => { store.dispatch('POSTS'); })

    const posts = computed((): Post[] => store.getters.posts || []);
    // const author = localStorage.getItem('author');
    // console.log("author: ", author);
    // JSON.parse(value) === true
    // const { result: resultPosts, loading: isPostsLoading, error: errorPosts, refetch: refetchPosts } = useQuery(POSTS);
    // console.log(resultPosts.value);

    // const posts = computed((): Post[] => resultPosts.value?.Posts ?? []);

    return { posts };
  },
});
</script>

<style scoped>
/* file */
.home {
  /* padding: 1rem; */
  height: 100%;
  min-height: 100vh;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  transition: all 500ms linear;
}
.home--container {
  width: 100%;
  margin: 50px auto;
  margin: 0rem auto 0;
  padding: 0;
}
.post--lists {
  list-style-type: none;
  padding: 0;
}
/* ul {
  list-style-type: none;
} */
/* mini */
@media only screen and (min-width: 481px) {
  .home--container {
    width: 700px;
    margin: 0 auto;
    /* margin: 8rem auto 0 */
  }
}
/* max */
@media only screen and (min-width: 981px) {
}
</style>