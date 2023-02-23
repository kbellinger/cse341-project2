const routes = require('express').Router();
const controller = require('../controllers');

routes.get('/users', controller.getAllUsers);
routes.get('/:userId', controller.getUser);
routes.post('/new', controller.newUser);
routes.put('/:id', controller.updateUser);
routes.delete('/:id', controller.deleteUser);