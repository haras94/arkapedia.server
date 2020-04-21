module.exports = function(app) {
  const controller = require('../controllers/category');
  const auth = require('../middleware/middleware');

  app.post('/api/arkapedia/admin/category', auth.authorized, controller.addCategory);
  app.get('/api/arkapedia/category', controller.getAllCategories);
  app.get('/api/arkapedia/category/:categoryId', controller.getCategoryById);
  app.put('/api/arkapedia/admin/category/:categoryId', auth.authorized, controller.updateCategory);
  app.delete('/api/arkapedia/admin/category/:categoryId', auth.authorized, controller.deleteCategory);
};