require('dotenv').config();
const ProductImages = require('../models').product_image;
const Products = require('../models').product;
const Images = require('../models').image;
const { ErrorHandler } = require('../helper/error');

exports.addProductImage = (req, res, next) => {
  ProductImages
    .create({
      productId: req.body.productId,
      imageId: req.body.imageId,
    })
    .then(data => {
      res.status(201).send({
        productImage: data,
        message: 'productImage has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllProductImages = (req, res, next) => {
  ProductImages.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
    include: [
      { model: Products, as: "product", attributes: ["id", "name"] },
      { model: Images, as: "image", attributes: ["image1", "image2", "image3", "image4", "image5"] }
    ]
  })
    .then(data => {
      res.status(200).send({
        ProductImages: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getProductImageById = async (req, res, next) => {
  const productImageId = req.params.productImageId;

  try {
    const productImage = await ProductImages.findOne({
      where: {
        id: productImageId
      }
    });
    if (!productImage) {
      throw new ErrorHandler(404, 'productImage not found!');
    }
    else {
      ProductImages
        .findOne({
          where: {
            id: productImageId
          },
          exclude: ["createdAt", "updatedAt"],
        })
        .then(data => {
          res.status(200).send({
            productImage: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateProductImage = async (req, res, next) => {
  const productImageId = req.params.productImageId;

  try {
    const productImage = await ProductImages.findOne({
      id: productImageId
    });
    if (!productImage) {
      throw new ErrorHandler(404, 'productImage not found!')
    } else {
      ProductImages
        .update({
          productId: req.body.productId,
          imageId: req.body.imageId,
        }, {
          where: {
            id: productImageId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'productImage has been updated!',
            productImage: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteProductImage = async (req, res, next) => {
  const productImageId = req.params.productImageId;

  try {
    const productImage = await ProductImages.findOne({
      where: {
        id: productImageId
      }
    });
    if (!productImage) {
      throw new ErrorHandler(404, 'productImage not found!');
    } else {
      ProductImages
        .destroy({
          where: {
            id: productImageId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'productImage has been deleted!',
            productImage: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

