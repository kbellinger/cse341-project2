const routes = require('express').Router();
const controller = require('../controllers');
const bookController = require('../controllers/bookController');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.get('/users', controller.getAllUsers);
routes.get('users/:userId', controller.getUser);
routes.post('/users/new', controller.newUser);
routes.put('/users/:id', controller.updateUser);
routes.delete('/users/:id', controller.deleteUser);

routes.get('/books', bookController.getAllBooks);
routes.get('/books/:bookId', bookController.getBook);
routes.post('/books/new', bookController.newBook);
routes.put('/books/:bookId', bookController.updateBook);
routes.delete('/books/:bookId', bookController.deleteBook);



module.exports = routes;