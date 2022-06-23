const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'To pole jest wymagane.'
    },
    description: {
        type: String,
        required: 'To pole jest wymagane.'
    },
    ingridients: {
        type: Array,
        required: 'To pole jest wymagane.'
    },
    image: {
        type: String,
        required: 'To pole jest wymagane.'
    },
});

module.exports = mongoose.model('Recipes', recipeSchema);