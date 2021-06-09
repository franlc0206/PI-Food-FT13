const router = require("express").Router();
const { Diet } = require('../db.js');
const { Sequelize, Op }= require('sequelize');

//RUTAS DE DIETS
router.get('/', async (req, res) => {
    const types = await Diet.findAll()
    res.status(200).send(types);
})

module.exports = router;