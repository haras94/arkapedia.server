module.exports = function(app) {
  const controller = require('../controllers/order_detail');
  const auth = require('../middleware/middleware');
  const redis = require('../helper/redis/orderDetail');

  app.post('/api/arkapedia/admin/orderDetail', auth.authorized, redis.clearGetAllOrderDetails, controller.addOrderDetail);
  app.get('/api/arkapedia/orderDetail', redis.chaceGetAllOrderDetails, controller.getAllOrderDetails);
  app.get('/api/arkapedia/orderDetail/:orderDetailId', controller.getOrderDetailById);
  app.put('/api/arkapedia/admin/orderDetail/:orderDetailId', auth.authorized, redis.clearGetAllOrderDetails, controller.updateOrderDetail);
  app.delete('/api/arkapedia/admin/orderDetail/:orderDetailId', auth.authorized, redis.clearGetAllOrderDetails, controller.deleteOrderDetail);
};