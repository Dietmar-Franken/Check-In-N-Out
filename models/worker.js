'use strict';
module.exports = function(sequelize, DataTypes) {
  var Worker = sequelize.define('Worker', {
    user_id: DataTypes.INTEGER,
    room_num: DataTypes.TEXT,
    phone_num: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
          Worker.belongsTo(sequelize.models.User, { foreignKey: 'user_id' });
          Worker.hasOne(sequelize.models.Appointment, { foreignKey: 'worker_id' });
      }
    }
  });
  return Worker;
};