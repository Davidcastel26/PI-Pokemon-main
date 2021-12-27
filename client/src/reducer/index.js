const initialState = {
    characters : [],
    //we are creating a copy so we won't filter into the array already filtered
    AllCopyPokemons : []
}

const rootReducer = (state = initialState, action) =>{
    
    const allPokemons = state.characters
    
    switch(action.type){
        case 'GET_CHARACTERS':
            return{
                ...state,
                characters:action.payload,
                AllCopyPokemons: action.payload
            }
        case 'GET_CHARACTER':
            return{
                ...state,
                AllCopyPokemons : action.payload
            }
        case 'FILTER_BY_STRENGTH':
            const statusFilter = action.payload === 'All' ? allPokemons : allPokemons.filter(el => el.attack === action.payload)
            return{
               ...state,
               characters: statusFilter
            }
        case 'FILTER_BY_CREATEDOREXISTED':
            const filterCE = action.payload === 'Created' ? state.AllCopyPokemons.filter(ele => ele.id.length > 8) : state.AllCopyPokemons.filter(ele => ele.id.length < 8)
            return{
                ...state,
                characters : action.payload === 'All' ? state.characters : filterCE
            }
        case 'FILTER_BY_NAME':
            var sortByNmae;
            
            switch(action.payload){
                case 'asc':
                    sortByNmae = state.characters.sort((a,b)=>{
                        if(a.name > b.name) return 1;
                        if(b.name > a.name) return -1;
                        return 0
                    })
                break;
                case 'desc':
                    sortByNmae = state.characters.sort((a,b)=>{
                        if(a.name > b.name) return -1;
                        if(a.name > b.name) return 1;
                        return 0;
                    })
                break;
                default:
                    console.log('there is mising the func');
                break;
            }

            return{
                ...state,
                characters: sortByNmae
            }
        default:
            return {...state}
    }
}


export default rootReducer;