import 'dotenv/config';
import hi from "./page_1.js" ;
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
console.log("Pinguin");
console.log(process.env.MY_SECRET);
let msg = require("./page_1.js");




const app = express();
const schema = gql`
  type Query {
    me: User
  }
  type User {
    username: String!
  }
`;
const resolvers = {
  Query: {
    me: () => {
      return {
        username: 'Robin Wieruch',
      };
    },
  },
};
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});
server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});



