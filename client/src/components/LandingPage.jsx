import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


const LandingPage = props => {
    return (
        <div>
            <h1>Hey! Welcome to the Poke world</h1>
            <Link to ='/home'>
                <button>HOME</button>
            </Link>
        </div>
    )
}

LandingPage.propTypes = {

}

export default LandingPage