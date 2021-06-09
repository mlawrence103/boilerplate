const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database');
const SECRET = process.env.JWT;
const SALT_COUNT = 3;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  githubId: {
    type: Sequelize.STRING,
  },
});

User.prototype.correctPassword = function (candidatePassword) {
  return bcrypt.cpompare(candidatePassword, this.password);
};

User.prototype.generateToken = async function () {
  return await jwt.sign({ userId: user.id }, SECRET);
};

// class methods
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (await bcrypt.compare(password, user.password)) {
    return user.generateToken();
  }
  const error = Error('bad credentials');
  error.status = 401;
  throw error;
};

User.findByToken = async function (token) {
  try {
    const userInfo = await jwt.verify(token, SECRET);
    if (userInfo) {
      const user = await User.findByPk(userInfo.userId);
      return user;
    }
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  } catch (ex) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

async function hashPassword(user) {
  if (user.changed('password')) {
    const hashedPwd = await bcrypt.hash(user.password, SALT_COUNT);
    user.password = hashedPwd;
  }
}

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);

module.exports = User;
