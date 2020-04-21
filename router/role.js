module.exports = function(app) {
  const controller = require('../controllers/role');
  const auth = require('../middleware/middleware');

  app.post('/api/arkapedia/admin/role', auth.authorized, controller.addRole);
  app.get('/api/arkapedia/role',auth.authorized, controller.getAllRoles);
  app.get('/api/arkapedia/role/:roleId', auth.authorized, controller.getRoleById);
  app.put('/api/arkapedia/admin/role/:roleId', auth.authorized, controller.updateRole);
  app.delete('/api/arkapedia/admin/role/:roleId', auth.authorized, controller.deleteRole);
};