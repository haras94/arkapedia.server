'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_shop = sequelize.define('user_shop', {
    userId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER
  }, {});
  user_shop.associate = function(models) {
    // associations can be defined here
    user_shop.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user',
      sourceKey: 'id'
    });
    user_shop.belongsTo(models.shop, {
      foreignKey: 'shopId',
      as: 'shop',
      sourceKey: 'id'
    });
  };
  return user_shop;
};
