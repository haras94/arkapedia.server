module.exports = function(app) {
  const controller = require('../controllers/image');
  const auth = require('../middleware/middleware');
  const upload = require('../helper/upload');
  // var cpUpload = upload.uploadImage.fields([
  //   { name: 'image1', maxCount: 1 },
  //   { name: 'image2', maxCount: 1 },
  //   { name: 'image3', maxCount: 1 },
  //   { name: 'image4', maxCount: 1 },
  //   { name: 'image5', maxCount: 1 },
  // ]);

  app.post('/api/arkapedia/admin/image', upload.uploadImage.single('image1'), auth.authorized, controller.addImage);
  app.get('/api/arkapedia/image', controller.getAllImages);
  app.get('/api/arkapedia/image/:imageId', controller.getImageById);
  app.put('/api/arkapedia/admin/image/:imageId', auth.authorized, upload.uploadImage.single('image1'), controller.updateImage);
  app.delete('/api/arkapedia/admin/image/:imageId', auth.authorized, controller.deleteImage);
};