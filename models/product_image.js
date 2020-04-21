'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_image = sequelize.define('product_image', {
    productId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER
  }, {});
  product_image.associate = function(models) {
    // associations can be defined here
  };
  return product_image;
};