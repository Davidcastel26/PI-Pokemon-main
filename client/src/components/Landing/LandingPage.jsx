import React from 'react'
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
//-----CSS
import './landingpage.css'
import landing from '../../imgs/pokemon.png'

const LandingPage = () => {
    return (
        <div className='App'>
            <div className='gradient__bg'>
                <NavBar />
                <div>
                    <h1>
                        Hey! Welcome to the Poke world
                    </h1>
                    <img src={landing} alt="" />
                </div>
            </div>
        </div>
    )
}

export default LandingPage