require('dotenv').config();
const SubCategories = require('../models').sub_category;
const Categories = require('../models').category;
const { ErrorHandler } = require('../helper/error');

exports.addSubCategory = (req, res, next) => {
  SubCategories
    .create({
      name: req.body.name,
      categoryId: req.body.categoryId,
    })
    .then(data => {
      res.status(201).send({
        subCategory: data,
        message: 'subCategory has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllSubCategories = (req, res, next) => {
  SubCategories.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
    include: [
      { model: Categories, as: "category", attributes: ["name"] },
    ]
  })
    .then(data => {
      res.status(200).send({
        subCategories: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getSubCategoryById = async (req, res, next) => {
  const subCategoryId = req.params.subCategoryId;

  try {
    const subCategory = await SubCategories.findOne({
      where: {
        id: subCategoryId
      }
    });
    if (!subCategory) {
      throw new ErrorHandler(404, 'subCategory not found!');
    }
    else {
      SubCategories
        .findOne({
          where: {
            id: subCategoryId
          },
          exclude: ["createdAt", "updatedAt"],
          include: [
            { model: Categories, as: "category", attributes: ["name"] },
          ]
        })
        .then(data => {
          res.status(200).send({
            subCategory: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateSubCategory = async (req, res, next) => {
  const subCategoryId = req.params.subCategoryId;

  try {
    const subCategory = await SubCategories.findOne({
      id: subCategoryId
    });
    if (!subCategory) {
      throw new ErrorHandler(404, 'subCategory not found!')
    } else {
      SubCategories
        .update({
          name: req.body.name,
          categoryId: req.body.categoryId,
        }, {
          where: {
            id: subCategoryId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'subCategory has been updated!',
            subCategory: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteSubCategory = async (req, res, next) => {
  const subCategoryId = req.params.subCategoryId;

  try {
    const subCategory = await SubCategories.findOne({
      where: {
        id: subCategoryId
      }
    });
    if (!subCategory) {
      throw new ErrorHandler(404, 'subCategory not found!');
    } else {
      SubCategories
        .destroy({
          where: {
            id: subCategoryId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'subCategory has been deleted!',
            subCategory: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

