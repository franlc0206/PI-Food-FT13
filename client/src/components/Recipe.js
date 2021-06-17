import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";


import './recipe.css'

export function Recipe(props) {
    useEffect(() => {
        if (props.recipeDetail.instructions) {
          let instructions = props.recipeDetail.instructions;
          document.getElementById('instructions').innerHTML = instructions;
        };
        if (props.recipeDetail.summary) {
          let summary = props.recipeDetail.summary;
          document.getElementById('summary').innerHTML = summary;
        }
        return () => {};
    }, [props.recipeDetail]);

    return (
        <div className='background'>  
        <div className="recipe-detail">
            <NavLink to='/home'  className='botonx'><button className='x'>X</button></NavLink>
            <div className='recipedetail'>Recipe Detail:</div> 
            <div className='titulorecipe'>
                <div className='detallereceta'>{props.recipeDetail.title}</div> 
            </div>

            <div className='scores'>

                <h5 className='spoonacularScore'>Score: {props.recipeDetail.spoonacularScore}</h5>
                <h5 className='healthScore'>Health Level:{props.recipeDetail.healthScore}</h5>

            </div>
            <div className='recipedetail'>Summary:</div>
            <p id='summary'>{props.recipeDetail.summary}</p>
            <div className='instrucciones'>

                <div className='recipedetail'>Instructions:</div>
                <p className='texts' id='instructions'>{props.recipeDetail.instructions}</p>
                

            </div>
            <div className='bottom'>
                    {
                        !props.recipeDetail.image?<img className='recipic' src='https://www.wellandgood.com/wp-content/uploads/2019/12/Stocksy-cooking-for-one-Andrey-Pavlov.jpeg' ></img>
                        : <img src={props.recipeDetail.image} align="right" className='imagendetalle'></img>
                    }
                    {/* <img src={props.recipeDetail.image} align="right" className='imagendetalle'></img> */}
                
                
                <div className='dietsdetail'>

                    Diets:
                    {props.recipeDetail.diets && props.recipeDetail.diets.map((diet) =>(
                        diet.name?<div>{diet.name}</div>
                        :<div>{diet}</div>))
                    }

                </div>
            </div>


        </div> 
        </div>
    )
};

function mapStateToProps(state) {
    return {
    //   favMovies: state.movies,//el buscador solo se suscribe a moviesLoaded del store
    recipeDetail: state.recipeDetail,
    };
};


export default connect(mapStateToProps, null)(Recipe);