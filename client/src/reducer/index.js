const initialState = {
    characters : []
}

const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'GET_CHARACTERS':
            return{
                ...state,
                characters:action.payload
            }
        break;
    }
}


export default rootReducer;