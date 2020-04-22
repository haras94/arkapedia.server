'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthdate: DataTypes.STRING,
    sex: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    image: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.user_payment, {
      foreignKey: 'id',
      as: 'userPayment',
      sourceKey: 'id'
    });
    user.hasMany(models.user_role, {
      foreignKey: 'id',
      as: 'userRole',
      sourceKey: 'id'
    });
    user.hasMany(models.user_shop, {
      foreignKey: 'id',
      as: 'userShop',
      sourceKey: 'id'
    });
  };
  return user;
};
