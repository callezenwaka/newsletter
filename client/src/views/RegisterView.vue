<template>
  <div class="register">
    <Header></Header>
    <div class="form--container">
      <h1 class="form--title">Register Account</h1>
      <form class="form" @submit.prevent="handleSubmit">
        <div class="form--item">
          <label class="form--label" for="displayName">Full Name: </label>
          <input class="form--input" type="text" name="displayName" id="displayName" v-model="author.displayName" @blur="handleBlur($event)" placeholder="Enter full name" required />
        </div>
        <div class="form--item">
          <label class="form--label" for="email">Email: </label>
          <input class="form--input" type="text" name="email" id="email" v-model="author.email" @blur="handleBlur($event)" placeholder="Enter email" required />
        </div>
        <div class="form--item">
          <label class="form--label" for="phoneNumber">Phone Number: </label>
          <input class="form--input" type="text" name="phoneNumber" id="phoneNumber" v-model="author.phoneNumber" @blur="handleBlur($event)" placeholder="Enter phone number" required />
        </div>
        <div class="form--item">
          <label class="form--label" for="file">Select File: </label>
          <input class="form--file" type="file" name="file" id="file" @change="handleImage" required />
        </div>
        <div v-if="author.photoURL" class="form--item">
          <img :alt="filename" :src="author.photoURL">
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
import { useMutation } from '@vue/apollo-composable';
import { ADD_AUTHOR } from "../graphql/Author";
import { ADD_FILE } from "../graphql/File";
import { handleBlur } from '@/services';
export default defineComponent({
  name: "RegisterView",
  components: {
    Header
  },
  setup() {
    const { mutate: handleAccount, onDone: doneAuthor } = useMutation(ADD_AUTHOR);
    const { mutate: handleFile, onDone: doneFile } = useMutation(ADD_FILE)
    let filename = ref('');
    const author = reactive({
      displayName: '',
      email: '',
      phoneNumber: '',
      photoURL: '',
      role: 'user',
      isActive: true
    });

    const isValid = computed(() => {
      return (
        author.displayName !== "" && 
        author.phoneNumber !== "" && 
        author.email !== "" && 
        author.photoURL !== ""  
      );
    });

    doneFile(result => {
      author.photoURL = result.data.addFile.photoURL;
      filename.value = result.data.addFile.filename;
    })

    doneAuthor(result => {
      console.log(result.data);
      author.displayName = '';
      author.email = '';
      author.phoneNumber = '';
      author.photoURL = '';
      filename.value = '';        
    })

    const handleImage = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = (target.files as FileList)[0];
      try {
        console.log(file);
        handleFile({
          file: file,
        });
      } catch (error) {
        console.log(error);
      }
    }

    const handleSubmit = async () => {
      // if (!handleValidation()) return;
      try {
        handleAccount({
          ...author
        });
      } catch (error) {
        console.log(error);
      }
    };

    return { filename, author, isValid, handleBlur, handleImage, handleSubmit };
  },
});
</script>

<style scoped>
/* file */
.register {
  /* padding: 1rem; */
  height: 100%;
  min-height: 100vh;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  transition: all 500ms linear;
}
.form {
  width: 100%;
  margin: 50px auto;
  margin: 0rem auto 0;
  padding: 0rem;
}
.form--title {
  text-align: center;
  margin: 2rem 0;
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
  color: #000000;
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
  background-color: #2c3e50;
  color: #ffffff;
}
.form--button.isValid:hover {
  opacity: 0.5;
}
/* mini */
@media only screen and (min-width: 481px) {
  .form {
    width: 410px;
    margin: 0 auto;
  }
}
/* max */
@media only screen and (min-width: 981px) {
}
</style>