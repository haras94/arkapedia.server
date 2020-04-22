'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    discount: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  product.associate = function(models) {
    // associations can be defined here
    product.hasMany(models.product_image, {
      foreignKey: 'id',
      as: 'productImage',
      sourceKey: 'id'
    });
    product.hasMany(models.product_category, {
      foreignKey: 'id',
      as: 'productCategory',
      sourceKey: 'id'
    });
  };
  return product;
};
