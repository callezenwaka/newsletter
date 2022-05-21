import { createApp, h, provide } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
// import { ApolloClient, InMemoryCache } from "@apollo/client";

// HTTP connection to the API
// const httpLink = createHttpLink({
//   // You should use an absolute URL here
//   uri: 'http://localhost:4000/graphql',
//   // uri: 'http://localhost:4000/api',
// })

// Cache implementation
// const cache = new InMemoryCache()

// Create the apollo client
const DefaultClient = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:4000/graphql'
  }),
  cache: new InMemoryCache(),
})

// createApp(App).use(store).use(router).mount('#app')

createApp({
  setup() {
    provide(DefaultApolloClient, DefaultClient);
  },
  render: () => h(App),
})
.use(store)
.use(router)
.mount("#app");
