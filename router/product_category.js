module.exports = function(app) {
  const controller = require('../controllers/product_category');
  const auth = require('../middleware/middleware');

  app.post('/api/arkapedia/admin/productCategory', auth.authorized, controller.addProductCategory);
  app.get('/api/arkapedia/productCategory', controller.getAllProductCategories);
  app.get('/api/arkapedia/productCategory/:productCategoryId', controller.getProductCategoryById);
  app.put('/api/arkapedia/admin/productCategory/:productCategoryId', auth.authorized, controller.updateProductCategory);
  app.delete('/api/arkapedia/admin/productCategory/:productCategoryId', auth.authorized, controller.deleteProductCategory);
};