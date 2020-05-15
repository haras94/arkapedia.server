require('dotenv').config();
const Orders = require('../models').order;
const Users = require('../models').user;
const Shops = require('../models').shop;
const { ErrorHandler } = require('../helper/error');

exports.addOrder = (req, res, next) => {
  Orders
    .create({
      userId: req.body.userId,
      shopId: req.body.shopId,
      total: req.body.total,
      invoice: req.body.invoice
    })
    .then(data => {
      res.status(201).send({
        order: data,
        message: 'order has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllOrders = (req, res, next) => {
  Orders.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
    include: [
      { model: Users, as: "userOrder", attributes: ["id", "name"] },
      { model: Shops, as: "shopOrder", attributes: ["id", "name"] }
    ]
  })
    .then(data => {
      res.status(200).send({
        orders: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getOrderById = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const order = await Orders.findOne({
      where: {
        id: orderId
      }
    });
    if (!order) {
      throw new ErrorHandler(404, 'order not found!');
    }
    else {
      Orders
        .findOne({
          where: {
            id: orderId
          },
          exclude: ["createdAt", "updatedAt"],
          include: [
            { model: Users, as: "userOrder", attributes: ["id", "name"] },
            { model: Shops, as: "shopOrder", attributes: ["id", "name"] }
          ]
        })
        .then(data => {
          res.status(200).send({
            order: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const order = await Orders.findOne({
      id: orderId
    });
    if (!order) {
      throw new ErrorHandler(404, 'order not found!')
    } else {
      Orders
        .update({
          userId: req.body.userId,
          shopId: req.body.shopId,
          total: req.body.total,
          invoice: req.body.invoice
        }, {
          where: {
            id: orderId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'order has been updated!',
            order: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const order = await Orders.findOne({
      where: {
        id: orderId
      }
    });
    if (!order) {
      throw new ErrorHandler(404, 'order not found!');
    } else {
      Orders
        .destroy({
          where: {
            id: orderId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'order has been deleted!',
            order: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};
