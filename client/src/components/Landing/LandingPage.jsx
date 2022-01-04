import React from 'react'
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
//-----CSS
import './landingpage.css'

const LandingPage = () => {
    return (
        <div className='App'>
            <div className='gradient__bg'>
                <NavBar />
                <h1>Hey! Welcome to the Poke world</h1>
            </div>
        </div>
    )
}

export default LandingPage