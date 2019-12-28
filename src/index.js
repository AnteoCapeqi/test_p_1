//Cette import permet de manipuler des dossier depuis le .env avec le fichier js( Voir Comment 1)
import 'dotenv/config';
// On importe la fonction hi depuis le fichier page_1 
import hi from "./page_1.js" ;
//Express est un framework qui permet de gerer des serveurs. On l'utilise ici avec apollo. 
import express from 'express';
//Apollo serveur est un framework permetannt de creer et gerer des bases de donnée avec graphql
import { ApolloServer, gql } from 'apollo-server-express';
//Nous permet d'accepeter plusieur demande de plusieur sources.
import cors from 'cors';
//1 . On affcihe dans la console une valeur stockée dans le .env
console.log(process.env.MY_SECRET);
// On appelle notre fonction ("concole log depuis le fichier page 1")
let msg = require("./page_1.js");



// On lance le serveur express en l'initalisant dans une constante
const app = express();
// On construit ici le schema de notre "base de donnée"
//Le schema est un liste de definitions de type. On commence par le type Query puis on remplis les differents champs(User,Message) de la DB
//gql´...` est le format GraphQl de DB
//Pour le premier "users : [User!]" On cree un type users que tous les users possede par defaut et qui est obligatoire
//Pour le second "me :User" On definis un objet me de typer User. Dans ce ca il a le "scalar type(champ classique)" username(string) et id(ID)
//'!' veut dire que ces champs ne peuvent pas etre null 
// Message 
const schema = gql`
  type Query {
    users: [User!]
    me: User
    user(id : ID!) : User

    messages: [Message!]!
    message(id: ID!): Message!
  }
  type User {
    username: String!
    id :ID!
  }
  type Message{
    id: ID!
    text: String!
  }
`;
//User est une table qui est composée des champ Id et usernam
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
//message est une table qui est composée des champ Id et usernam
let messages = {
  1: {
    id: '1',
    text: 'Hello World',
  },
  2: {
    id: '2',
    text: 'By World',
  },
};
// On defenis une variable "me" qui prend comme champ le premier user comme champ
//const me = users[1]; Plus besoin de l'utiliser car il est init dans l'argument contexte(3eme argument) de Apollo serveur 
// Le resolvers permet d'aller chercher les donnée dans la DB c'est ici que tous les query devront etre effectuée
const resolvers = {

  Query: {
    // On renvoie l'ensemble des donnée de la table users 
    users: () => {
      return Object.values(users);
    },
    // On renvoie toutes les données de 'me'
    // Le 3 eme 'me' argument viens de context.
    me: (parent, args, { me }) => {
      return me;
    },
    //On renvoie les donnée d'un user ciblé en fonction de son ID
    user: (parent, {id}) => {
      return users[id];
    },
    //On renvoie l'ensemble des donnée de la table message
    messages: () => {
      return Object.values(messages);
    },
    //On renvoie les donnée d'un message ciblé en fonction de son ID
    message: (parent, { id }) => {
      return messages[id];
    },
  },
  
  // Ici on impose a tous les usernames la valeur 'Hans'
  // User: {
  //     username: () => 'Hans',
  // },

  //Ici on renvoie le parent de username lorsque l'on demande le username(redondant)
  // User: {
  //   username: parent => {
  //     return parent.username;
  //   }
  // }

  //On definis ici a username un nom et prenom
  // User: {
  //   username: user => `${user.firstname} ${user.lastname}`,
  // },
};
//On lance le serveur Apollo
const server = new ApolloServer({
  // Definitions des types -> schema et requete faite avec resolvers
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
});
//On utilise ici 'applyMiddleware' pour lancer express avec le serveur appollo pour lancer Graphql playground
//On lance dans le navigateur localhost:8000/graphql pour acceder a la page de graphql playground
server.applyMiddleware({ app, path: '/graphql' });
//On lance notre page sur le port 8000
app.listen({ port: 8000 }, () => {
  //Message d'affichage lorsque le serveur est en ligne
  console.log('Apollo Server on http://localhost:8000/graphql');
});
//Lancement de cors
app.use(cors());


