module.exports = function(app) {
  const controller = require('../controllers/product');
  const auth = require('../middleware/middleware');
  const redis = require('../helper/redis/product');

  app.post('/api/arkapedia/admin/product', auth.authorized, redis.clearGetAllProducts, controller.addProduct);
  app.get('/api/arkapedia/product', redis.chaceGetAllProducts, controller.getAllProducts);
  app.get('/api/arkapedia/product/shop/:shopId', redis.chaceGetAllProducts, controller.getAllProductsByShopId);
  app.get('/api/arkapedia/product/:productId', controller.getProductById);
  app.put('/api/arkapedia/admin/product/:productId', auth.authorized, redis.clearGetAllProducts, controller.updateProduct);
  app.patch('/api/arkapedia/admin/product/:productId', auth.authorized, redis.clearGetAllProducts, controller.updateProduct);
  app.delete('/api/arkapedia/admin/product/:productId', auth.authorized, redis.clearGetAllProducts, controller.deleteProduct);
};
