<template>
  <div class="register">
    <Header></Header>
    <div class="">
      <h1>Login Account</h1>
      <form class="form--container" @submit.prevent="handleSubmit">
        <div class="form--item">
          <label class="form--label" for="user">User ID: </label>
          <input class="form--input" type="text" name="user" id="user" v-model="id" @blur="handleBlur($event)" placeholder="Enter id" required />
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
import { computed, defineComponent, ref } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { handleBlur } from '@/services';
export default defineComponent({
  name: "LoginView",
  components: {
    Header
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const id = ref('');
    const author = computed(() => store.getters.author);
    const isValid = computed(() => id.value !== '' );

    const handleSubmit = async () => {
      // TODO: 
      try {
        const result = await store.dispatch('AUTHOR', id.value);
        console.info(result);
        if(typeof result !== 'object') return;
        localStorage.setItem('isAuthor', "true");
        router.push({ path: '/' })
      } catch (error) {
        console.log(error);
      }
    };

    return { id, isValid, author, handleBlur, handleSubmit };
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
.form--container {
  width: 100%;
  margin: 50px auto;
  margin: 0rem auto 0;
  padding: 0 1rem;
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
  .form--container {
    width: 410px;
    margin: 0 auto;
    margin: 8rem auto 0
  }
}
/* max */
@media only screen and (min-width: 981px) {
}
</style>