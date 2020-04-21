require('dotenv').config();
const Payments = require('../models').payment;
const { ErrorHandler } = require('../helper/error');

exports.addPayment = (req, res, next) => {
  Payments
    .create({
      name: req.body.name,
    })
    .then(data => {
      res.status(201).send({
        payment: data,
        message: 'payment has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllPayments = (req, res, next) => {
  Payments.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
  })
    .then(data => {
      res.status(200).send({
        payments: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getPaymentById = async (req, res, next) => {
  const paymentId = req.params.paymentId;

  try {
    const payment = await Payments.findOne({
      where: {
        id: paymentId
      }
    });
    if (!payment) {
      throw new ErrorHandler(404, 'payment not found!');
    }
    else {
      Payments
        .findOne({
          where: {
            id: paymentId
          },
          exclude: ["createdAt", "updatedAt"],
        })
        .then(data => {
          res.status(200).send({
            payment: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updatePayment = async (req, res, next) => {
  const paymentId = req.params.paymentId;

  try {
    const payment = await Payments.findOne({
      id: paymentId
    });
    if (!payment) {
      throw new ErrorHandler(404, 'payment not found!')
    } else {
      Payments
        .update({
          name: req.body.name,
        }, {
          where: {
            id: paymentId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'payment has been updated!',
            payment: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deletePayment = async (req, res, next) => {
  const paymentId = req.params.paymentId;

  try {
    const payment = await Payments.findOne({
      where: {
        id: paymentId
      }
    });
    if (!payment) {
      throw new ErrorHandler(404, 'payment not found!');
    } else {
      Payments
        .destroy({
          where: {
            id: paymentId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'payment has been deleted!',
            payment: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

