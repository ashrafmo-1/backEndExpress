const Product = require("../models/prodcts.modele");
const httpStatus = require("../utils/http.status");
const asyncWrapper = require("../middlewares/asyncWrapper");
const ERROR = require("../utils/ERROR");
const User = require("../models/users.modele");

const showAllProducts = asyncWrapper(async (req, res) => {
    const products = await Product.find({}, {__v: false})
    res.json({statusCode: 200, message: 'success', products: products});
});

const showSingleUser = asyncWrapper(async (req, res, next) => {
    const product = await Product.findById(req.params.id).exec();
    if (!product) {
        const error = ERROR.create("User not found", 404, "not found any user");
        return next(error);
    }
    res.json({ code: 200, data: { product: product } });
})

const addNewProduct = asyncWrapper(async (req, res, next) => {
    const {title, description, quantity, count, in_stock, category, slug} = req.body;

    const existProduct = await Product.findOne({title: title});
    const error = ERROR.create("product already exists", 422, "product title already exists");
    if (existProduct) {
        return next(error);
    }

    if (!title || !description || !quantity || !count || !in_stock || !category || !slug) {
        return res.status(400).json({statusCode: 400, message: 'All fields are required'});
    }

    const newProduct = new Product({title, description, quantity, count, in_stock, category, slug});
    await newProduct.save();
    res.status(201).json({statusCode: 201, message: 'Product successfully created', data: {newProduct}});
});

const removeProduct = asyncWrapper(async (req, res) => {
    const result = await Product.deleteOne({_id: req.params.id});
    if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Product not found", data: null });
    }
    res.status(200).json({message: "Product successfully deleted", data: null});
});

const updateProduct = asyncWrapper(async (req, res) => {
    const productID = req.params.id;
    const pathProducts = await Product.findByIdAndUpdate(productID, { $set: { ...req.body } }, { new: true });
    res.status(200).json(pathProducts);
})

module.exports = {addNewProduct, showSingleUser, showAllProducts, removeProduct, updateProduct};