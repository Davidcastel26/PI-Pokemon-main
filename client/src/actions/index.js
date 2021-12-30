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

export const getPokemonByType = () =>{
    // console.log(payload);
    return async function(dispatch) {
        try {
            const type = await axios.get(`http://localhost:3001/api/types`)
            return dispatch({
                type:'GET_TYPE',
                payload: type.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const postPokemon = (payload) => {
    const posted = async() => {
        try {
            const response = await axios.post(`http://localhost:3001/api/pokemon`, payload)
            return response
        } catch (error) {
            
        }
    }
    return posted
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