'use strict';
module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define('tag', {
    name: DataTypes.STRING
  }, {});
  tag.associate = function(models) {
    // associations can be defined here
    tag.hasMany(models.product, {
      foreignKey: 'id',
      as: 'tag',
      sourceKey: 'id'
    });
  };
  return tag;
};
