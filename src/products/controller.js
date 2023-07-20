const createError = require('http-errors');
const debug = require('debug')('app:module-products-controller');

const { ProductsService } = require('./services');
const { Response } = require('../common/response');
const { response } = require('express');

module.exports.ProductsController = {


    getProducts: async (req, res) => {
        try {
            let product = await ProductsService.getAll()
            Response.success(res, 200, 'Lista de productos', product)
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },


    getProduct: async (req, res) => {
        try {
            const { params: { id } } = req;
            let product = await ProductsService.getById(id);
            if (!product) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Producto ${id}`, product);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    /**
     * @swagger
     * components:
     *  schemas:
     *      Product:
     *          type: object
     *          properties:
     *              name:
     *                  type: string
     *                  description: the user name
     *              price:
     *                  type: number
     *                  description: price of products
     *              cantidad:
     *                  type: number
     *                  description: amount of products
     *          required:
     *              - name
     *              - price
     *              - cantidad
     *          example:
     *              name: Sillas
     *              price: 245
     *              cantidad: 10
     */
    CreateProduct: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            } else {
                const insertedId = await ProductsService.create(body);
                Response.success(res, 201, 'Producto agregado', insertedId);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    generateReport: (req, res) => {
        try {
            ProductsService.generateReport('inventario', res);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { params: { id }, body } = req;
            const updatedProduct = await ProductsService.update(id, body);
            Response.success(res, 200, `Producto ${id} actualizado`, updatedProduct);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await ProductsService.deleteById(id);
            if (result.deletedCount === 0) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Producto ${id} eliminado`);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }

};
