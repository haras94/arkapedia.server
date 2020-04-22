require('dotenv').config();
const ProductCategories = require('../models').product_category;
const Products = require('../models').product;
const SubCategories = require('../models').sub_category;
const { ErrorHandler } = require('../helper/error');

exports.addProductCategory = (req, res, next) => {
  ProductCategories
    .create({
      productId: req.body.productId,
      subCategoryId: req.body.subCategoryId
    })
    .then(data => {
      res.status(201).send({
        productCategory: data,
        message: 'productCategory has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllProductCategories = (req, res, next) => {
  ProductCategories.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
    include: [
      { model: Products, as: "productCategory", attributes: ["name"] },
      { model: SubCategories, as: "subCategory", attributes: ["name"] }
    ]
  })
    .then(data => {
      res.status(200).send({
        productCategories: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getProductCategoryById = async (req, res, next) => {
  const productCategoryId = req.params.productCategoryId;

  try {
    const productCategory = await ProductCategories.findOne({
      where: {
        id: productCategoryId
      }
    });
    if (!productCategory) {
      throw new ErrorHandler(404, 'productCategory not found!');
    }
    else {
      ProductCategories
        .findOne({
          where: {
            id: productCategoryId
          },
          exclude: ["createdAt", "updatedAt"],
          include: [
            { model: Products, as: "productCategory", attributes: ["name"] },
            { model: SubCategories, as: "subCategory", attributes: ["name"] }
          ]
        })
        .then(data => {
          res.status(200).send({
            productCategory: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateProductCategory = async (req, res, next) => {
  const productCategoryId = req.params.productCategoryId;

  try {
    const productCategory = await ProductCategories.findOne({
      id: productCategoryId
    });
    if (!productCategory) {
      throw new ErrorHandler(404, 'productCategory not found!')
    } else {
      ProductCategories
        .update({
          productId: req.body.productId,
          subCategoryId: req.body.subCategoryId
        }, {
          where: {
            id: productCategoryId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'productCategory has been updated!',
            productCategory: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteProductCategory = async (req, res, next) => {
  const productCategoryId = req.params.productCategoryId;

  try {
    const productCategory = await ProductCategories.findOne({
      where: {
        id: productCategoryId
      }
    });
    if (!productCategory) {
      throw new ErrorHandler(404, 'productCategory not found!');
    } else {
      ProductCategories
        .destroy({
          where: {
            id: productCategoryId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'productCategory has been deleted!',
            productCategory: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

