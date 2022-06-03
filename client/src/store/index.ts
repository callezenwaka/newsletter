import { createStore } from 'vuex';
import axios from "axios";
export const HOSTNAME = 'http://localhost:4001/graphql';
// import { useQuery } from '@vue/apollo-composable';
// import { AUTHOR } from "../graphql/Author";
import { Author } from '@/types';
import { client } from '@/services';
// const client = {
//   method: "POST",
//   url: `${HOSTNAME}`,
//   headers: {
//     'content-type': 'application/json',
//     'Accept': 'application/json',
//   }
// };

export default createStore({
  state: {
    authors: [] as Author[],
    author: {} as Author,
  },
  getters: {
    authors: state => state.authors,
    author: state => state.author,
  },
  actions: {
    async AUTHORS(context) {
      const data = JSON.stringify({
        query: `{
          Authors {
            id
            displayName    
            photoURL
            email
            phoneNumber
            photoURL
            role
            isActive
          }
        }`
      });

      const result = await client(data);
      console.info(result.data);
			// context.commit('SET_AUTHOR', data.data.Author);

      return result;
    },
    async AUTHOR(context, payload) {
      // console.info(client);
      // console.info({...client});
      // const { data } = await axios({
      //   ...client,
        // input: JSON.stringify({
        //   query: `{
        //     Author(id: "${payload}") {
        //       id
        //       displayName    
        //       photoURL
        //       email
        //       phoneNumber
        //       photoURL
        //       role
        //       isActive
        //     }
        //   }`
        // }),
      // });

      const data = JSON.stringify({
        query: `{
          Author(id: "${payload}") {
            id
            displayName    
            photoURL
            email
            phoneNumber
            photoURL
            role
            isActive
          }
        }`
      });

      const result = await client(data);
      console.info(result.data);
			// context.commit('SET_AUTHOR', result.data.Author);

      return result;
		},
    
  },
  mutations: {
    SET_AUTHORS(state, authors) {
      console.info(authors);
      state.authors = authors;
    },
    SET_AUTHOR(state, author) {
      console.info(author);
      state.author = author;
    },
  },
  modules: {
  }
})
