const {ObjectId} = require('mongodb');

const {Database} = require('../database/index');

const {productsUtils} = require('./utils');

const COLLECTION = 'products';


const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
};

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: new ObjectId(id) });
};

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId
};

const generateReport = async (name, res) => {
    let products = await getAll();
    productsUtils.excelGenerator(products, name, res);
};

const update = async (id, updatedProduct) => {
    const collection = await Database(COLLECTION);
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedProduct });
    return result.modifiedCount;
};

const deleteById = async (id) => {
    const collection = await Database(COLLECTION);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
};

module.exports.ProductsService = {
    getAll,
    getById,
    create,
    generateReport,
    update,
    deleteById
};