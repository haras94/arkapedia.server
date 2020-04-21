module.exports = function(app) {
  const controller = require('../controllers/payment');
  const auth = require('../middleware/middleware');

  app.post('/api/arkapedia/admin/payment', auth.authorized, controller.addPayment);
  app.get('/api/arkapedia/payment', controller.getAllPayments);
  app.get('/api/arkapedia/payment/:paymentId', auth.authorized, controller.getPaymentById);
  app.put('/api/arkapedia/admin/payment/:paymentId', auth.authorized, controller.updatePayment);
  app.delete('/api/arkapedia/admin/payment/:paymentId', auth.authorized, controller.deletePayment);
};