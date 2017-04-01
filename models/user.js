'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        firebase_id: DataTypes.TEXT,
        role: DataTypes.INTEGER,
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        isInitial: DataTypes.BOOLEAN
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