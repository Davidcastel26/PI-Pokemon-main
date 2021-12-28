//hooks
import React, 
     { useState,
       useEffect,
       Fragment,  
       } from 'react';
import { useDispatch,
         useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

import getCharacter, 
        {
         filterPokemonByCreatedOrExisted,
        } from '../../actions';

//components 
import Card from './Card';
import BtnsFilter from './BtnsFilter';
import Pages from './Pages';


const Home = () =>{
    
    const dispatch = useDispatch();
    const allCharacters = useSelector((state) => state.characters)
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage // 
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allCharacters.slice(indexOfFirstPokemon, indexOfLastPokemon )

    const pages = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getCharacter())
    },[dispatch])

    const handleClick = ( e ) =>{
        e.preventDefault();
        dispatch(getCharacter)
    }

    const handleFilterCreOrExist = (e) =>{
        dispatch(filterPokemonByCreatedOrExisted(e.target.value))
    } 

    const funcionExe = () =>{
        let varialbeXDpapa =currentPokemons.filter(ele => ele.id.toString().length < 7)
        return varialbeXDpapa
    }
    console.log(funcionExe());
    console.log(currentPokemons);
    return(
        <div>
            <Link to='/pokemon'>Create Pokemon</Link>
            <h1>Pokemons</h1>
            <button onClick={e=> handleClick(e)}>
                reload all the pokemons
            </button>
            <div>
                <Pages 
                    pokemonsPerPage={pokemonsPerPage}
                    allCharacters={allCharacters.length}
                    pages={pages}
                />
                <BtnsFilter 
                    handleFilterCreOrExist={handleFilterCreOrExist}
                />  

                

                {
                    currentPokemons?.map(e => {
                        return(
                            <Fragment key={e.id}>
                                <Link to ={"/home/" + e.id} key={e.id}>
                                    <Card name={e.name} img={e.img} type={e.type} attack={e.attack} hp={e.hp} defense={e.defense} speed={e.speed} heigth={e.heigth} weight={e.weight} />
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