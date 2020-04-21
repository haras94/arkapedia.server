module.exports = function(app) {
  const controller = require('../controllers/sub_category');
  const auth = require('../middleware/middleware');

  app.post('/api/arkapedia/admin/subCategory', auth.authorized, controller.addSubCategory);
  app.get('/api/arkapedia/subCategory', controller.getAllSubCategories);
  app.get('/api/arkapedia/subCategory/:subCategoryId', controller.getSubCategoryById);
  app.put('/api/arkapedia/admin/subCategory/:subCategoryId', auth.authorized, controller.updateSubCategory);
  app.delete('/api/arkapedia/admin/subCategory/:subCategoryId', auth.authorized, controller.deleteSubCategory);
};