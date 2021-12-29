import React, {useState} from 'react';
import { useDispatch  } from 'react-redux';
import {getNamePokemon} from '../../actions'

const SearchBar = () => {
    //hooks
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleInputChange = e => {
        e.preventDefault();
        setName(e.target.value)
        console.log( name );
    }

    const handleClick = e =>{
        e.preventDefault();
        dispatch(getNamePokemon(name))
    }

    return (
        <div>
            <input 
                type="text"
                placeholder='Search' 
                onChange={e => handleInputChange(e)}
            />
            <button 
                type='submit'
                onClick={e => handleClick(e)}> Search s</button>
        </div>
    )
}

export default SearchBar
