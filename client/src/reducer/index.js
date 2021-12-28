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
            // const statusFilter = action.payload === 'All' ? allPokemons : allPokemons.filter(el => el.attack === action.payload)
            var sortByStrnght;
            
            switch(action.payload){
                case 'lessProwerfull':
                    sortByStrnght = state.characters.sort((a,b) => {
                        if(a.attack > b.attack) return 1;
                        if(b.attack > a.attack) return -1;
                        return 0
                    })
                break;
                case 'morePowerfull':
                    sortByStrnght = state.characters.sort((a,b) => {
                        if(a.attack < b.attack) return -1
                        return 0
                    })
                break;
                default:
                    console.log('sort type undefined');
                break;
            }
            return{
               ...state,
               characters: sortByStrnght

            }
        case 'FILTER_BY_CREATEDOREXISTED':
            let filterCE;

            switch(action.payload){
                case 'Created':
                    filterCE = state.AllCopyPokemons.filter(ele => ele.id.length > 8)
                break;
                case 'Existing':
                    filterCE = state.AllCopyPokemons.filter(ele => ele.id.toString().length < 7)
                break;
                default:
                    return state
            }

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