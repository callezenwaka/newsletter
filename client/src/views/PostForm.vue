<template>
  <div class="post">
    <Header></Header>
    <div class="">
      <h1>Submit Post</h1>
      <form class="form--container" @submit.prevent="handleSubmit">
        <div class="form--item">
          <label class="form--label" for="title">Title: </label>
          <input class="form--input" type="text" name="title" id="title" v-model="input.title" @blur="handleBlur($event)" placeholder="Enter post title" required />
        </div>
        <div class="form--item">
          <label class="form--label" for="content">Content: </label>
          <input class="form--input" type="text" name="content" id="content" v-model="input.content" @blur="handleBlur($event)" placeholder="Enter post content" required />
        </div>
        <div class="form--item">
          <label class="form--label" for="date">Date: </label>
          <input class="form--input" type="date" name="date" id="date" v-model="input.date" @blur="handleBlur($event)" required />
        </div>
        <div class="form--item">
          <label class="form--label" for="file">Select File: </label>
          <input class="form--file" type="file" name="file" id="file" @change="handleImage" @blur="handleBlur($event)" :required="!input.photoURL" />
        </div>
        <div v-if="input.photoURL" class="form--item">
          <img :alt="filename" :src="input.photoURL">
        </div>
        <div class="form--item">
          <button class="form--button" :class="{isValid: isValid}" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Header from "@/components/Header.vue";
import { computed, defineComponent, reactive, ref } from "vue";
import { handleBlur } from '@/services';
import { useMutation } from '@vue/apollo-composable';
import { useStore } from 'vuex';
import { ADD_FILE } from "../graphql/File";
import { ADD_POST, UPDATE_POST } from "../graphql/Post";
import { Post } from "@/types";
import { useRoute, useRouter } from "vue-router";
// import gql from 'graphql-tag';
export default defineComponent({
  name: "PostForm",
  components: {
    Header
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    let filename = ref('');
    const post = computed((): Post => store.getters.post);
  
    const input = reactive({
      title: route.params.isEditing? post.value.title : '',
      content: route.params.isEditing? post.value.content :  '',
      photoURL: route.params.isEditing? post.value.photoURL :  '',
      date: route.params.isEditing? new Date(post.value.date).toISOString().slice(0, 10) :  '',
      isPublished: route.params.isEditing? post.value.isPublished : true
    });
    const isValid = computed(() => {
      return (
        input.title !== "" && 
        input.content !== "" &&
        input.date !== "" &&
        input.photoURL !== ""  
      );
    });

    const { mutate: handleFile, onDone: doneFile } = useMutation(ADD_FILE)
    const { mutate: handleCreate } = useMutation(ADD_POST)
    const { mutate: handleUpdate } = useMutation(UPDATE_POST)

    doneFile(result => {
      input.photoURL = result.data.addFile.photoURL;
      filename.value = result.data.addFile.filename;
    });

    const handleImage = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = (target.files as FileList)[0];
      try {
        // console.log(file);
        handleFile({
          file: file,
        });
      } catch (error) {
        console.log(error);
      }
    }

    const handleSubmit = async () => {
      const { title, content, date, photoURL, isPublished } = input;
      console.info({ title, content, date, photoURL, isPublished });
      try {
        // TODO:
        const authorId = localStorage.getItem('id');
        if(post.value.id) {
          handleUpdate({
            id: post.value.id,
            authorId,
            title,
            content,
            date,
            photoURL,
            isPublished
          });
        } else {
          handleCreate({
            authorId,
            title,
            content,
            date,
            photoURL,
            isPublished
          });
        }
        input.title = "";
        input.content = "";
        input.date = "";
        input.photoURL = "";
        input.isPublished = true;
        router.push({ name: "Home" });
      } catch (error) {
        console.log(error);
        return;
      }
    };

    return { filename, isValid, input, handleBlur, handleImage, handleSubmit };
  },
});
</script>

<style scoped>
/* post--form */
.post {
  /* padding: 1rem; */
  height: 100%;
  min-height: 100vh;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  transition: all 500ms linear;
}
.form--container {
  width: 100%;
  margin: 50px auto;
  margin: 0rem auto 0;
  padding: 0rem;
}
.form--title {
  text-align: center;
  margin: 2rem 0;
}
.validations {
  display: flex;
  justify-content: center;
  color: #ff0000;
  padding: 0.5rem;
  border-radius: 5px;
}
.form--item {
  display: flex;
  flex-direction: column;
  border: none;
  margin: 0px 0px 20px;
  padding: 0px;
}
.form--label {
  font-size: 14px;
  color: rgb(61, 79, 88);
  /* color: var(--dark-theme-color); */
  position: relative;
  height: 16px;
  text-align: left;
  font-weight: bold;
  line-height: 16px;
  letter-spacing: 0.02em;
}
.form--input {
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(229, 231, 235, 1);
  border-radius: 4px;
  height: 52px;
  font-size: 16px;
  line-height: 24px;
  margin-top: 5px;
  padding-left: 12px;
  padding-right: 12px;
  transition: border-color 150ms ease-in-out 0s;
}
.form--button {
  position: relative;
  background-color: transparent;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  -webkit-box-align: stretch;
  height: 45px;
  width: 100%;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 5px;
  border-radius: 4px;
  border-color: transparent;
  text-decoration: none;
  cursor: not-allowed;
  z-index: 0;
  transition: all 150ms ease-in-out 0s;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
}
.form--button.isValid {
  cursor: pointer;
  background-color: #0d6efd;
  background-color: #2c3e50;
}
.form--button.isValid:hover {
  opacity: 0.5;
}
.form--option {
  margin: 15px;
  color: rgb(33, 49, 60);
  font-size: 15px;
  display: inline;
  text-align: start;
  display: block;
  text-align: center;
}
.form--link {
  text-decoration: none;
  color: #3a6df0;
}
.form--text {
  color: #ffffff;
}
/* mini */
@media only screen and (min-width: 481px) {
  .form--container {
    width: 410px;
    margin: 0 auto;
    /* margin: 4rem auto 0 */
  }
}
/* max */
@media only screen and (min-width: 981px) {

}
</style>