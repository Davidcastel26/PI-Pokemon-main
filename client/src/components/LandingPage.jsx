import React from 'react'
import { Link } from 'react-router-dom';


const LandingPage = () => {
    return (
        <div>
            <Link to ='/home'>
                <button>HOME</button>
            </Link>
            <h1>Hey! Welcome to the Poke world</h1>
        </div>
    )
}

export default LandingPage