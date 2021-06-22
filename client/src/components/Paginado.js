import React from 'react';
import { NavLink } from 'react-router-dom';
import './buttons.css'
const Paginado = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
  
        for(let i=1; i<=Math.ceil(totalPosts / postsPerPage); i++){
            pageNumbers.push(i);
        }
    // }
    

    
    return(
        <nav>
            <ul className='pages'>
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li className='page' key={number}> 
                            <a className='pagenumber' onClick={() => paginate(number)} >{number}</a>
                        </li>
                    ))
                }     
              
            </ul>

        </nav>
    )
}

export default Paginado;