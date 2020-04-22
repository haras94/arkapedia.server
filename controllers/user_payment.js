require('dotenv').config();
const UserPayments = require('../models').user_payment;
const Users = require('../models').user;
const Payments = require('../models').payment;
const { ErrorHandler } = require('../helper/error');

exports.addUserPayment = (req, res, next) => {
  UserPayments
    .create({
      userId: req.body.userId,
      paymentId: req.body.paymentId,
    })
    .then(data => {
      res.status(201).send({
        userPayment: data,
        message: 'userPayment has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllUserPayments = (req, res, next) => {
  UserPayments.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
    include: [
      { model: Users, as: "user", attributes: ["name"] },
      { model: Payments, as: "payment", attributes: ["name"] },
    ]
  })
    .then(data => {
      res.status(200).send({
        userPayments: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getUserPaymentById = async (req, res, next) => {
  const userPaymentId = req.params.userPaymentId;

  try {
    const userPayment = await UserPayments.findOne({
      where: {
        id: userPaymentId
      }
    });
    if (!userPayment) {
      throw new ErrorHandler(404, 'userPayment not found!');
    }
    else {
      UserPayments
        .findOne({
          where: {
            id: userPaymentId
          },
          exclude: ["createdAt", "updatedAt"],
        })
        .then(data => {
          res.status(200).send({
            userPayment: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateUserPayment = async (req, res, next) => {
  const userPaymentId = req.params.userPaymentId;

  try {
    const userPayment = await UserPayments.findOne({
      id: userPaymentId
    });
    if (!userPayment) {
      throw new ErrorHandler(404, 'userPayment not found!')
    } else {
      UserPayments
        .update({
          userId: req.body.userId,
          paymentId: req.body.paymentId,
        }, {
          where: {
            id: userPaymentId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'userPayment has been updated!',
            userPayment: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteUserPayment = async (req, res, next) => {
  const userPaymentId = req.params.userPaymentId;

  try {
    const userPayment = await UserPayments.findOne({
      where: {
        id: userPaymentId
      }
    });
    if (!userPayment) {
      throw new ErrorHandler(404, 'userPayment not found!');
    } else {
      UserPayments
        .destroy({
          where: {
            id: userPaymentId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'userPayment has been deleted!',
            userPayment: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

