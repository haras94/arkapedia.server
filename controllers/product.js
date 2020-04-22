require('dotenv').config();
const Products = require('../models').product;
const { ErrorHandler } = require('../helper/error');

exports.addProduct = (req, res, next) => {
  Products
    .create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount,
      status: 1,
      quantity: req.body.quantity,
    })
    .then(data => {
      res.status(201).send({
        product: data,
        message: 'product has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllProducts = (req, res, next) => {
  Products.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
  })
    .then(data => {
      res.status(200).send({
        Products: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getProductById = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Products.findOne({
      where: {
        id: productId
      }
    });
    if (!product) {
      throw new ErrorHandler(404, 'product not found!');
    }
    else {
      Products
        .findOne({
          where: {
            id: productId
          },
          exclude: ["createdAt", "updatedAt"],
        })
        .then(data => {
          res.status(200).send({
            product: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Products.findOne({
      id: productId
    });
    if (!product) {
      throw new ErrorHandler(404, 'product not found!')
    } else {
      Products
        .update({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          discount: req.body.discount,
          status: req.body.status,
          quantity: req.body.quantity,
        }, {
          where: {
            id: productId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'product has been updated!',
            product: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Products.findOne({
      where: {
        id: productId
      }
    });
    if (!product) {
      throw new ErrorHandler(404, 'product not found!');
    } else {
      Products
        .destroy({
          where: {
            id: productId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'product has been deleted!',
            product: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

