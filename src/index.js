import 'dotenv/config';
import hi from "./page_1.js" ;
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express'; 
import cors from 'cors';
console.log("Pinguin");
console.log(process.env.MY_SECRET);
let msg = require("./page_1.js");




const app = express();
const schema = gql`
  type Query {
    users: [User!]
    me: User
    user(id : ID!) : User
  }
  type User {
    username: String!
    id :ID!
  }
`;
let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};
const me = users[1];
const resolvers = {
  Query: {
    users: () => {
      return Object.values(users);
    },
    me: () => {
      return me;
    },
    user: (parent, {id}) => {
      return users[id];
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
app.use(cors());


