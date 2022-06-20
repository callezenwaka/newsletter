<template>
  <div class="home">
    <Header></Header>
    <!-- <div v-if="isEditing" class="home--post">
      <button class="home--close" @click="handleEdit">&times;</button>
      <PostForm :id="id"></PostForm>
    </div> -->
    <div v-if="isViewing" class="home--post">
      <button class="home--edit" @click="handleEdit">&#9998;</button>
      <button class="home--close" @click="handleClose">&times;</button>
      <PostView :id="id" @handleEdit="handleEdit" @handleClose="handleClose"></PostView>
      <!-- <PostForm :post="post" @handleClose="handleClose"></PostForm> -->
    </div>
    <!-- <div v-if="isViewing || isEditing" class="home--post">
      <button class="home--edit" @click="handleEdit">&#9998;</button>
      <button class="home--close" @click="handleClose">&times;</button>
      <PostView :id="id" @handleEdit="handleEdit" @handleClose="handleClose"></PostView>
      <PostView v-if="isViewing" :id="id" @handleClose="handleClose"></PostView>
      <PostForm v-if="isEditing" @handleClose="handleClose"></PostForm>
    </div> -->
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
          <!-- <PostCard :post="post"></PostCard> -->
          <!-- <div>
            <button type="button" @click="handlePost(post.id)">View Post</button>
          </div> -->
          <div class="home--delete">
            <button type="button" @click="handleDelete(post.id)">Delete Post</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
// import PostForm from "@/components/PostForm.vue";
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
    // PostForm,
    PostView,
    PostCard,
    Header,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    let id = ref('');
    let post = reactive({});
    let isEditing = ref(false);
    let isViewing = ref(false);
    const { mutate: handleDeletePost, onDone: doneDeletePost } = useMutation(DELETE_POST)
    const { result, loading, refetch } = useQuery(POSTS);
    const posts = computed((): Post[] => result.value?.Posts ?? []);
    store.commit('SET_POSTS', posts);
    // const author = computed((): Author => store.getters.author);

    onMounted(async () => { refetch; });
    doneDeletePost(result => {
      refetch;
      console.info(result.data);
    });
    // onMounted(async () => { await store.commit('SET_POSTS', result.value?.Posts ?? []); });
    // setTimeout(fun, 2000);
    // onBeforeMount( () => { setTimeout(async () => { await store.dispatch('POSTS'); }, 5000); })

    // const posts = computed((): Post[] => store.getters.posts || []);
    // const author = localStorage.getItem('author');
    // console.log("author: ", author);
    // JSON.parse(value) === true
    // const { result: resultPosts, loading: isPostsLoading, error: errorPosts, refetch: refetchPosts } = useQuery(POSTS);
    // console.log(resultPosts.value);



    const handlePost = async (postId: string) => {
      id.value = postId;
      console.info(postId);
      isViewing.value = true;
      isEditing.value = false;
      post = posts.value.filter(post => post.id === postId)[0];
      console.info(post);
    }

    const handleEdit = async () => {
      // id.value = '';
      isEditing.value = true;
      isViewing.value = false;
      // console.info('close')
      // router.push({ name: "Post" });
      // params: { data: yourData}
      // const post = posts.value.filter(post => post.id === id.value)[0];
      // console.info("post: ", post);
      // post: post,
      router.push({ name: 'Post', params: { isEditing: 'true'} });
      return;
    }
    
    const handleClose = async () => {
      id.value = '';
      isEditing.value = false;
      isViewing.value = false;
      // console.info('close')
      return;
    }

    const handleDelete = async (postId: string) => {
      console.info(postId);
      handleDeletePost({ id: postId, });
      return;
    }

    const handleView =async () => {
      return;
    }

    return { post, posts, refetch, loading, isEditing, isViewing, id, handlePost, handleClose, handleEdit, handleDelete, handleView };
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