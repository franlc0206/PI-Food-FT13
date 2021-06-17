export const GET_RECIPES='GET_RECIPES';
export const GET_RECIPE_DETAIL='GET_RECIPE_DETAIL';
export const SORT_BY='SORT_BY';
export const GET_TYPES='GET_TYPES';
export const FILTER_BY='FILTER_BY';
export const SORT='SORT';
export const SUBMIT='SUBMIT';
export const FILTRADO='FILTRADO';


export function getRecipes(titulo) {
  return function(dispatch) {
    return fetch("http://localhost:3001/recipes?name=" + titulo)
    .then(response => response.json())
    .then(json => {
      dispatch({ type: GET_RECIPES, payload: json.results })        
    })
  };
};

export function getRecipeDetail(id) {
    return function(dispatch) {
      return fetch("http://localhost:3001/recipes/" +id)
        .then(response => response.json())
        .then(json => {
          dispatch({ type: GET_RECIPE_DETAIL, payload: json });//busca la data y despacha getmoviedetail con eso
        });
    };
}
export function getDiets() {
  return function(dispatch) {
    return fetch("http://localhost:3001/types/")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_TYPES, payload: json });//busca la data y despacha getdiets con eso
      });
  };
}

export function sortRecipe(payload) {//action que ordena
  return { 
      type: SORT_BY, 
      payload: payload,//ascendente o desc
  };
};

export function filterBy(payload) {//action que ordena
  return { 
      type: FILTER_BY, 
      payload: payload,//ascendente o desc
  };
};
export function SortBy(payload) {//action que ordena
  return { 
      type: SORT, 
      payload: payload,//min or max
  };
};
export function submit(payload) {
  return { 
      type: SUBMIT, 
      payload: payload,//objeto a postear
  };
};
// export function filtrado(payload) {
//   return { 
//       type: FILTRADO, 
//       payload: payload,
//   };
// };