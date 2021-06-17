const axios = require('axios');

function sortAsc(arr, field) {
   return arr.sort(function (a, b) {
       if (a[field] > b[field]) {
           return 1;
       }
       if (b[field]> a[field]) {
           return -1;
       }
       return 0;
   })
};

function sortDesc(arr, field) {
  return arr.sort(function (a, b) {
      if (a[field] > b[field]) {
          return -1;
      }
      if (b[field]> a[field]) {
          return 1;
      }
      return 0;
  })
};
function filterBy(arr, field) {
    let filteredArr=[]
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[i].diets.length;j++){
            if(arr[i].diets[j].name.includes(field)){filteredArr.push(arr[i])}
        }
    }
    return filteredArr;
};

const initialState = {
    recipesLoaded: [],//recetas cargadas
    recipeDetail: {},//detalle de receta
    diets:[],
    submit: ' ',
    filtered: ' ',
};


function reducer(state = initialState, action){
    if (action.type === 'GET_RECIPES') {
        return {
          ...state,
          recipesLoaded: action.payload,
        };
    };
    if (action.type === 'GET_RECIPE_DETAIL') {
        return {
          ...state,
          recipeDetail: action.payload,
        };
    };
    if (action.type === 'SORT_BY') {
      let sortedArr = action.payload === "ascendente" ?
      sortAsc(state.recipesLoaded, 'title'):
      sortDesc(state.recipesLoaded, 'title');
      
      return {
      ...state,
      recipesLoaded: sortedArr,
      };
    };
    if (action.type === 'GET_TYPES') {
      return {
      ...state,
      diets: action.payload,
      };
    };
    if (action.type === 'FILTER_BY') {
      return {
      ...state,
      filtered:action.payload==='reset'? ' ': state.filtered+' | '+action.payload,
      recipesLoaded:filterBy(state.recipesLoaded, action.payload),
      };
    };
    if (action.type === 'SORT') {
      return {
      ...state,
      recipesLoaded: state.recipesLoaded.sort(function(a, b) {
          if(action.payload==='min to max'){return a.spoonacularScore - b.spoonacularScore;}
          if(action.payload==='max to min'){return b.spoonacularScore - a.spoonacularScore;}
      }),
      // filtered:state.recipesLoaded.sort(function(a, b) {
      //   if(action.payload==='min to max'){return a.spoonacularScore - b.spoonacularScore;}
      //   if(action.payload==='max to min'){return b.spoonacularScore - a.spoonacularScore;}
      //   }),
      };
    };
    if (action.type === 'SUBMIT') {
        axios.post('http://localhost:3001/recipe', action.payload)
        return {
        ...state,
        submit: 'Su receta se ha creado correctamente.',
        };
    };
    
    return state
}

export default reducer;//lo exportamos al store para que sepa que reducer usar