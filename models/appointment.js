'use strict';
module.exports = function(sequelize, DataTypes) {
  var Appointment = sequelize.define('Appointment', {
    time: DataTypes.DATE,
    customer_id: DataTypes.INTEGER,
    worker_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Appointment.belongsTo(sequelize.models.Appointment, { foreignKey: 'customer_id'});
      }
    }
  });
  return Appointment;
};