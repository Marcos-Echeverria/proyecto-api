const express = require('express');

const {UsersController} = require('./controller');

const router = express.Router();

module.exports.UsersAPI = (app) => {
    router
    .get('/',UsersController.getUsers) //http://localhost:300/api/products/
    .get('/:id', UsersController.getUser) //http://localhost:300/api/products/23
    .post('/', UsersController.CreateUser)
    .put('/:id', UsersController.updateUser)
    .delete('/:id', UsersController.deleteUser);

    app.use('/api/users', router);
}