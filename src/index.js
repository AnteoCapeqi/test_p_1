//Cette import permet de manipuler des dossier depuis le .env avec le fichier js( Voir Comment 1)
import 'dotenv/config';
// On importe la fonction hi depuis le fichier page_1 
import hi from "./page_1.js" ;
//Express est un framework qui permet de gerer des serveurs. On l'utilise ici avec apollo. 
import express from 'express';
//Apollo serveur est un framework permetannt de creer et gerer des bases de donnée avec graphql
import { ApolloServer } from 'apollo-server-express';
//Nous permet d'accepeter plusieur demande de plusieur sources.
import cors from 'cors';
//1 . On affcihe dans la console une valeur stockée dans le .env
console.log(process.env.MY_SECRET);
// On appelle notre fonction ("concole log depuis le fichier page 1")
let msg = require("./page_1.js");
// Ce framework permet de donner un id unique a chaque fois qu'il est call
import uuidv4 from 'uuid/v4';

import schema from './schema';
import resolvers from './resolvers';
import models from './models';



// On lance le serveur express en l'initalisant dans une constante
const app = express();
// On construit ici le schema de notre "base de donnée"
//Le schema est un liste de definitions de type. On commence par le type Query puis on remplis les differents champs(User,Message) de la DB
//gql´...` est le format GraphQl de la DB
//Pour le premier "users : [User!]" On cree un type users que tous les users possede par defaut et qui est obligatoire
//Pour le second "me :User" On definis un objet me de typer User. Dans ce ca il a le "scalar type(champ classique)" username(string) et id(ID)
//'!' veut dire que ces champs ne peuvent pas etre null 
// Message 

//On lance le serveur Apollo
const server = new ApolloServer({
  // Definitions des types -> schema et requete faite avec resolvers
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1],
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


