const express = require('express');
const { ProductsController } = require('./controller');
const router = express.Router();

module.exports.ProductsAPI = (app) => {
    /**
     * @swagger
     * components:
     *  schemas:
     *      Product:
     *          type: object
     *          properties:
     *              name:
     *                  type: string
     *                  description: Nombre del producto
     *              price:
     *                  type: number
     *                  description: Precio del producto
     *              cantidad:
     *                  type: number
     *                  description: Cantidad de productos
     *          required:
     *              - name
     *              - price
     *              - cantidad
     *          example:
     *              name: Sillas
     *              price: 245
     *              cantidad: 10
     */

    /**
     * @swagger
     * tags:
     *   name: Products
     *   description: Endpoints para operaciones de productos
     */

    /**
     * @swagger
     * /api/products:
     *   get:
     *     summary: Obtener todos los productos.
     *     tags: [Products]
     *     responses:
     *       200:
     *         description: Lista de productos obtenida con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Product'
     *       500:
     *         description: Error interno del servidor.
     */
    router.get('/', ProductsController.getProducts);

    /**
     * @swagger
     * /api/products/report:
     *   get:
     *     summary: Generar un informe de productos.
     *     tags: [Products]
     *     responses:
     *       200:
     *         description: Informe de productos generado con éxito.
     *       500:
     *         description: Error interno del servidor.
     */
    router.get('/report', ProductsController.generateReport);

    /**
     * @swagger
     * /api/products/{id}:
     *   get:
     *     summary: Obtener un producto por su ID.
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID del producto a obtener.
     *     responses:
     *       200:
     *         description: Producto obtenido con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       404:
     *         description: Producto no encontrado.
     *       500:
     *         description: Error interno del servidor.
     */
    router.get('/:id', ProductsController.getProduct);

    /**
     * @swagger
     * /api/products:
     *   post:
     *     summary: Crear un nuevo producto.
     *     tags: [Products]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Product'
     *     responses:
     *       201:
     *         description: Producto creado con éxito.
     *       500:
     *         description: Error interno del servidor.
     */
    router.post('/', ProductsController.CreateProduct);

    /**
     * @swagger
     * /api/products/{id}:
     *   put:
     *     summary: Actualizar un producto existente.
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID del producto a actualizar.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Product'
     *     responses:
     *       200:
     *         description: Producto actualizado con éxito.
     *       404:
     *         description: Producto no encontrado.
     *       500:
     *         description: Error interno del servidor.
     */
    router.put('/:id', ProductsController.updateProduct);

    /**
     * @swagger
     * /api/products/{id}:
     *   delete:
     *     summary: Eliminar un producto existente.
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID del producto a eliminar.
     *     responses:
     *       200:
     *         description: Producto eliminado con éxito.
     *       404:
     *         description: Producto no encontrado.
     *       500:
     *         description: Error interno del servidor.
     */
    router.delete('/:id', ProductsController.deleteProduct);

    app.use('/api/products', router);
};
