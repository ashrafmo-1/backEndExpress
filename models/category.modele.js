const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    Electronics: {
        type: Array,
        required: true,
    },
    Fashion: {
        type: Array,
        required: true,
    },
    Home: {
        type: Array,
        required: true,
    },
    Beauty: {
        type: Array,
        required: true,
    },
    Sports: {
        type: Array,
        required: true,
    },
    Books: {
        type: Array,
        required: true,
    },
    PersonalCare: {
        type: Array,
        required: true,
    }
})

module.exports = mongoose.model("Category", categorySchema);