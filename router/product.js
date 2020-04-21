module.exports = function(app) {
  const controller = require('../controllers/product');
  const auth = require('../middleware/middleware');

  app.post('/api/arkapedia/admin/product', auth.authorized, controller.addProduct);
  app.get('/api/arkapedia/product', controller.getAllProducts);
  app.get('/api/arkapedia/product/:productId', controller.getProductById);
  app.put('/api/arkapedia/admin/product/:productId', auth.authorized, controller.updateProduct);
  app.delete('/api/arkapedia/admin/product/:productId', auth.authorized, controller.deleteProduct);
};