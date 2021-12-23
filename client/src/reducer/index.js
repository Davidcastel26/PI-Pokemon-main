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
        case 'FILTER_BY_STATUS':
            const allPokemons = state.characters
            const statusFilter = action.payload === 'All' ? allPokemons : allPokemons.filter(el => el.status === action.payload)
            return{
               ...state,
               characters: statusFilter
            }
        default:
            return {...state}
    }
}


export default rootReducer;