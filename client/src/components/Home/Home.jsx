//hooks
import React, 
     { useState,
       useEffect,
       Fragment,  
       } from 'react';
import { useDispatch,
         useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
// importing all the funcs from actions REDUX
import getCharacter, 
        {
         filterPokemonByCreatedOrExisted,
         filterPokemonByStrength,
         filterPokemonByName,
         filterByTypes
        } from '../../actions';
//importing all the components 
import Card from './Card/Card';
import BtnsFilter from './BtnFil/BtnsFilter';
import Pages from './pages/Pages';
import SearchBar from '../SearchBar/SearchBar';
// --- CSS
import './home.css'
import Unknowimg from '../../imgs/unknowimg.png'

const Home = () =>{
    
    //hooks
    const dispatch = useDispatch();
    const allCharacters = useSelector((state) => state.characters)
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);

    console.log(allCharacters);
    const indexOfLastPokemon = currentPage * pokemonsPerPage // 
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    //slice will devide all the array by indexes
    const currentPokemons = allCharacters.slice(indexOfFirstPokemon, indexOfLastPokemon )

    
    const pages = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getCharacter())
    },[dispatch])

    const handleClick = ( e ) =>{
        e.preventDefault();
        dispatch(getCharacter())
    }

    const handleFilterCreOrExist = (e) =>{
        dispatch(filterPokemonByCreatedOrExisted(e.target.value))
    } 

    const handlePokemonAttack = (e) => {
        e.preventDefault();
        dispatch(filterPokemonByStrength(e.target.value))
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`)
    }

    const handlePokemonByName = (e) =>{
        e.preventDefault();
        dispatch(filterPokemonByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`)
    }

    const handleType = e => {
        e.preventDefault();
        dispatch(filterByTypes(e.target.value))
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`)
    }
    /*
    const funcionExe = () =>{
        let varialbeXDpapa =currentPokemons.map(ele => ele.attack)
        return varialbeXDpapa
    }
    */
    // console.log(funcionExe());
    // console.log(currentPokemons);
    return(
        <div className='mian_container'>
            
            <div className="container__1_header">
                <h1>Pokemons</h1>
                <SearchBar/>
            </div>
            <div >
                <div className='container__btns'>
                    
                    <div className='btns_w'>
                        <button className='reload__btn' onClick={(e)=>handleClick(e)} >
                            Select Pokemons
                        </button>
                        <BtnsFilter 
                            handleFilterCreOrExist={handleFilterCreOrExist}
                            handlePokemonAttack={handlePokemonAttack}
                            handlePokemonByName={handlePokemonByName}
                            handleType={handleType}
                        />  
                    </div>
                </div>
                <div className='container_c'>
                    <div className='cards'>
                        {currentPokemons?.map(e => {
                            return(
                                <Fragment key={e.id}>
                                    <Link to ={`/home/${e.id}`} key={e.id}>
                                        <Card 
                                            name={e.name} 
                                            img={e.img ? e.img : <img src={Unknowimg} alt='img suport'/>} 
                                            type={e.types} 
                                            attack={e.attack} 
                                            hp={e.hp} />
                                    </Link>
                                </Fragment>
                            )
                        })}
                    </div>
                </div>
                <div className='container__main_p'>
                    <div className='pages__container'>
                        <Pages 
                            pokemonsPerPage={pokemonsPerPage}
                            allCharacters={allCharacters.length}
                            pages={pages}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
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