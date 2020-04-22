module.exports = function(app) {
  const controller = require('../controllers/category');
  const auth = require('../middleware/middleware');
  const redis = require('../helper/redis/category');

  app.post('/api/arkapedia/admin/category', auth.authorized, redis.clearGetAllCategories, controller.addCategory);
  app.get('/api/arkapedia/category', redis.chaceGetAllCategories, controller.getAllCategories);
  app.get('/api/arkapedia/category/:categoryId', controller.getCategoryById);
  app.put('/api/arkapedia/admin/category/:categoryId', auth.authorized, redis.clearGetAllCategories, controller.updateCategory);
  app.delete('/api/arkapedia/admin/category/:categoryId', auth.authorized, redis.clearGetAllCategories, controller.deleteCategory);
};