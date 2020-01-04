import uuidv4 from 'uuid/v4';




// On defenis une variable "me" qui prend comme champ le premier user comme champ
//const me = users[1]; Plus besoin de l'utiliser car il est init dans l'argument contexte(3eme argument) de Apollo serveur 
// Le resolvers permet d'aller chercher les donnée dans la DB c'est ici que tous les query devront etre effectuée
export default {

    Query: {
  
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
    users: (parent, args, { models }) => {
        return Object.values(models.users);
      },
      user: (parent, { id }, { models }) => {
        return models.users[id];
      },
      me: (parent, args, { me }) => {
        return me;
      },
      messages: (parent, args, { models }) => {
        return Object.values(models.messages);
      },
      message: (parent, { id }, { models }) => {
        return models.messages[id];
      },
    },
    
    User : {
      messages:(user , args , { models }) => {
        return Object.values(models.messages).filter(
          message => message.userID === user.id
        )
      },
    },
  
  
    Message: {
      user: (message , args , { models }) => {
        return users[message.userId]
      },
    },
  
    Mutation : {
      createMessage: (parent, {text} , { me , models }) => {
        const id = uuidv4();
        const message = {
          id,
          text,
          userId : me.id,
        };
        models.messages[id] = message;
        models.users[me.id].messageIds.push(id);
        return message
      },
      deleteMessage:(parent, { id }, {models}) =>{
        const{[ id ]: message, ...otherMessages }= models.messages;
  
        if(!message) {
          return false
        }
        models.messages = otherMessages;
        return true;
      }
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