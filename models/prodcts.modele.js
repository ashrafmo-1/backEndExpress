const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    count: { type: Number, required: true },
    in_stock: { type: Boolean, required: true },
    category: { type: String, required: true },
    slug: { type: String, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);