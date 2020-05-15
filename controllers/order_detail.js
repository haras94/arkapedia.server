require('dotenv').config();
const OrderDetails = require('../models').order_detail;
const { ErrorHandler } = require('../helper/error');
const Orders = require('../models').order;
const Products = require('../models').product;

exports.addOrderDetail = (req, res, next) => {
  OrderDetails
    .create({
      orderId: req.body.orderId,
      productId: req.body.productId,
      qty: req.body.qty,
      price: req.body.price
    })
    .then(data => {
      res.status(201).send({
        orderDetail: data,
        message: 'orderDetail has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllOrderDetails = (req, res, next) => {
  OrderDetails.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
    include: [
      { model: Orders, as: "order", attributes: ["total", "invoice"] },
      { model: Products, as: "product", attributes: ["name", "description", "price", "discount", "quantity", "status"] }
    ]
  })
    .then(data => {
      res.status(200).send({
        orderDetails: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getOrderDetailById = async (req, res, next) => {
  const orderDetailId = req.params.orderDetailId;

  try {
    const orderDetail = await OrderDetails.findOne({
      where: {
        id: orderDetailId
      }
    });
    if (!orderDetail) {
      throw new ErrorHandler(404, 'orderDetail not found!');
    }
    else {
      OrderDetails
        .findOne({
          where: {
            id: orderDetailId
          },
          exclude: ["createdAt", "updatedAt"],
          include: [
            { model: Orders, as: "order", attributes: ["total", "invoice"] },
            { model: Products, as: "product", attributes: ["name", "description", "price", "discount", "quantity", "status"] }
          ]
        })
        .then(data => {
          res.status(200).send({
            orderDetail: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateOrderDetail = async (req, res, next) => {
  const orderDetailId = req.params.orderDetailId;

  try {
    const orderDetail = await OrderDetails.findOne({
      id: orderDetailId
    });
    if (!orderDetail) {
      throw new ErrorHandler(404, 'orderDetail not found!')
    } else {
      OrderDetails
        .update({
          orderId: req.body.orderId,
          productId: req.body.productId,
          qty: req.body.qty,
          price: req.body.price
        }, {
          where: {
            id: orderDetailId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'orderDetail has been updated!',
            orderDetails: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteOrderDetail = async (req, res, next) => {
  const orderDetailId = req.params.orderDetailId;

  try {
    const orderDetail = await OrderDetails.findOne({
      where: {
        id: orderDetailId
      }
    });
    if (!orderDetail) {
      throw new ErrorHandler(404, 'orderDetail not found!');
    } else {
      OrderDetails
        .destroy({
          where: {
            id: orderDetailId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'orderDetail has been deleted!',
            orderDetail: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};
