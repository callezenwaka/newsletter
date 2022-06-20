import { createStore } from 'vuex';
import axios from "axios";
export const HOSTNAME = 'http://localhost:4000/graphql';
import { useQuery } from '@vue/apollo-composable';
import { AUTHOR } from "../graphql/Author";
import { POSTS } from "../graphql/Post";
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
    loading: false,
  },
  getters: {
    authors: state => state.authors,
    author: state => state.author,
    posts: state => state.posts,
    post: state => state.post,
    loading: state => state.loading,
  },
  actions: {
    async POSTS(context) {
      // console.log('here');
      const { result, loading } = await useQuery(POSTS);
      // console.log(result.value);
      // console.log(loading.value);
      // return;
      // const data = JSON.stringify({
      //   query: `{
      //     Posts {
      //       id
      //       title
      //       content
      //       photoURL
      //       date
      //       isPublished
      //       author {
      //         id
      //         displayName
      //         photoURL
      //       }
      //     }
      //   }`
      // });

      // const result = await client(data);
			context.commit('SET_POSTS', result.value?.Posts ?? []);
			context.commit('SET_LOADING', loading.value);

      return result.value?.Posts ?? [];
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
			context.commit('SET_POST', result.data.Post);

      return result.data.Post;
    },
    async ADD_POST(context, payload) {
      console.info(payload);
      // return payload;
      const { title, content, photoURL, date, isPublished, authorId } = payload;
      // const data = JSON.stringify({
      //   query: `{
      //     mutation {
      //       addPost (title: "${title}", content: "${content}", photoURL: "${photoURL}", date: "${date}", isPublished: "${isPublished}", authorId: "${authorId}") {
      //         title
      //         content
      //         photoURL
      //         date
      //         isPublished
      //         authorId
      //       }
      //     }
      //   }`
      // });

      // const result = await client(data);
			// context.commit('SET_POST', result.data.Post);

      // return result.data.Post;
      const {data} = await axios({
        method: "POST",
        url: `${HOSTNAME}`,
        data: JSON.stringify({
          query: `
            mutation {
              addPost (title: "${title}", content: "${content}", photoURL: "${photoURL}", date: "${date}", isPublished: "${isPublished}", authorId: "${authorId}") {
                title 
                content
                id
                date
                isPublished
              }
            }
          `
        }),
        headers: {
          'content-type': 'application/json',
          'Accept': 'application/json',
        }
      });
      console.info(data);
      return data;
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
			context.commit('SET_AUTHORS', result.data.Authors);

      return result.data.Authors;
    },
    async AUTHOR(context, payload) {
      // const data = JSON.stringify({
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
      // });

      // const result = await client(data);
			// context.commit('SET_AUTHOR', result.data.Author);

      // return result.data.Author;

      // console.info(payload);
      const { result, loading } = await useQuery(AUTHOR, {id: payload});
      console.log(result.value);
      console.log(loading.value);
		},
    
  },
  mutations: {
    SET_AUTHORS(state, authors) {
      // console.info(authors);
      state.authors = authors;
    },
    async SET_AUTHOR(state, author) {
      // console.info(author);
      state.author = author;
    },
    SET_POSTS(state, posts) {
      // console.info(posts);
      state.posts = posts;
    },
    SET_POST(state, post) {
      // console.info(post);
      state.post = post;
    },
    SET_LOADING(state, loading) {
      // console.info(loading);
      state.loading = loading;
    },
  },
  modules: {
  }
})
