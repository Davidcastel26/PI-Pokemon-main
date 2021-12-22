import React, 
     { useState,
       useEffect } from 'react';
import { useDispatch,
         useSelector } from 'react-redux';
import getCharacter from '../../actions';

const Home = () =>{
    const dispatch = useDispatch();
    const allCharacters = useSelector((state) => state.characters)

    useEffect(()=>{
        dispatch(getCharacter())
    },[])

}

export default Home;