// const Sequelize = require('sequelize');
const DataTypes = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Recipe = sequelize.define('recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    spoonacularScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    
    // APId:{ ID QUE ESTABA PARA RELACIONAR BD
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // },

    image:{
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  //Para que al crearla siempre se pongan las primeras letras en mayuscula y poder ordenar alfb
  Recipe.addHook('beforeValidate', (recipe) => {
    let word = recipe.title.toLowerCase();
    let upper = word.split(' ');
    for(let i=0;i<upper.length;i++){
      upper[i] = upper[i][0].toUpperCase()+ upper[i].slice(1);
    };
    recipe.title = upper.join(' ');
  });
};

