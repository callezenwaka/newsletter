const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { graphqlUploadExpress, } = require('graphql-upload');
require('dotenv').config()
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
  });

  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise(r => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();