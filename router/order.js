module.exports = function(app) {
  const controller = require('../controllers/order');
  const auth = require('../middleware/middleware');

  app.post('/api/arkapedia/admin/order', auth.authorized, controller.addOrder);
  app.get('/api/arkapedia/order', auth.authorized, controller.getAllOrders);
  app.get('/api/arkapedia/order/:orderId', auth.authorized, controller.getOrderById);
  app.put('/api/arkapedia/admin/order/:orderId', auth.authorized, controller.updateOrder);
  app.delete('/api/arkapedia/admin/order/:orderId', auth.authorized, controller.deleteOrder);
};