'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    role: DataTypes.INTEGER,
    firebase_id: DataTypes.TEXT,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
          User.hasOne(sequelize.models.Worker, { foreignKey: 'user_id' });
          User.hasOne(sequelize.models.Customer, { foreignKey: 'user_id' });
          User.hasOne(sequelize.models.SecurityPerson, { foreignKey: 'user_id' });
      }
    }
  });
  return User;
};