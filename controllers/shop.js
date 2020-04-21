require('dotenv').config();
const Shops = require('../models').shop;
const { ErrorHandler } = require('../helper/error');

exports.addShop = (req, res, next) => {
  Shops
    .create({
      name: req.body.name,
      rating: req.body.rating,
      description: req.body.description,
      location: req.body.location,
      followers: req.body.followers,
      soldProduct: req.body.soldProduct,
    })
    .then(data => {
      res.status(201).send({
        shop: data,
        message: 'shop has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllShops = (req, res, next) => {
  Shops.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
  })
    .then(data => {
      res.status(200).send({
        shops: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getShopById = async (req, res, next) => {
  const shopId = req.params.shopId;

  try {
    const shop = await Shops.findOne({
      where: {
        id: shopId
      }
    });
    if (!shop) {
      throw new ErrorHandler(404, 'shop not found!');
    }
    else {
      Shops
        .findOne({
          where: {
            id: shopId
          },
          exclude: ["createdAt", "updatedAt"],
        })
        .then(data => {
          res.status(200).send({
            shop: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateShop = async (req, res, next) => {
  const shopId = req.params.shopId;

  try {
    const shop = await Shops.findOne({
      id: shopId
    });
    if (!shop) {
      throw new ErrorHandler(404, 'shop not found!')
    } else {
      Shops
        .update({
          name: req.body.name,
          rating: req.body.rating,
          description: req.body.description,
          location: req.body.location,
          followers: req.body.followers,
          soldProduct: req.body.soldProduct,
        }, {
          where: {
            id: shopId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'shop has been updated!',
            shop: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteShop = async (req, res, next) => {
  const shopId = req.params.shopId;

  try {
    const shop = await Shops.findOne({
      where: {
        id: shopId
      }
    });
    if (!shop) {
      throw new ErrorHandler(404, 'shop not found!');
    } else {
      Shops
        .destroy({
          where: {
            id: shopId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'shop has been deleted!',
            shop: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

