'use strict';
module.exports = (sequelize, DataTypes) => {
  const sub_category = sequelize.define('sub_category', {
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {});
  sub_category.associate = function(models) {
    // associations can be defined here
    sub_category.belongsTo(models.category, {
      foreignKey: 'categoryId',
      as: 'category',
      sourceKey: 'id'
    });
  };
  return sub_category;
};
