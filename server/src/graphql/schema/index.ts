// Import required stuff from graphql
import { GraphQLSchema, GraphQLObjectType } from "graphql";

// Import resolvers
import { Authors, Author, addAuthor, updateAuthor, deleteAuthor } from "../resolvers/author";
import { Posts, Post, addPost, updatePost, deletePost } from "../resolvers/post";
import { addFile } from "../resolvers/File";

// Define RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  description: "Queries",
  fields: {
    Authors,
    Author,
    Posts,
    Post,
  },
})

// Define RootMutation
const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  description: "Mutations",
  fields: {
    addAuthor,
    updateAuthor,
    deleteAuthor,
    addPost,
    updatePost,
    deletePost,
    addFile
  },
})

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});