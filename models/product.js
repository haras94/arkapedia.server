'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    discount: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    condition: DataTypes.BOOLEAN,
    imageId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER,
  }, {});
  product.associate = function(models) {
    // associations can be defined here
    product.belongsTo(models.image, {
      foreignKey: 'imageId',
      as: 'image',
      sourceKey: 'id'
    });
    product.belongsTo(models.category, {
      foreignKey: 'categoryId',
      as: 'category',
      sourceKey: 'id'
    });
    product.belongsTo(models.shop, {
      foreignKey: 'shopId',
      as: 'shop',
      sourceKey: 'id'
    });
    product.belongsTo(models.tag, {
      foreignKey: 'tagId',
      as: 'tag',
      sourceKey: 'id'
    });
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
