import {GraphQLString, GraphQLInt, GraphQLFloat, GraphQLObjectType, GraphQLBoolean} from 'graphql';

export const PostType = new GraphQLObjectType({
  name: "Service",
  description: "This is the service type definition.",
  fields: () => ({
    id: {type: GraphQLInt},
    title: {type: GraphQLString},
    content: {type: GraphQLString},
    photoURL: {type: GraphQLString},
    date: {type: GraphQLString},
    isPublished: {type: GraphQLBoolean},
    authorId: {type: GraphQLInt},
  })
});