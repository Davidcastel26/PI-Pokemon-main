import axios from 'axios';

const getCharacter = () =>{
    return async(dispatch) => {
        let json = await axios.get(`http://localhost:3001/api/pokemon`);

        return dispatch({
            type:'GET_CHARACTERS',
            payload: json.data
        })

    }
}

export const getNamePokemon = (payload) => {
    return async function (dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/api/pokemon?name=${payload}`)
            return dispatch({
                type:'GET_NAME_POKEMON',
                payload: json.data
            })
        } catch (error) {
            console.log(error);   
        }
    }
}

export const getCharacterById = () => {
    console.log('holi');
}

export const filterPokemonByType = (payload) =>{
    // console.log(payload);
    return {
        type:'FILTER_BY_TYPE',
        payload
    }
}

export const filterPokemonByCreatedOrExisted = (payload) => {
    // console.log(payload);
    return{
        type: 'FILTER_BY_CREATEDOREXISTED',
        payload
    }
}

export const filterPokemonByName = payload => {
    // console.log(payload);
    return {
        type:'FILTER_BY_NAME',
        payload
    }
}

export const filterPokemonByStrength = (payload) =>{
    // console.log(payload);
    return{
        type: 'FILTER_BY_STRENGTH',
        payload
    }
}

export default getCharacter;