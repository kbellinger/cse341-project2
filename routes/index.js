const routes = require('express').Router();
const controller = require('../controllers');
const bookController = require('../controllers/bookController');
const { requiresAuth } = require('express-openid-connect');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.get('/users', controller.getAllUsers);
routes.get('users/:userId', requiresAuth(), controller.getUser);
routes.post('/users/new', requiresAuth(), controller.newUser);
routes.put('/users/:id',  requiresAuth(), controller.updateUser);
routes.delete('/users/:id', requiresAuth(), controller.deleteUser);

routes.get('/books', bookController.getAllBooks);
routes.get('/books/:bookId', requiresAuth(), bookController.getBook);
routes.post('/books/new', requiresAuth(), bookController.newBook);
routes.put('/books/:bookId', requiresAuth(), bookController.updateBook);
routes.delete('/books/:bookId', requiresAuth(), bookController.deleteBook);

routes.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });
  
// routes.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

module.exports = routes;