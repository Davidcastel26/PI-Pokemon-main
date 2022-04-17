import React from 'react'
import { Link } from 'react-router-dom';
// import NavBar from '../NavBar/NavBar';
//-----CSS
import './landingpage.css'
import landing from '../../imgs/pokemon.png'

const LandingPage = () => {
    return (
        <div className='App'>
            <div className='gradient__bg'>
                <div className="container_2">
                    <img src={landing} alt="landing img" />
                </div>
                <div className='container_1'>
                    <h1>
                        Hey! Welcome to Poke World
                    </h1>
                    <p>
                        Here you will be able to discover a new world, that has never be discover before!
                        </p>
                    
                    <Link to ='/home'>
                        <button>Pokemons</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage