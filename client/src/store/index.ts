import { createStore } from 'vuex';
import { Author, Post } from '@/types';

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
    async POSTS(context, payload) {
			context.commit('SET_POSTS', payload);
      return;
    },
    async POST(context, payload) {
			context.commit('SET_POST', payload);
      return;
    },
    async AUTHORS(context, payload) {
			context.commit('SET_AUTHORS', payload);
      return;
    },
    async AUTHOR(context, payload) {
			context.commit('SET_AUTHOR', payload);
      return;
		},
    
  },
  mutations: {
    async SET_AUTHORS(state, authors) {
      state.authors = authors;
    },
    async SET_AUTHOR(state, author) {
      state.author = author;
    },
    async SET_POSTS(state, posts) {
      state.posts = posts;
    },
    async SET_POST(state, post) {
      state.post = post;
    },
    async SET_LOADING(state, loading) {
      state.loading = loading;
    },
  },
  modules: {
  }
})
