'use strict';
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define('payment', {
    name: DataTypes.STRING
  }, {});
  payment.associate = function(models) {
    // associations can be defined here
    payment.hasMany(models.user_payment, {
      foreignKey: 'id',
      as: 'userPayment',
      sourceKey: 'id'
    });
  };
  return payment;
};
