<template>
  <div class="about">
    <Header></Header>
    <!-- <p>Current route name: {{ $route.name }}</p> -->
    <div class="about--container">
      <p>What action do you want to perform?</p>
      <div class="about--buttons">
        <button type="button" class="about--button" @click="handlePost">Post</button>
        <button type="button" class="about--button" @click="handleAuthor">Update Author</button>
      </div>
        
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
// import PostForm from "@/components/PostForm.vue";
import Header from "@/components/Header.vue";
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
export default defineComponent({
  name: "AboutView",
  components: {
    Header
  },
  setup() {
    const router = useRouter();

    const handlePost = async () => {
      // console.log('post');
      try {
        // await store.dispatch(ActionTypes.File, {...user});
        router.push({ name: "Post" });
        // router.push({ name: 'Post', params: { username: 'erina' } })
      } catch (error) {
        console.log(error);
      }
    };

    const handleAuthor = async () => {
      // console.log('author');
      try {
        // await store.dispatch(ActionTypes.File, {...user});
        // router.push({ name: "Dashboard" });
      } catch (error) {
        console.log(error);
      }
    };

    const handleSubmit = async () => {
      // console.log('About');
      try {
        // await store.dispatch(ActionTypes.File, {...user});
        // router.push({ name: "Dashboard" });
      } catch (error) {
        console.log(error);
      }
    };

    return { handlePost, handleAuthor, handleSubmit };
  },
});
</script>

<style scoped>
/* file */
.about {
  /* padding: 1rem; */
  height: 100%;
  min-height: 100vh;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  transition: all 500ms linear;
}
.about--container {
  width: 100%;
  margin: 50px auto;
  margin: 0rem auto 0;
  /* padding: 0 1rem; */
}
.about--buttons {
  display: flex;
  align-content: center;
  justify-content: space-between;
  align-items: center;
}
.about--button {
  position: relative;
  cursor: pointer;
  background-color: #2c3e50;
  color: #ffffff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  -webkit-box-align: stretch;
  height: 45px;
  width: 45%;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 5px;
  border-radius: 4px;
  border-color: transparent;
  text-decoration: none;
  z-index: 0;
  transition: all 150ms ease-in-out 0s;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
}
.about--button.isValid:hover {
  opacity: 0.5;
}
/* mini */
@media only screen and (min-width: 481px) {
  .about--container {
    width: 410px;
    margin: 0 auto;
    /* margin: 8rem auto 0 */
  }
}
/* max */
@media only screen and (min-width: 981px) {
}
</style>
