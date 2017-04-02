'use strict';
module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define('Customer', {
    user_id: DataTypes.INTEGER,
    phone_num: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
          Customer.belongsTo(sequelize.models.User, { foreignKey: 'user_id' });
          Customer.hasOne(sequelize.models.Appointment, { foreignKey: 'customer_id'});
      }
    }
  });
  return Customer;
};