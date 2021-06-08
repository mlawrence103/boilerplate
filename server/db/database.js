const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const dbName = (process.env.NODE_ENV = 'test' ? `${pkg.name}-test` : pkg.name);

//if using heroku as deployment servise and Heroku Postgres as db
// const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432:yourdbname', {
//   logging: false
// });

const db = new Sequelize(`postgres://localhost:5432/${dbName}`, {
  logging: false,
});

module.exports = db;
