<template>
  <div class="home">
    <Header></Header>
    <div v-if="isViewing" class="home--post">
      <button class="home--edit" @click="handleEdit">&#9998;</button>
      <button class="home--close" @click="handleClose">&times;</button>
      <PostView :id="id" @handleClose="handleClose"></PostView>
    </div>
    <div class="home--container" v-if="loading">
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
      <ul class="home--lists">
        <li v-for="post of posts" :key="post.id">
          <PostCard :post="post" @click="handlePost(post.id)"></PostCard>
          <div class="home--delete">
            <button type="button" class="home--remove" @click="handleDelete(post.id)">Delete Post</button>
          </div>
          <hr>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { computed, defineComponent, ref } from "vue";
import PostView from "@/components/PostView.vue";
import PostCard from "@/components/PostCard.vue";
import Header from "@/components/Header.vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Post } from "../types";
import { useMutation, useQuery } from '@vue/apollo-composable';
import { DELETE_POST, POSTS } from "../graphql/Post";
export default defineComponent({
  name: "HomeView",
  components: {
    PostView,
    PostCard,
    Header,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    let id = ref('');
    let isViewing = ref(false);
    const { mutate: handleDeletePost, onDone: doneDeletePost } = useMutation(DELETE_POST)
    const { result, loading, refetch } = useQuery(POSTS);
    const posts = computed((): Post[] => result.value?.Posts ?? []);
    store.commit('SET_POSTS', posts);

    // onMounted(async () => { if(posts.value) refetch(); });
    doneDeletePost(() => {
      refetch();
    });

    const handlePost = async (postId: string) => {
      id.value = postId;
      isViewing.value = true;
    }

    const handleEdit = async () => {
      // id.value = '';
      isViewing.value = false;
      router.push({ name: 'Post', params: { isEditing: 'true' } });
      return;
    }
    
    const handleClose = async () => {
      id.value = '';
      isViewing.value = false;
      return;
    }

    const handleDelete = async (postId: string) => {
      handleDeletePost({ id: postId, });
      return;
    }

    return { posts, refetch, loading, isViewing, id, handlePost, handleClose, handleEdit, handleDelete };
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
.home {
  position: relative;
  /* z-index: 5; */
}
.home--post {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  z-index: 3;
}
.home--edit {
  font-size: xxx-large;
  left: .5rem;
  position: absolute;
  cursor: pointer;
  background-color: transparent;
  border: none;
  z-index: 10;
}
.home--close {
  font-size: xxx-large;
  right: .5rem;
  position: absolute;
  cursor: pointer;
  background-color: transparent;
  border: none;
  z-index: 10;
}
.home--container {
  width: 100%;
  margin: 50px auto;
  margin: 0rem auto 0;
  padding: 0;
}
.home--lists {
  list-style-type: none;
  padding: 0;
}
.home--delete {
  display: flex;
  align-content: center;
  justify-content: flex-end;
  align-items: center;
}
.home--remove {
  background-color: #ff0000;
  color: #000000;
  cursor: pointer;
  border-radius: 4px;
  border-color: transparent;
  text-decoration: none;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
}
.home--remove:hover {
  opacity: 0.5;
}
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