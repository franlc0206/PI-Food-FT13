const { Sequelize, Op }= require('sequelize');
const router = require("express").Router();
const { Recipe, Diet } = require('../db.js');
var axios = require("axios");
const { name } = require('../app.js');
const {
    apiKey
} = process.env;


//RUTAS DE RECIPES
const data = async () => {
    const r = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${apiKey}&number=100`); 
    // console.log(r.data.results[0]);
        //Busco la data y la devuelvo con las props que me interesan {}
        const aux= await r.data.results.map((elem) => {           
            return {
                title: elem.title,
                diets: elem.diets.map((item)=>{return {name:item}}),
                image: elem.image,
                id: (elem.id)*(-1),//TRAIGO LOS IDS NEGATIVOS PARA DIFERENCIARLOS DEL POST
                spoonacularScore: parseInt(elem.spoonacularScore),
            };
        });

        return aux;

};

// recipes?name
router.get('/', async function(req, res) {

    if(req.query){

        try {
            //BUSCA EN DB
            const results={};
            let query = req.query.name.toLowerCase();
            const name = query[0].toUpperCase() + query.slice(1);//primera letra en mayuscula para buscar con todas las dietas

            const names = await Recipe.findAll({
                attributes: ['title', 'image', 'id', 'spoonacularScore'],//Los datos del post que necesito para la busqueda
                where:{
                    title:{
                        [Sequelize.Op.like]: `%${name}%`//que incluya el query
                    },
                },
                include: {
                    model: Diet,
                    attributes: ['name'],
                    through: {//que me traiga solo los nombres de las recetas sin la tabla intermedia
                        attributes: [],
                    },
                },
            });
            //CREA LA PROP RESULTS SI ENCONTRO ALGO
            if(names[0]){results['results']=names};        
            
            //PARA FILTRAR LA DATA DEL AXIOS
            const datas = await data();
            // console.log(datas)

            const newDatas= await datas.filter((dato) => dato.title.includes(name));
            console.log(newDatas);
            //SI SE ENCONTRO POR QUERY
            if(newDatas.length){
                //ENCONTRO AXIOS PERO NO DE DB
                if(!results.results){
                    results['results']=newDatas;
                    res.send(results);
                }else{//AXIOS Y DB
                    results.results=results.results.concat(newDatas);
                    res.send(results);
                };

            }else{
                //NO HAY DE AXIOS NI DE DB
                if(!results.results){
                    res.status(404).json({results:{error:'No se encontraron recetas para esa búsqueda.'}})//objeto error para que lea el front
                }else{//NO HAY DE AXIOS PERO SI DE DB
                    res.json(results);
                };
            };         
        } catch (error){
            console.error(error);
            res.status(500).json({results:{error:'Error de servidor.'}});
        };

    }else{res.status(404)};
});

//GET /recipes/{idReceta}

router.get('/:idReceta', async function(req, res){
    const pk = req.params.idReceta;
    let detail;
    //CASO DE BUSCAR EN LA DB SI ES POSITIVO
    if(pk>0){

        detail = await Recipe.findOne({
            where:{
                id: pk,
                // id:{
                //     [Sequelize.Op.like]: `${pk}`
                // },
            },
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            },
        });
    }else{
        //CASO VIENE DE API
        const pkpi = pk*(-1);
        const r = await axios.get(`https://api.spoonacular.com/recipes/${pkpi}/information?apiKey=${apiKey}`); 
        const elem = r.data;
            
        detail= {
            title: elem.title,
            summary: elem.summary,
            spoonacularScore: elem.spoonacularScore,
            healthScore: elem.healthScore,
            instructions:elem.instructions,
            APId: elem.id,
            diets: elem.diets,
            image: elem.image,
            dishTypes: elem.dishTypes,
        };
    };
    if(detail){
        res.send(detail);
    }else{
        res.status(404).send()
    };

});

module.exports = router;