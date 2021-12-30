// hooks from react 
import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// funcs from the action redux
import { postPokemon, getPokemonByType } from '../../actions'


const CharacterCreate = () => {

    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name:"",
        hp: 1,
        attack: 1,
        defense:1,
        speed:1,
        height:1,
        weight:1,
        img:"",
        types:[]
    })

    useEffect( () => {
        dispatch(getPokemonByType())
    },[]);

    const types = useSelector(state => state.pokemonsTypes)

    return (
        <div>
            <Link to='/home'><button>Back</button></Link>
            <h1>Start with this adventure</h1>
            <h3>Lets create your own Pokemon</h3>
            <form action="">
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text"  value={input.name} name='name'/>
                </div>
                <div>
                    <label htmlFor="">HP</label>
                    <input type="text"  value={input.hp} name='hp'/>
                </div>
                <div>
                    <label htmlFor="">Attack</label>
                    <input type="text"  value={input.attack} name='attack'/>
                </div>
                <div>
                    <label htmlFor="">Defense</label>
                    <input type="text"  value={input.defense} name='defense'/>
                </div>
                <div>
                    <label htmlFor="">Speed</label>
                    <input type="text"  value={input.speed} name='speed'/>
                </div>
                <div>
                    <label htmlFor="">Height</label>
                    <input type="text"  value={input.height} name='height'/>
                </div>
                <div>
                    <label htmlFor="">Weight</label>
                    <input type="text"  value={input.weight} name='weight'/>
                </div>
                <div>
                    <label htmlFor="">Image</label>
                    <input type="text" value={input.img} name='img' />
                </div>
                <div>
                    <label htmlFor="">Type</label>
                    <input type="text"  value={input.types} name='types'/>
                </div>
                <div>
                    <select name="" id="">
                        {types.map(typ => (
                            <option value={typ.name}> {typ.name} </option>
                        ))}
                    </select>
                </div>
                
            </form>
        </div>
    )
}

export default CharacterCreate;
