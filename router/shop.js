module.exports = function(app) {
  const controller = require('../controllers/shop');
  const auth = require('../middleware/middleware');

  app.post('/api/arkapedia/admin/shop', auth.authorized, controller.addShop);
  app.get('/api/arkapedia/shop', auth.authorized, controller.getAllShops);
  app.get('/api/arkapedia/shop/:shopId', auth.authorized, controller.getShopById);
  app.put('/api/arkapedia/admin/shop/:shopId', auth.authorized, controller.updateShop);
  app.delete('/api/arkapedia/admin/shop/:shopId', auth.authorized, controller.deleteShop);
};