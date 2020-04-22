require('dotenv').config();
const UserRoles = require('../models').user_role;
const Users = require('../models').user;
const Roles = require('../models').role;
const { ErrorHandler } = require('../helper/error');

exports.addUserRole = (req, res, next) => {
  UserRoles
    .create({
      userId: req.body.userId,
      roleId: req.body.roleId,
    })
    .then(data => {
      res.status(201).send({
        userRole: data,
        message: 'userRole has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllUserRoles = (req, res, next) => {
  UserRoles.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
    include: [
      { model: Users, as: "user", attributes: ["name"] },
      { model: Roles, as: "role", attributes: ["name"] },
    ]
  })
    .then(data => {
      res.status(200).send({
        userRoles: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getUserRoleById = async (req, res, next) => {
  const userRoleId = req.params.userRoleId;

  try {
    const userRole = await UserRoles.findOne({
      where: {
        id: userRoleId
      }
    });
    if (!userRole) {
      throw new ErrorHandler(404, 'userRole not found!');
    }
    else {
      UserRoles
        .findOne({
          where: {
            id: userRoleId
          },
          exclude: ["createdAt", "updatedAt"],
        })
        .then(data => {
          res.status(200).send({
            userRole: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateUserRole = async (req, res, next) => {
  const userRoleId = req.params.userRoleId;

  try {
    const userRole = await UserRoles.findOne({
      id: userRoleId
    });
    if (!userRole) {
      throw new ErrorHandler(404, 'userRole not found!')
    } else {
      UserRoles
        .update({
          userId: req.body.userId,
          roleId: req.body.roleId,
        }, {
          where: {
            id: userRoleId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'userRole has been updated!',
            userRole: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteUserRole = async (req, res, next) => {
  const userRoleId = req.params.userRoleId;

  try {
    const userRole = await UserRoles.findOne({
      where: {
        id: userRoleId
      }
    });
    if (!userRole) {
      throw new ErrorHandler(404, 'userRole not found!');
    } else {
      UserRoles
        .destroy({
          where: {
            id: userRoleId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'userRole has been deleted!',
            userRole: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

