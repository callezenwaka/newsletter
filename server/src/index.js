const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { graphqlUploadExpress, } = require('graphql-upload');
// require('dotenv').config()
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // csrfPrevention: true,
    // uploads: false,
  });

  await server.start();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());
  // app.use(graphqlUploadExpress({ maxFileSize: 10000, maxFiles: 10 }));

  server.applyMiddleware({ app });

  await new Promise(r => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();