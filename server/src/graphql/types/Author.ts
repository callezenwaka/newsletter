import { GraphQLString, GraphQLBoolean, GraphQLObjectType, GraphQLID } from 'graphql';

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This is the account type definition.",
  fields: () => ({
    id: {type: GraphQLID},
    displayName: {type: GraphQLString},
    phoneNumber: {type: GraphQLString},
    email: {type: GraphQLString},
    photoURL: {type: GraphQLString},
    role: {type: GraphQLString},
    isActive: {type: GraphQLBoolean},
  })
});

export { AuthorType };