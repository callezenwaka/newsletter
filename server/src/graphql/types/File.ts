import { GraphQLObjectType, GraphQLID, GraphQLString,GraphQLBoolean,GraphQLInt,GraphQLScalarType, GraphQLList } from "graphql";

export const File = new GraphQLObjectType({
  name: 'File',
  fields: () => {
    return ({
      photoURL: {type: GraphQLString},
      filename: {type: GraphQLString},
    })
  }
});

export const Uploads = new GraphQLScalarType({
  name: 'Upload',
  serialize: (file: any) => file,
  parseValue: (file: any) => file,
  parseLiteral(file) {
    return file;
  }
});