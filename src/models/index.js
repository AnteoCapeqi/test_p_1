import Sequelize from 'sequelize';


const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
    User: sequelize.import('./user'),
    Message: sequelize.import('./message'),
  };

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
      models[key].associate(models);
    }
});


export { sequelize };

export default models;

// //User est une table qui est composée des champ Id et usernam
// let users = {
//     1: {
//       id: '1',
//       username: 'Robin Wieruch',
//       messageIds :[1],
//     },
//     2: {
//       id: '2',
//       username: 'Dave Davids',
//       messageIds :[2],
//     },
//   };
//   //message est une table qui est composée des champ Id et usernam
//   let messages = {
//     1: {
//       id: '1',
//       text: 'Hello World',
//       userId : '1',
//     },
//     2: {
//       id: '2',
//       text: 'By World',
//       userId : '2',
//     },
//   };
//
//   export default {
//       users,
//       messages,
//   };