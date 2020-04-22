'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING
  }, {});
  category.associate = function(models) {
    // associations can be defined here
    category.hasMany(models.sub_category, {
      foreignKey: 'id',
      as: 'subCategory',
      sourceKey: 'id'
    });
    category.hasMany(models.product_category, {
      foreignKey: 'id',
      as: 'productCategory',
      sourceKey: 'id'
    });
  };
  return category;
};
