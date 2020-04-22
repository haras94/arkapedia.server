require('dotenv').config();
const UserShops = require('../models').user_shop;
const Users = require('../models').user;
const Shops = require('../models').shop;
const { ErrorHandler } = require('../helper/error');

exports.addUserShop = (req, res, next) => {
  UserShops
    .create({
      userId: req.body.userId,
      shopId: req.body.shopId,
    })
    .then(data => {
      res.status(201).send({
        userShop: data,
        message: 'userShop has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllUserShops = (req, res, next) => {
  UserShops.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
    include: [
      { model: Users, as: "user", attributes: ["name"] },
      { model: Shops, as: "shop", attributes: ["name", "rating", "description", "location", "followers", "soldProduct"] },
    ]
  })
    .then(data => {
      res.status(200).send({
        userShops: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getUserShopById = async (req, res, next) => {
  const userShopId = req.params.userShopId;

  try {
    const userShop = await UserShops.findOne({
      where: {
        id: userShopId
      }
    });
    if (!userShop) {
      throw new ErrorHandler(404, 'userShop not found!');
    }
    else {
      UserShops
        .findOne({
          where: {
            id: userShopId
          },
          exclude: ["createdAt", "updatedAt"],
          include: [
            { model: Users, as: "user", attributes: ["name"] },
            { model: Shops, as: "shop", attributes: ["name", "rating", "description", "location", "followers", "soldProduct"] },
          ]
        })
        .then(data => {
          res.status(200).send({
            userShop: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateUserShop = async (req, res, next) => {
  const userShopId = req.params.userShopId;

  try {
    const userShop = await UserShops.findOne({
      id: userShopId
    });
    if (!userShop) {
      throw new ErrorHandler(404, 'userShop not found!')
    } else {
      UserShops
        .update({
          userId: req.body.userId,
          shopId: req.body.shopId,
        }, {
          where: {
            id: userShopId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'userShop has been updated!',
            userShop: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteUserShop = async (req, res, next) => {
  const userShopId = req.params.userShopId;

  try {
    const userShop = await UserShops.findOne({
      where: {
        id: userShopId
      }
    });
    if (!userShop) {
      throw new ErrorHandler(404, 'userShop not found!');
    } else {
      UserShops
        .destroy({
          where: {
            id: userShopId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'userShop has been deleted!',
            userShop: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

