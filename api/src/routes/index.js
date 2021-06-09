const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require('./recipes.js');
const dietsRouter = require('./diets.js');
const { Recipe, Diet } = require('../db.js');
// const recipeRouter = require('./recipe.js');
const { Sequelize }= require('sequelize');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/recipe', recipeRouter);
router.use('/recipes', recipesRouter);
router.use('/types', dietsRouter);

//RUTA PPL
router.get('/', async (req, res) => {
    res.status(200).send('Main route is working');
})


//POST
router.post('/recipe', async (req,res) => {
    // res.send('post viene')
    let { title, summary, spoonacularScore, healthScore, instructions, diets } = req.body;
    // console.log(req.body)
    //creo la receta con la data del form
    const receta = await Recipe.create({
        title,
        summary,
        spoonacularScore,
        instructions,
        healthScore,
    })
    
    //si no hay mas de una dieta seleccionada la convierto en array para que sea iterable como los demas
    if (!Array.isArray(diets)) {
        diets = [diets];
    };
    
    //encuentro la data que coincide con la requerida por req.body
    const dietsDB = await Diet.findAll({
        where: {
          name: {
            [Sequelize.Op.in]: diets,//operador que el nombre coincida con el array
          },
        },
    });
    
    //las seteo
    await receta.setDiets(dietsDB);
    res.status(200).json(receta);
})

module.exports = router;
