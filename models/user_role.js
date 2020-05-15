'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_role = sequelize.define('user_role', {
    userId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  }, {});
  user_role.associate = function(models) {
    // associations can be defined here
    user_role.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user',
      sourceKey: 'id'
    });
    user_role.belongsTo(models.role, {
      foreignKey: 'roleId',
      as: 'role',
      sourceKey: 'id'
    });
  };
  return user_role;
};
