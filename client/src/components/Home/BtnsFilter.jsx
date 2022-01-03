import React ,{ /*Fragment */ useEffect }from 'react'
// import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPokemonByType } from '../../actions'

function BtnsFilter(
    {
     handleFilterCreOrExist,
     handlePokemonAttack,
     handlePokemonByName,
     handleType
    }) 
{   

    const dispatch = useDispatch();
    
    useEffect( () =>{
        dispatch(getPokemonByType())
    },[] )
    
    const ptypes = useSelector(state => state.pokemonsTypes);
    // console.log(ptypes);
    return (
        <div>   
                {/* showing pokemos byt asc and desc by strength */}
                <select  onChange={ (e) => handlePokemonAttack(e)}>
                    <option hidden>Attack</option>
                    <option value= "morePowerfull"> Ascendent </option>
                    <option value="lessProwerfull" > Descend </option>
                </select >
                {/* showing pokemons by asc and desc by name */}
                <select onChange={(e)=>handlePokemonByName(e)} >
                <option hidden>Name</option>
                    <option value="asc" > Ascendent </option>
                    <option value="desc" > Descend </option>
                </select>
                {/* showing pokemon by existing or by created */}
                <select onChange={(e)=>handleFilterCreOrExist(e)}>
                    <option hidden>Pokemons List</option>
                    <option value="All" > All </option>
                    <option value="Created" > Created </option>
                    <option value="Existing" > Existing </option>
                </select>
                {/* showing pokemons by type  */}
                <select onChange={e => handleType(e)}>
                    <option hidden>Types</option>
                    <option value="Alls">All</option>
                    {ptypes.map( PokeType => (
                        <option key={PokeType.id} value={PokeType.name} >{PokeType.name}</option>
                    ))}
                </select>
                
                
        </div>
    )
}

export default BtnsFilter

/*
[ ] Botones/Opciones para filtrar por tipo de pokemon y por pokemon existente o creado por nosotros
[ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético y por fuerza
[ ] Paginado para ir buscando y mostrando los siguientes pokemons, 12 pokemons por pagina, mostrando los primeros 9 en la primer pagina.
*/
