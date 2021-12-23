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

export const filterCharactersByStatus = (payload) =>{
    return {
        type:'FILTER_BY_STATUS',
        payload
    }
}

export default getCharacter;