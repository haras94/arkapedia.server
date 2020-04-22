'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    name: DataTypes.STRING
  }, {});
  role.associate = function(models) {
    // associations can be defined here
    role.hasMany(models.user_role, {
      foreignKey: 'id',
      as: 'userRole',
      sourceKey: 'id'
    });
  };
  return role;
};
