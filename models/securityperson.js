'use strict';
module.exports = function(sequelize, DataTypes) {
  var SecurityPerson = sequelize.define('SecurityPerson', {
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          SecurityPerson.belongsTo(sequelize.models.User, { foreignKey: 'user_id' });
      }
    }
  });
  return SecurityPerson;
};