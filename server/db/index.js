//define model associations in this file

const db = require('./database');
const Example = require('./example');

//e.g. Example.belongsTo(ExampleOwner)
//ExampleOwner.hasMany(Example)

module.exports = { db, Example };

// module.exports = { db, Example, ExampleOwner };
