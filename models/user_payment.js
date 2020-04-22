'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_payment = sequelize.define('user_payment', {
    userId: DataTypes.INTEGER,
    paymentId: DataTypes.INTEGER
  }, {});
  user_payment.associate = function(models) {
    // associations can be defined here
    user_payment.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user',
      sourceKey: 'id'
    });
    user_payment.belongsTo(models.payment, {
      foreignKey: 'paymentId',
      as: 'payment',
      sourceKey: 'id'
    });
  };
  return user_payment;
};
