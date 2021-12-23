//hooks
import React, 
     { useState,
       useEffect,
       Fragment, 
       } from 'react';
import { useDispatch,
         useSelector } from 'react-redux';
import getCharacter from '../../actions';
import {Link} from 'react-router-dom';

//components 
import Card from './Card';
import BtnsFilter from './BtnsFilter';


const Home = () =>{
    const dispatch = useDispatch();
    const allCharacters = useSelector((state) => state.characters)

    useEffect(()=>{
        dispatch(getCharacter())
    },[dispatch])

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
            <div>
                <BtnsFilter characters={allCharacters}/>
                {
                    allCharacters?.map(e => {
                        return(
                            <Fragment>
                                <Link to ={"/home/" + e.id}>
                                    <Card name={e.name} img={e.img} nickname={e.id} />
                                </Link>
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;


/*
  <div>
            <select name="" id="">
                    <option value="asc" > Ascendent </option>
                    <option value="desc" > Descend </option>
                </select>
                {/* showing pokemons by asc and desc by name 
                <select name="" id="">
                    <option value="asc" > Ascendent </option>
                    <option value="desc" > Descend </option>
                </select>
                {/* showing pokemon by existing or by created 
                <select name="" id="">
                    <option value="all" > All </option>
                    <option value="created" > Created </option>
                    <option value="existing" > Existing </option>
                </select>
                {
                    allCharacters?.map(e => {
                        return(
                            <Fragment>
                                <Link to ={"/home/" + e.id}>
                                    <Card name={e.name} img={e.img} nickname={e.id} />
                                </Link>
                            </Fragment>
                        )
                    })
                }
            </div>
 */