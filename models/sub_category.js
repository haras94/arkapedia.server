'use strict';
module.exports = (sequelize, DataTypes) => {
  const sub_category = sequelize.define('sub_category', {
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {});
  sub_category.associate = function(models) {
    // associations can be defined here
  };
  return sub_category;
};