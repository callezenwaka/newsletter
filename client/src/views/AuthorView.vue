<template>
  <div class="author">
    <Header></Header>
    <div class="form--container">
      <div class="form--header">
        <h2 class="form--title">Profile</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Header from "@/components/Header.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "AuthorView",
  components: {
    Header
  },
  setup() {
   

    return {  };
  },
});
</script>

<style scoped>
/* author */
.author {
  height: 100%;
  min-height: 100vh;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  transition: all 500ms linear;
}
/* mini */
@media only screen and (min-width: 481px) {
}
/* max */
@media only screen and (min-width: 981px) {
}
</style>