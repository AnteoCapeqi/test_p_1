## Test d'install et de setup d'Apollo/Express
Avec l'aide du Tuto suivant: "https://www.robinwieruch.de/graphql-apollo-server-tutorial#apollo-server-setup-with-express"


# Creation de l'environement et lancement du projet

0. Prérequis
-Node.js

1. Initialisation du projet avec Npm.
- On commence par creer notre repo avec gitHub. 
- Ensuite on lance un "npm init -y" pour commencer notre projet
- On cree ensuite le repo src dans le root de notre app "mkdir src" 
- On cree aussi le fichier index.js apres avoir accédé au dossier "cd src && touch index.js"
- On effectue un console.log("Ok tout roule") dans index.js pour verifier que tous fonctionne lors du lancement de node
- On lance node src/index.js.
- On nous renvoie ("Ok tout roule").
- On rajoute dans la partie script du fichier package.json "start": "node src/index.js", pour initialiser notre projet avec "npm start"

2. Install de nodeamon
(FrameWork permettant de lancer en continu notre serveur sans devoir faire npm start a chaque fois qu'un changement est effectué.)
- On install nodeamon avec la commande "npm install nodemon --save-dev"
- On change ensuite dans le fichier package.json la commande start dans script par "nodemon src/index.js"
- On change le console.log en ("Ca roule toujours")

3. Install de Babel
(Babel est un compileur javascript qui permet d'utiliser toutes les fonctionalité de celui ci car node ne possede pas toutes les fonctionalité)
- On installe Babel avec la commande suivante "npm install @babel/core @babel/node --save-dev"
- On change ensuite dans le fichier package.json la commande start dans script par "nodemon --exec babel-node src/index.js"
- On installe ensuite les preset de Babel  "npm install @babel/preset-env --save-dev"
- On cree un fichier .babelrc "touch .babelrc"
- On ajoute le script suivant dans le fichier precedent :
```
{
  "presets": [
    "@babel/preset-env"
  ]
}
```
