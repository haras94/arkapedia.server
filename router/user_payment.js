module.exports = function(app) {
  const controller = require('../controllers/user_payment');
  const auth = require('../middleware/middleware');

  app.post('/api/arkapedia/admin/userPayment', auth.authorized, controller.addUserPayment);
  app.get('/api/arkapedia/userPayment', controller.getAllUserPayments);
  app.get('/api/arkapedia/userPayment/:userPaymentId', controller.getUserPaymentById);
  app.put('/api/arkapedia/admin/userPayment/:userPaymentId', auth.authorized, controller.updateUserPayment);
  app.delete('/api/arkapedia/admin/userPayment/:userPaymentId', auth.authorized, controller.deleteUserPayment);
};