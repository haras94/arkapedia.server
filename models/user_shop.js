'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_shop = sequelize.define('user_shop', {
    userId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER
  }, {});
  user_shop.associate = function(models) {
    // associations can be defined here
  };
  return user_shop;
};