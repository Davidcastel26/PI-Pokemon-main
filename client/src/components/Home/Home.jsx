import React, 
     { useState,
       useEffect } from 'react';
import { useDispatch,
         useSelector } from 'react-redux';
import getCharacter from '../../actions';
import {Link} from 'react-router-dom';

const Home = () =>{
    const dispatch = useDispatch();
    const allCharacters = useSelector((state) => state.characters)

    useEffect(()=>{
        dispatch(getCharacter())
    },[])

    const handleClick = ( e ) =>{
        e.preventDefault();
        dispatch(getCharacter)
    }

    return(
        <div>
            <Link to='/pokemon'>Create Pokemon</Link>
            <h1>Pokemons</h1>
            <button onClick={e=> handleClick(e)}>
                reload all the pokemons
            </button>
        </div>
    )
}

export default Home;