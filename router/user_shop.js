module.exports = function(app) {
  const controller = require('../controllers/user_shop');
  const auth = require('../middleware/middleware');

  app.post('/api/arkapedia/admin/userShop', auth.authorized, controller.addUserShop);
  app.get('/api/arkapedia/userShop', controller.getAllUserShops);
  app.get('/api/arkapedia/userShop/:userShopId', controller.getUserShopById);
  app.put('/api/arkapedia/admin/userShop/:userShopId', auth.authorized, controller.updateUserShop);
  app.delete('/api/arkapedia/admin/userShop/:userShopId', auth.authorized, controller.deleteUserShop);
};
