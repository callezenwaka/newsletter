import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import * as graphqlHTTP from 'express-graphql';
import { graphqlUploadExpress, } from 'graphql-upload';
import { schema } from "./graphql/schema";

const app: Application = express();

declare global {
  var dirname: string;
}

// Assignement works fine now
// https://marcinbiernat.pl/2020/03/nodejs-globals/
global.dirname = path.join(__dirname);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP.graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Set up port and start the server
app.listen( process.env.PORT, () => {
  console.log(`Server running at:`);
  console.log(`- Local: http://localhost:${process.env.PORT}/graphql`);
  console.log(`- Network: http://000.000.0.000:${process.env.PORT}/graphql`);
});

export default app;