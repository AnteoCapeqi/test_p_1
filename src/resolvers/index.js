
import userResolvers from './user';

import messageResolvers from './message';

export default [userResolvers, messageResolvers];


    // On defenis une variable "me" qui prend comme champ le premier user comme champ
//const me = users[1]; Plus besoin de l'utiliser car il est init dans l'argument contexte(3eme argument) de Apollo serveur 
// Le resolvers permet d'aller chercher les donnée dans la DB c'est ici que tous les query devront etre effectuée
    // EXEMPLE
    //   // On renvoie l'ensemble des donnée de la table users 
    //   users: () => {
    //     return Object.values(users);
    //   },
  
    //   // On renvoie toutes les données de 'me'
    //   // Le 3 eme 'me' argument viens de context.
    //   me: (parent, args, { me }) => {
    //     return me;
    //   },
  
    //   //On renvoie les donnée d'un user ciblé en fonction de son ID
    //   user: (parent, {id}) => {
    //     return users[id];
    //   },
  
    //   //On renvoie l'ensemble des donnée de la table message
    //   messages: () => {
    //     return Object.values(messages);
    //   },
  
    //   //On renvoie les donnée d'un message ciblé en fonction de son ID
    //   message: (parent, { id }) => {
    //     return messages[id];
    //   },  
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