module.exports = function(app) {
  const controller = require('../controllers/user');
  const upload = require('../helper/upload');
  const auth = require('../middleware/middleware');
  const user = require('../middleware/userVerify');

  app.post('/api/arkapedia/auth/signup', user.checkDuplicateEmail, controller.signUp);
  app.post('/api/arkapedia/auth/signin', controller.signIn);
  app.get('/api/arkapedia/admin/user', controller.getAllUsers);
  app.get('/api/arkapedia/user', controller.getAllUsers, controller.checkUsers);
  app.get('/api/arkapedia/user/:userId', controller.getUserById);
  app.patch('/api/arkapedia/user/activation', controller.userActivation);
  app.put('/api/arkapedia/user/:userId', auth.authorized, upload.uploadImage.single('image'), controller.updateUser);
  app.patch('/api/arkapedia/user/:userId', auth.authorized, upload.uploadImage.single('image'), controller.updateUser);
  app.delete('/api/arkapedia/admin/user/:userId', auth.authorized, controller.deleteUser);
};
