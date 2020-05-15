'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_category = sequelize.define('product_category', {
    productId: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER
  }, {});
  product_category.associate = function(models) {
    // associations can be defined here
    product_category.belongsTo(models.product, {
      foreignKey: 'productId',
      as: 'productCategory',
      sourceKey: 'id'
    });
    product_category.belongsTo(models.sub_category, {
      foreignKey: 'subCategoryId',
      as: 'subCategory',
      sourceKey: 'id'
    });
  };
  return product_category;
};
