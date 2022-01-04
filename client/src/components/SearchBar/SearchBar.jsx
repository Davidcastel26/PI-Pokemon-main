import React, {useState} from 'react';
import { useDispatch  } from 'react-redux';
import {getNamePokemon} from '../../actions'
//---- CSS
import './searchbar.css'

const SearchBar = () => {
    //hooks
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleInputChange = e => {
        e.preventDefault();
        setName(e.target.value)
        // console.log( name );
    }

    const handleClick = e =>{
        e.preventDefault();
        dispatch(getNamePokemon(name));
        // reset value (don't forget to set a value into the input)
        setName('');
    }

    return (
        <div>
            <input 
                type="text"
                placeholder='Search' 
                value={name}
                onChange={e => handleInputChange(e)}
            />
            <button 
                type='submit'
                onClick={e => handleClick(e)}> Searchs</button>
        </div>
    )
}

export default SearchBar
