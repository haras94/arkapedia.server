require('dotenv').config();
const Images = require('../models').image;
const { ErrorHandler } = require('../helper/error');

exports.addImage = (req, res, next) => {
  Images
    .create({
      image1: `http://localhost:5000/uploads/${req.files['image1']}`,
      image2: `http://localhost:5000/uploads/${req.files['image2']}`,
      image3: `http://localhost:5000/uploads/${req.files['image3']}`,
      image4: `http://localhost:5000/uploads/${req.files['image4']}`,
      image5: `http://localhost:5000/uploads/${req.files['image5']}`,
    })
    .then(data => {
      res.status(201).send({
        images: data,
        message: 'images has been created!'
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getAllImages = (req, res, next) => {
  Images.findAndCountAll({
    exclude: ["createdAt", "updatedAt"],
  })
    .then(data => {
      res.status(200).send({
        images: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, 'Internal server error');
    });
};

exports.getImageById = async (req, res, next) => {
  const imageId = req.params.imageId;

  try {
    const image = await Images.findOne({
      where: {
        id: imageId
      }
    });
    if (!image) {
      throw new ErrorHandler(404, 'image not found!');
    }
    else {
      Images
        .findOne({
          where: {
            id: imageId
          },
          exclude: ["createdAt", "updatedAt"],
        })
        .then(data => {
          res.status(200).send({
            image: data,
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.updateImage = async (req, res, next) => {
  const imageId = req.params.imageId;

  try {
    const image = await Images.findOne({
      id: imageId
    });
    if (!image) {
      throw new ErrorHandler(404, 'image not found!')
    } else {
      Images
        .update({
          image1: `http://localhost:5000/uploads/${req.files['image1']}`,
          image2: `http://localhost:5000/uploads/${req.files['image2']}`,
          image3: `http://localhost:5000/uploads/${req.files['image3']}`,
          image4: `http://localhost:5000/uploads/${req.files['image4']}`,
          image5: `http://localhost:5000/uploads/${req.files['image5']}`,
        }, {
          where: {
            id: imageId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'image has been updated!',
            image: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

exports.deleteImage = async (req, res, next) => {
  const imageId = req.params.imageId;

  try {
    const image = await Images.findOne({
      where: {
        id: imageId
      }
    });
    if (!image) {
      throw new ErrorHandler(404, 'image not found!');
    } else {
      Images
        .destroy({
          where: {
            id: imageId
          }
        })
        .then(data => {
          res.status(200).send({
            message: 'image has been deleted!',
            image: data
          });
        });
    }
  } catch(error) {
    next(error);
  }
};

