require('../models/database');
const { LEGAL_TCP_SOCKET_OPTIONS } = require('mongodb');
const Recipe = require('../models/Recipe');


/**
 * GET /
 * Strona glowna
 */

exports.homepage = async(req, res) =>{

    try {
        
        res.render('index', { title: 'Strona glowna' });
        
    } catch (error) {
        res.status(500).send({message: error.message || "Error"})
    }
}


/*
* GET /recipes
* Recipes
*/

exports.exploreRecipes = async(req, res) => {
    try {
        const limitNumber = 20;
        const recipes = await Recipe.find({}).limit(limitNumber)        
        res.render('recipes', {title: 'fancyPLATE - przepisy', recipes });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"})
    }
}


/*
* GET /recipe/:id
* Recipe
*/

exports.exploreRecipe = async(req, res) => {
    try {
        let recipeId = req.params.id;

        const recipe = await Recipe.findById(recipeId);
        
        res.render('recipe', {title: 'fancyPLATE - przepisy', recipe });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"})
    }
}

/*
* GET /submit-recipe
* Submit Recipe
*/

exports.submitRecipe = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-recepie', {title: 'Wyslij przepis', infoErrorsObj, infoSubmitObj});
}

/*
* POST /submit-recipe
* Submit Recipe
*/

exports.submitRecipeOnPost = async(req, res) => {
    try {

        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length === 0){
            console.log('Zdjecie nie zostalo przeslane');
        } else {
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;
            uploadPath = require('path').resolve('./') + '/public/upload/' + newImageName;

            imageUploadFile.mv(uploadPath, function(err){
                if(err) return res.status(500).send(err);
            })
        }

        const newRecipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            ingridients: req.body.ingridients,
            image: newImageName
        })

        await newRecipe.save();

    req.flash('infoSubmit', 'Przepis zostal dodany.')
    res.redirect('submit-recepie');
    } catch(error) {
        //res.json(error)
        req.flash('infoErrors', error);
        res.redirect('submit-recepie');
    }
}




/* async function insertDummyData(){
    try {
        await Recipe.insertMany([
            {
                "name": "Szakszuka",
                "description": "Super szakszuka, mozna normalnie sobie zrobic szakszuke bardzo latwo uzywajac prostych rzeczy",
                "ingridients": [
                    "1 puszka pomidorow",
                    "1 zabek czosnku",
                    "sol"
                ],
                "image": "szakszuka.jpeg"
            },
            {
                "name": "Szakszuka2",
                "description": "Super szakszuka, mozna normalnie sobie zrobic szakszuke bardzo latwo uzywajac prostych rzeczy",
                "ingridients": [
                    "1 puszka pomidorow",
                    "1 zabek czosnku",
                    "sol"
                ],
                "image": "szakszuka.jpeg"
            },
            {
                "name": "Szakszuka3",
                "description": "Super szakszuka, mozna normalnie sobie zrobic szakszuke bardzo latwo uzywajac prostych rzeczy",
                "ingridients": [
                    "1 puszka pomidorow",
                    "1 zabek czosnku",
                    "sol"
                ],
                "image": "szakszuka.jpeg"
            },

    ])
    } catch (error) {
        console.log('err', + error)
    }
}
insertDummyData() */