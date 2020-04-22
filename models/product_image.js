'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_image = sequelize.define('product_image', {
    productId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER
  }, {});
  product_image.associate = function(models) {
    // associations can be defined here
    product_image.belongsTo(models.product, {
      foreignKey: 'productId',
      as: 'product',
      sourceKey: 'id'
    });
    product_image.belongsTo(models.image, {
      foreignKey: 'imageId',
      as: 'image',
      sourceKey: 'id'
    });
  };
  return product_image;
};
