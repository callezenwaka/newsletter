import { GraphQLString, GraphQLList, GraphQLBoolean, GraphQLID } from 'graphql';
import { AuthorType } from "../types/index";
import { authors } from "../../database/Author";
import { v4 as uuid } from 'uuid';

export const Authors = {
	name: "authors",
	description: "This request gets all authors",
	type: new GraphQLList(AuthorType),
	resolve: async (parent: any, args: any) => {
		// const authors = authors;
		return authors;
	}
};

export const Author = {
	name: "author",
	description: "This request gets a single author",
	type: AuthorType,
	args: { id: { type: GraphQLID } },
	resolve: async (parent: any, args: any, context: any) => {
    if(!args.id) return;
    const author = authors.find(author => author.id == args.id);
    if(!author) return;
    // console.log(author);

    return author;
	}
};

export const addAuthor = {
  name: "addAuthor",
	description: "This requests add a single author",
  type: AuthorType,
  args: {
    displayName: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    email: { type: GraphQLString },
    photoURL: { type: GraphQLString },
    role: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
  },
  resolve: async (parent: any, args: any, context: any) => {
    if (!args.displayName || !args.email || !args.phoneNumber || !args.photoURL || !args.role || typeof args.isActive != 'boolean') return;
    const authorId = authors.push({
      id: uuid(),
      displayName: args.displayName,
      email: args.email,
      phoneNumber: args.phoneNumber,
      photoURL: args.photoURL,
      role: args.role,
      isActive: args.isActive,
    });
    // const new_author = authors.push(item);
    // console.log(authorId, ...args);
    return {id: authorId, ...args};
  }
}

export const updateAuthor = {
  name: "UpdateAuthor",
	description: "This request updates a single author",
  type: AuthorType,
  args: {
    id: { type: GraphQLID },
    displayName: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    email: { type: GraphQLString },
    photoURL: { type: GraphQLString },
    role: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
  },
  resolve: async (parent: any, args: any, context: any) => {
    if (!args.id || !args.displayName || !args.email || !args.phoneNumber || !args.photoURL || !args.role || typeof args.isActive != 'boolean') return;
    const author = authors.findIndex(author => author.id == args.id);
    if(!author) return;
    const item = {
      id: args.id,
      displayName: args.displayName,
      email: args.email,
      phoneNumber: args.phoneNumber,
      photoURL: args.photoURL,
      role: args.role,
      isActive: args.isActive,
    }
		const update_author = authors.splice(author, 1, item);
    return update_author[0];
  }
}

export const deleteAuthor = {
  name: "deleteAuthor",
	description: "This request deletes a single author",
  type: AuthorType,
  args: { id: { type: GraphQLID } },
  resolve: async (parent: any, args: any, context: any) => {
    if(!args.id) return;
    const author = authors.findIndex(author => author.id == args.id);
    if(!author) return;
		const deleted_author = authors.splice(author, 1);
    return deleted_author[0];
  }
}

// const QueryType = new GraphQLObjectType({
// 	name: "RootQuery",
// 	description: "This is the rootquery",
// 	fields: {
// 		Authors,
// 		Author,
// 	}
// });

// const MutationType = new GraphQLObjectType({
//   name: "RootMutation",
//   fields: {
//     addAuthor,
//     deleteAuthor,
//     updateAuthor
//   }
// });

// export { RootQuery, RootMutation };