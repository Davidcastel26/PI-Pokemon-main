const initialState = {
    characters : [],
    //we are creating a copy so we won't filter into the array already filtered
    AllCopyPokemons : [],
    pokemonsTypes : [],
    detail: []
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
        case 'GET_NAME_POKEMON':
            return{
                ...state,
                characters: action.payload
            }
        case 'POST_POKEMON':
            return{
                ...state
            }
        // we are getting the types and creating the func type
        case 'GET_TYPE':
            return {
                ...state,
                pokemonsTypes: action.payload
            }
        case 'TYPE':
            let copyPoke = state.AllCopyPokemons;
            let type_filter = action.payload === 'Alls' ? copyPoke : copyPoke.filter(e => e.types.includes(action.payload))
            

            return{
                ...state,
                characters: type_filter
            }
        // this is the reducer to get sac or desc by attack-------------------
        case 'FILTER_BY_STRENGTH':
            // const statusFilter = action.payload === 'All' ? allPokemons : allPokemons.filter(el => el.attack === action.payload)
            let sortByStrnght;

            if(action.payload === 'morePowerfull'){
                console.log(state.characters);

                sortByStrnght = state.characters.sort((a,b) => {
                    if(a.attack > b.attack) return 1; /* console.log(a.attack);*/ 
                    if(b.attack > a.attack) return -1;
                    return 0
                })
            }else if(action.payload === 'lessProwerfull'){
                console.log(state.characters);
                sortByStrnght = state.characters.sort((a,b) => {
                    if(a.attack < b.attack) return -1
                    return 0
                })
            }


            // if(action.payload === 'morePowerfull'){
            //     sortByStrnght = state.AllCopyPokemons.filter(ele => ele.id.length > 8)
            // }

            return{
               ...state,
               characters: sortByStrnght

            }
        // this is the reducer to get sac or desc by created or existed-------------------
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
                    return {...state}
            }

            return{
                ...state,
                characters : action.payload === 'All' ? state.characters : filterCE
            }
        // this is the reducer to get sac or desc by name-------------------
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
        // -----------this is the case for the single pages per pokemon------------
        case 'GET_DETAILS':
            return{
                ...state,
                detail: action.payload
            }
        default:
            return {...state}
    }
}


export default rootReducer;