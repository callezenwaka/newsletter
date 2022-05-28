import { GraphQLString, GraphQLList, GraphQLID, GraphQLBoolean } from 'graphql';
import { PostType } from "../types/index";
import { posts } from '../../database/post';

export const Posts = {
	name: "Posts",
	description: "This request gets all posts",
	type: new GraphQLList(PostType),
	resolve: async (parent: any, args: any, context: any) => {
		// const Posts = posts;
		return posts;
	}
};

export const Post = {
	name: "Post",
	description: "This request gets a single post",
	type: PostType,
	args: { id: { type: GraphQLID } },
	resolve: async (parent: any, args: any, context: any) => {
    if(!args.id) return;
    // console.info(args.id);
		const post = await posts.find(post => post.id == args.id);
    // console.info(post);
    if(!post) return;

		return post;
	}
};

export const addPost = {
  name: "addPost",
	description: "This requests add a single post",
  type: PostType,
  args: {
    title: {type: GraphQLString},
    content: {type: GraphQLString},
    photoURL: {type: GraphQLString},
    date: {type: GraphQLString},
    isPublished: {type: GraphQLBoolean},
    authorId: {type: GraphQLID},
  },
  // resolve: async (parent: any, args: { title?: string; content?: string; photoURL?: string; date?: string; authorId?: number; isPublished?: boolean; }, context: any) => {
  resolve: async (parent: any, args: any, context: any) => {
    if (!args.title || !args.content || !args.photoURL || !args.date || typeof args.isPublished != 'boolean' || !args.authorId) return;
    const postId = posts.push({ 
      id: posts.length + 1, 
      title: args.title, 
      content: args.content, 
      photoURL: args.photoURL, 
      date: args.date,
      isPublished: args.isPublished, 
      authorId: args.authorId 
    });
    // console.log(new_post, ...args);
    return {id: postId, ...args};
  }
}

export const updatePost = {
  name: "updatePost",
	description: "This request updates a single post",
  type: PostType,
  args: {
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    content: {type: GraphQLString},
    photoURL: {type: GraphQLString},
    date: {type: GraphQLString},
    isPublished: {type: GraphQLBoolean},
    authorId: {type: GraphQLID},
  },
  resolve: async (parent: any, { id, title, content, photoURL, date, isPublished, authorId }: any, context: any) => {
  // resolve: async (parent: any, args: { id?: number; title?: string; content?: string; photoURL?: string; date?: string; authorId?: number; isPublished?: boolean; }, context: any) => {
    if (!id || !title || !content || !photoURL || !date || typeof isPublished != 'boolean' || !authorId) return;
    const post = posts.findIndex(post => post.id == id);
    if(!post) return;
    const item = {
      id, 
      title, 
      content, 
      photoURL, 
      date, 
      isPublished, 
      authorId 
    };
		const update_post = posts.splice(post, 1, item);
    // console.log(update_post);
    return update_post[0];
  }
}

export const deletePost = {
  name: "deletePost",
	description: "This request deletes a single post",
  type: PostType,
  args: { id: { type: GraphQLID } },
  resolve: async (parent: any, args: any, context: any) => {
    if(!args.id) return;
    const post = posts.findIndex(post => post.id == args.id);
    if(!post) return;
		const deleted_post = posts.splice(post, 1);
    return deleted_post[0];
  }
}

// const RootQuery = new GraphQLObjectType({
// 	name: "RootQuery",
// 	description: "This is the rootquery",
// 	fields: {
// 		Posts,
// 		Post
// 	}
// });

// const RootMutation = new GraphQLObjectType({
//   name: "RootMutation",
//   fields: {
//     addPost,
//     updatePost,
//     deletePost
//   }
// });

// export { RootQuery, RootMutation };