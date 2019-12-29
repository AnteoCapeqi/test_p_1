# Test d'install et de setup d'Apollo/Express
Avec l'aide du Tuto suivant: "https://www.robinwieruch.de/graphql-apollo-server-tutorial#apollo-server-setup-with-express"
# Creation de l'environement
0. Prérequis
-Node.js

1. Initialisation du projet avec Npm.
- On commence par creer notre repo avec gitHub. 
- Ensuite on lance un ```npm init -y``` pour commencer notre projet
- On cree ensuite le repo src dans le root de notre app ```mkdir src```
- On cree aussi le fichier index.js apres avoir accédé au dossier ```cd src && touch index.js```
- On effectue un console.log("Ok tout roule") dans index.js pour verifier que tous fonctionne lors du lancement de node
- On lance ```node src/index.js```
- On nous renvoie ("Ok tout roule").
- On rajoute dans la partie script du fichier package.json ```"start": "node src/index.js",``` pour initialiser notre projet avec "npm start"

2. Install de nodeamon
(FrameWork permettant de lancer en continu notre serveur sans devoir faire npm start a chaque fois qu'un changement est effectué.)
- On installe nodeamon avec la commande ```npm install nodemon --save-dev```
- On change ensuite dans le fichier package.json la commande start dans script par ```nodemon src/index.js```
- On change le console.log en ("Ca roule toujours")

3. Install de Babel
(Babel est un compileur javascript qui permet d'utiliser toutes les fonctionalité de celui ci car node ne possede pas toutes les fonctionalité)
- On installe Babel avec la commande suivante ```npm install @babel/core @babel/node --save-dev```
- On change ensuite dans le fichier package.json la commande start dans script par ```nodemon --exec babel-node src/index.js```
- On installe ensuite les preset de Babel ```npm install @babel/preset-env --save-dev```
- On cree un fichier .babelrc ```touch .babelrc```
- On ajoute le script suivant dans le fichier precedent :
```
{
  "presets": [
    "@babel/preset-env"
  ]
}
```
#### Attention: J'ai eu un soucis ici de permission avec Babel. Ma solution qui n'est sans doute pas la bonne est d'avoir effectué un Chmod 777 sur le fichier node_modules.

4. Environnement Variables avec node.js 
(Permet de stocké des variables dans le fichier env)
- On crée le fichier .env dans le root ```touch .env```
- On crée ensuite un variable dans le fichier .env (Afin de verifier que tous fonctionne) voici un exemple
```
MY_SECRET=Ca roule encore!
```
- On installe dotenv qui est une librairie js qui nous permet d'acceder au donnée du .env depuis l'index.js ```npm install dotenv --save```
- On rajoute ensuite dans index.js
```
import 'dotenv/config';
console.log(process.env.MY_SECRET);
```
- La console ensuite nous affiche "Ca roule encore!" donc on peux continuer.
#### Attention : Bien mettre les elements dans l'ordre! Toujours commencer par l'import en premier

5. Installation de Appollo Server avec Express
(AppoloServer est geré par express et on utilise express graphql comme middleware)
- On installe Appolo Server ```npm install apollo-server apollo-server-express --save```
- On installe ensuite Express Graphql ```npm install express graphql --save```
- On ajoute importe ensuite les deux modules dans index.js:
```
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
```
- On lance ensuite express dans index.js
```
const app = express();
```
- Ensuite on crée le schema de notre DB, on commence par un type query qui va definir la strucuture de notre DB. Le gql est pour le format Graphql ,
On definis un champ "me" qui est de l'objet User,
On definis ici une table user avec un champ username(qui sera de type String et obligatoire('!'))
```
const schema = gql`
  type Query {
    me: User
  }
  type User {
    username: String!
  }
`;
```
- On crée ensuite le resolvers de notre DB. On a reussis a creer nos donnée nous allons aller les chercher avec ce resolver. Qui va effectuer pour nous des requetes sur notres DB
On crée les Query qui seront nos requetes
On fait une requete pour que nous renvoie l'username de 'me' avec la valeur 'Robin Wieruch'
```
const resolvers = {
  Query: {
    me: () => {
      return {
        username: 'Robin Wieruch',
      };
    },
  },
};
```
- On va ensuite configurer notre AppoloServer. On va lui attribuer comme deux premier arguments le shema et le resolvers
```
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});
```
- On va ensuite lancer le serveur. On place en premier argument de applyMiddleware notre app(express) et on definis le chemin de notre app sur serveur.
```
server.applyMiddleware({ app, path: '/graphql' });
```
- On lui indique quel ports utilisé pour le serveur. 'http://localhost:8000/graphql' nous donne accés au GraphQl Playground ou nous pourrons effectuer des requetes
```
app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
```
- On ajoute ensuite dans l'import d'AppolloServer l'argument gql 
```
import { ApolloServer, gql } from 'apollo-server-express';
```

- Nous allons verifier sur le playground si tous fonctionne bien.
```
{
  me {
    username
  }
}
```
Nous recevons :
```
{
    "me": {
      "username": "Robin Wieruch"
    }
}
```
Parfait nous pouvons continuer

#### Attention Cette partie sur Cors est optionelle. Toutefois elle est tres pratique
- On installe Cors ```npm install cors --save```
(Cors permet d'effectuer des requetes depuis un autre nom de domaine que le sien. tres pratique pour les tests)
- On importe ensuite notre module sur index.js ```import cors from 'cors';```
- On lance ensuite cors ```app.use(cors());```
(Il faut cependant le placer apres ```const app = express();```)
