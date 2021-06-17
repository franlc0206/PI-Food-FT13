import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './landingpage.css'


//COMPONENTE LANDINGPAGE

export default function LandingPage() {
    return (
        <div className="topnav"> 
            <div className="App">
                <h1>Henry Food</h1>
            </div>
            <div className="Subtitle">
            </div>
            <div className="list">
                <NavLink to='/home' className='button1'>start searching</NavLink>          
            </div>

        </div>
    )
}