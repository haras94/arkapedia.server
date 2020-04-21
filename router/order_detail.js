module.exports = function(app) {
  const controller = require('../controllers/order_detail');
  const auth = require('../middleware/middleware');

  app.post('/api/arkapedia/admin/orderDetail', auth.authorized, controller.addOrderDetail);
  app.get('/api/arkapedia/orderDetail', controller.getAllOrderDetails);
  app.get('/api/arkapedia/orderDetail/:orderDetailId', controller.getOrderDetailById);
  app.put('/api/arkapedia/admin/orderDetail/:orderDetailId', auth.authorized, controller.updateOrderDetail);
  app.delete('/api/arkapedia/admin/orderDetail/:orderDetailId', auth.authorized, controller.deleteOrderDetail);
};