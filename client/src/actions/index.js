import axios from 'axios';

const getCharacter = () =>{
    return async(dispatch) => {
        let json = await axios(`http://localhost:3001/api/pokemon`);

        return dispatch({
            type:'GET_CHARACTERS',
            payload: json.data
        })

    }
}

export default getCharacter;