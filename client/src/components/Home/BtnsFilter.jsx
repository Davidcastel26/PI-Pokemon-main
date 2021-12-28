import React /*,{ Fragment }*/ from 'react'
// import { Link } from 'react-router-dom'
import {filterPokemonByName} from '../../actions'

function BtnsFilter({handleFilterCreOrExist,handlePokemonAttack}) {
    return (
        <div>   
                {/* showing pokemos byt asc and desc by strength */}
                <select  onChange={ (e) => handlePokemonAttack(e)}>
                    <option value="lessProwerfull" > Ascendent </option>
                    <option value="morePowerfull" > Descend </option>
                </select >
                {/* showing pokemons by asc and desc by name */}
                <select onChange={(e)=>filterPokemonByName(e)} >
                    <option value="asc" > Ascendent </option>
                    <option value="desc" > Descend </option>
                </select>
                {/* showing pokemon by existing or by created */}
                <select onChange={(e)=>handleFilterCreOrExist(e)}>
                    <option value="All" > All </option>
                    <option value="Created" > Created </option>
                    <option value="Existing" > Existing </option>
                </select>
                {/* showing pokemons by type  */}
                {/* <select>
                    <option value="">normal</option>
                    <option value="">fighting</option>
                    <option value="">flying</option>
                    <option value="">poison</option>
                    <option value="">ground</option>
                    <option value="">rock</option>
                </select> */}
                
                
        </div>
    )
}

export default BtnsFilter

/*
[ ] Botones/Opciones para filtrar por tipo de pokemon y por pokemon existente o creado por nosotros
[ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético y por fuerza
[ ] Paginado para ir buscando y mostrando los siguientes pokemons, 12 pokemons por pagina, mostrando los primeros 9 en la primer pagina.
*/
