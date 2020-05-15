'use strict';
module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('image', {
    image1: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,
    image4: DataTypes.STRING,
    image5: DataTypes.STRING
  }, {});
  image.associate = function(models) {
    // associations can be defined here
    image.hasMany(models.product_image, {
      foreignKey: 'id',
      as: 'productImage',
      sourceKey: 'id'
    });
    image.hasMany(models.product, {
      foreignKey: 'id',
      as: 'image',
      sourceKey: 'id'
    });
  };
  return image;
};
