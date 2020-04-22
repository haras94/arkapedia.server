'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    userId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    invoice: DataTypes.STRING
  }, {});
  order.associate = function(models) {
    // associations can be defined here
    order.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'userOrder',
      sourceKey: 'id'
    });
    order.belongsTo(models.shop, {
      foreignKey: 'shopId',
      as: 'shopOrder',
      sourceKey: 'id'
    });
  };
  return order;
};
