module.exports = function(app) {
  const controller = require('../controllers/user_role');
  const auth = require('../middleware/middleware');

  app.post('/api/arkapedia/admin/userRole', controller.addUserRole);
  app.get('/api/arkapedia/userRole', controller.getAllUserRoles);
  app.get('/api/arkapedia/userRole/:userRoleId', controller.getUserRoleById);
  app.put('/api/arkapedia/admin/userRole/:userRoleId', auth.authorized, controller.updateUserRole);
  app.delete('/api/arkapedia/admin/userRole/:userRoleId', auth.authorized, controller.deleteUserRole);
};