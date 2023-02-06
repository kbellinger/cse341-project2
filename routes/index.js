const routes = require('express').Router();
const controller = require('../controllers');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.get('/users', controller.getAllUsers);
routes.post('/users/new', controller.newUser);
routes.put('/users/:id', controller.updateUser);
routes. delete('/users/:id', controller.deleteUser);

module.exports = routes;