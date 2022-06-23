const express = require('express');
const router = express.Router();
const recepieController = require('../controllers/recepieController');

/**
 * Routes
 */
router.get('/', recepieController.homepage);
router.get('/recipe/:id', recepieController.exploreRecipe);
router.get('/recipes', recepieController.exploreRecipes);
router.get('/submit-recepie', recepieController.submitRecipe);
router.post('/submit-recepie', recepieController.submitRecipeOnPost);

module.exports = router;