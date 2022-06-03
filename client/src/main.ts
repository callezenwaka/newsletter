import { createApp, h, provide } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable'
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, InMemoryCache } from '@apollo/client/core'

// Create the apollo client
const DefaultClient = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:4001/graphql'
  }),
  cache: new InMemoryCache(),
})

createApp({
  setup() {
    // https://vincenzoraco.dev/graphql-in-vue3-using-apollo-ckqeocnn60hwtd6s1bmf3ge9x
    provideApolloClient(DefaultClient);
    // provide(DefaultApolloClient, DefaultClient);
  },
  render: () => h(App),
})
.use(store)
.use(router)
.mount("#app");
