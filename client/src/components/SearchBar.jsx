import React, {useState} from 'react';
import { useDispatch  } from 'react-redux';
import {getNamePokemon} from '../actions'

const SearchBar = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState("");

    return (
        <div>
            <input 
                type="text"
                placeholder='Search' 
            />
            <button type='submit'> Search s</button>
        </div>
    )
}

export default SearchBar
