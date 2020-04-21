require('dotenv').config();
const Roles = require('../models').role;
const { ErrorHandler } = require('../helper/error');

exports.addRole = (req, res, next) => {
  Roles
    .create({
      name: req.body.name,
    })
    .then(data => {
      res.status(201).send({
        role: data,
        message: 'role has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllRoles = (req, res, next) => {
  Roles.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
  })
    .then(data => {
      res.status(200).send({
        roles: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getRoleById = async (req, res, next) => {
  const roleId = req.params.roleId;

  try {
    const role = await Roles.findOne({
      where: {
        id: roleId
      }
    });
    if (!role) {
      throw new ErrorHandler(404, 'role not found!');
    }
    else {
      Roles
        .findOne({
          where: {
            id: roleId
          },
          exclude: ["createdAt", "updatedAt"],
        })
        .then(data => {
          res.status(200).send({
            role: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateRole = async (req, res, next) => {
  const roleId = req.params.roleId;

  try {
    const role = await Roles.findOne({
      id: roleId
    });
    if (!role) {
      throw new ErrorHandler(404, 'role not found!')
    } else {
      Roles
        .update({
          name: req.body.name,
        }, {
          where: {
            id: roleId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'role has been updated!',
            role: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteRole = async (req, res, next) => {
  const roleId = req.params.roleId;

  try {
    const role = await Roles.findOne({
      where: {
        id: roleId
      }
    });
    if (!role) {
      throw new ErrorHandler(404, 'role not found!');
    } else {
      Roles
        .destroy({
          where: {
            id: roleId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'role has been deleted!',
            role: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

