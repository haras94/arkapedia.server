module.exports = function(app) {
  const controller = require('../controllers/product_image');
  const auth = require('../middleware/middleware');

  app.post('/api/arkapedia/admin/productImage', auth.authorized, controller.addProductImage);
  app.get('/api/arkapedia/productImage', controller.getAllProductImages);
  app.get('/api/arkapedia/productImage/:productImageId', controller.getProductImageById);
  app.put('/api/arkapedia/admin/productImage/:productImageId', auth.authorized, controller.updateProductImage);
  app.delete('/api/arkapedia/admin/productImage/:productImageId', auth.authorized, controller.deleteProductImage);
};