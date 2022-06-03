import { GraphQLString, GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLScalarType, GraphQLObjectType, Kind } from 'graphql';
import { authors } from "../../database/Author";

export const DateType = new GraphQLScalarType({
  name: 'DateType',
  description: "This is the date type definition.",
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if(ast.kind === Kind.INT)
      return parseInt(ast.value, 10);
    return null;
  },
  serialize(value) {
    const date = new Date(value);

    return date.toISOString();
  }
})

export const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This is the author type definition.",
  fields: () => ({
    id: { type: GraphQLID },
    displayName: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    email: { type: GraphQLString },
    photoURL: { type: GraphQLString },
    role: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
  })
});

export const PostType = new GraphQLObjectType({
  name: "Post",
  description: "This is the post type definition.",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    photoURL: { type: GraphQLString },
    date: { type: DateType },
    isPublished: { type: GraphQLBoolean },
    author: { 
      type: AuthorType,
      resolve(parent: any, args: any) {
        return authors.find(author => author.id == parent.authorId);   
      }
    },
  })
});

export const FileType = new GraphQLObjectType({
  name: 'File',
  description: "This is the file type definition.",
  fields: () => {
    return ({
      photoURL: { type: GraphQLString },
      filename: { type: GraphQLString },
    })
  }
});

export const UploadType = new GraphQLScalarType({
  name: 'Upload',
  description: "This is the upload type definition.",
  serialize: (file: any) => file,
  parseValue: (file: any) => file,
  parseLiteral(file) {
    return file;
  }
});