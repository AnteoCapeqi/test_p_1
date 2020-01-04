import { gql } from 'apollo-server-express'



export default gql`
  type Query {
    me: User

    users: [User!]
    user(id : ID!) : User

    messages: [Message!]!
    message(id: ID!): Message!
  }
  type User {
    username: String!
    id :ID!
    messages: [Message!]
  }
  type Message{
    id: ID!
    text: String!
    user: User!
  }
  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }
`;
