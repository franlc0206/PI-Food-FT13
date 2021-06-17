import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import Paginado from './Paginado.js'
import './buscador.css';
import './buttons.css';

import { getRecipeDetail, getRecipes, sortRecipe, getDiets, filterBy, SortBy } from '../actions/index.js';

export function Buscador(props) {

  const [title, setTitle]= useState('');
  const [loading, setLoading]= useState('');
  const [render, setRender]= useState('');
  const [currentPage, setCurrentPage]= useState(1);
  const [postsPerPage, setPostsPerPage]= useState(8);

  const indexOfLastPost = currentPage * postsPerPage;//indice de la ultima page---10
  const indexOfFirstPost = indexOfLastPost - postsPerPage;//index de la primera pagina---0
  let currentPost;

  props.recipes.error
  ?currentPost=null
  // :props.filtered[0]
  // ?currentPost=props.filtered.slice(indexOfFirstPost, indexOfLastPost)
  :currentPost=props.recipes.slice(indexOfFirstPost, indexOfLastPost);


  const handleSelect = (e) =>{
    e.preventDefault();
    props.sortRecipe(e.target.value);
    setCurrentPage(1);
    setRender(`Ordenado de forma ${e.target.value}`);
  };

  const handleMax = (e) => {
    e.preventDefault();
    props.SortBy(e.target.value);
    setCurrentPage(1);
    setRender(`Ordenado de forma ${e.target.value}`);
  };
  
  //cambiar de pagina
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  //busqueda del form
  const handleChange = (event) => {
    setTitle(event.target.value );
  };
  
  const handleSubmit = (event) => {//manda el estado para getrecipes
    event.preventDefault();
    setLoading('Loading...')
    props.getRecipes(title);
    props.getDiets();
    props.filterBy('reset');
    setTitle(' ');
    setLoading('');
  };

  //filtrado
  const handleClick = (string, event) =>{
    event.preventDefault();
    setCurrentPage(1);
    props.filterBy(string);
  };

  const handleAll = (event) => {
    event.preventDefault();
    setLoading('Loading...')
    props.filterBy('reset');
    props.getRecipes('%20');
    props.getDiets();
    setLoading('');
  };


  return (
    <div className='ppal'>
      <nav className='top'>

      <NavLink to={`/post`} className='linkPost'> Create Recipe </NavLink>
      <div className='search-box'>
      <form className="search" action="" onSubmit={(e) => handleSubmit(e)}>

        <label className="label" htmlFor="title"> RECIPE: </label>
        <input
          placeholder="Search here..."
          required
          type="text"
          id="title"
          autoComplete="off"
          value={title}//el state es el value del input, el titulo de la recipe
          onChange={(e) => handleChange(e)}
        />

        <button type="submit" className='searchButton'>SEARCH</button>
        <button onClick={(e)=> handleAll(e)}className='searchButton'>ALL RECIPES</button>
      </form>
      </div>  

      <div className='selects'>

      <select id="alfabetico" onChange={(e) =>handleSelect(e)}>
        <option value="ascendente">A-Z</option>
        <option value="descendente">Z-A</option>
      </select>

      <select id="min" onChange={(e) =>handleMax(e)}>
        <option value="min to max">Lower scores first</option>
        <option value="max to min">Higher scores first</option>
      </select>

      </div>
      </nav>
      {/* -------------------- */}
      <div className='filteredBy'>Filtered by: {props.filtered}</div>
      {props.recipes.error
        ?(<div className='errors'>{props.recipes.error}</div>)                          
      :(
      <ul className='ul'> 
        {/* Aqui tienes que escribir tu codigo para mostrar la lista de peliculas */
        currentPost && currentPost.map((recipe)=> (
        <li className='li' key={recipe.id}>

          <div>
            <NavLink to={`/recipe/${recipe.id}`} className='litext' onClick={()=>props.getRecipeDetail(recipe.id)}>
            {recipe.title}
            </NavLink>
            <div className='recetascontent'>

              <div className='scorelitem'> Score: {recipe.spoonacularScore}</div>
              <div className='newscoreli'>

              <div className='scoreli' id='scoreli'>Diets:</div>
              {(typeof recipe.diets[0] === 'string') &&  recipe.diets.map((diet) => <div className='recetascontent'>{diet}</div>)}
              {(typeof recipe.diets[0] === 'object') &&  recipe.diets.map((diet) => <div className='recetascontent'>{diet.name}</div>)}
              </div>
            </div>

          </div>
          {
            !recipe.image?<img className='recipic' src='data:image/jpeg;base64,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' ></img>
            :<img className='recipic' src={recipe.image} ></img>
          }
          
          
        </li>))
        }
      </ul>
      )}

      {loading[0]?<div>{loading}</div>:null}

      <div className='dietButtons'>

        {props.diets && props.diets.map((diet) =>(
          <button className='dietButton' onClick={(event)=>handleClick(diet.name, event)}>{diet.name}</button>
        ))
        }
      
      </div>
      <Paginado
      postsPerPage={postsPerPage}
      totalPosts={props.recipes.length} 
      // filteredPosts={props.filtered.length}
      paginate={paginate}
      />

    </div>  
  )
};

    
    
function mapStateToProps(state) {
  return {
    recipes: state.recipesLoaded,
    recipeDetail: state.recipeDetail,
    diets: state.diets,
    filtered: state.filtered,
  };
};

function mapDispatchToProps(dispatch) {//me pasa como prop el dispatch de actions
  return {
    getRecipes: title => dispatch(getRecipes(title)),
    getRecipeDetail: id=> dispatch(getRecipeDetail(id)),
    sortRecipe: string => dispatch(sortRecipe(string)),
    getDiets: () => dispatch(getDiets()),
    filterBy: string => dispatch(filterBy(string)),
    SortBy: string => dispatch(SortBy(string)),
    // filtrado: string => dispatch(filtrado(string)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buscador);
