const createError = require('http-errors');
const debug = require('debug')('app:module-users-controller');

const { UsersService } = require('./services');
const { Response } = require('../common/response');
const { response } = require('express');

module.exports.UsersController = {


    getUsers: async (req, res) => {
        try {
            let users = await UsersService.getAll()
            Response.success(res, 200, 'Lista de Usuarios', users)
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },


    getUser: async (req, res) => {
        try {
            const { params: { id } } = req;
            let user = await UsersService.getById(id);
            if (!user) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `User ${id}`, user);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },


    CreateUser: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            } else {
                const insertedId = await UsersService.create(body);
                Response.success(res, 201, 'Usuario agregado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { params: { id }, body } = req;
            const updatedUser = await UsersService.update(id, body);
            Response.success(res, 200, `Producto ${id} actualizado`, updatedUser);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await UsersService.deleteById(id);
            if (result.deletedCount === 0) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Usuario ${id} eliminado`);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }

};

