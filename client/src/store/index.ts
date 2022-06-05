import { createStore } from 'vuex';
// import axios from "axios";
export const HOSTNAME = 'http://localhost:4001/graphql';
// import { useQuery } from '@vue/apollo-composable';
// import { AUTHOR } from "../graphql/Author";
import { Author, Post } from '@/types';
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
    posts: [] as Post[],
    post: {} as Post,
  },
  getters: {
    authors: state => state.authors,
    author: state => state.author,
    posts: state => state.posts,
    post: state => state.post,
  },
  actions: {
    async POSTS(context) {
      const data = JSON.stringify({
        query: `{
          Posts {
            id
            title
            content
            photoURL
            date
            isPublished
            author {
              id
              displayName
              photoURL
            }
          }
        }`
      });

      const result = await client(data);
      // console.info(result.data);
			context.commit('SET_POSTS', result.data.Posts);

      return result.data.Posts;
    },
    async POST(context, payload) {
      console.log('here')
      const data = JSON.stringify({
        query: `{
          Post(id: "${payload}") {
            id
            title
            content
            photoURL
            date
            isPublished
            author {
              id
              displayName
              photoURL
            }
          }
        }`
      });

      const result = await client(data);
      // console.info(result.data);
			context.commit('SET_POST', result.data.Post);

      return result.data.Post;
    },
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
      // console.info(result.data);
			context.commit('SET_AUTHORS', result.data.Author);

      return result.data.Authors;
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
      // console.info(result.data);
			context.commit('SET_AUTHOR', result.data.Author);

      return result.data.Author;
		},
    
  },
  mutations: {
    SET_AUTHORS(state, authors) {
      console.info(authors);
      state.authors = authors;
    },
    SET_AUTHOR(state, author) {
      // console.info(author);
      state.author = author;
    },
    SET_POSTS(state, posts) {
      console.info(posts);
      state.posts = posts;
    },
    SET_POST(state, post) {
      console.info(post);
      state.post = post;
    },
  },
  modules: {
  }
})
