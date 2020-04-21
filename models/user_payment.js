'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_payment = sequelize.define('user_payment', {
    userId: DataTypes.INTEGER,
    paymentId: DataTypes.INTEGER
  }, {});
  user_payment.associate = function(models) {
    // associations can be defined here
  };
  return user_payment;
};