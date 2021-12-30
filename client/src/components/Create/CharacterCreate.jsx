// hooks from react 
import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// funcs from the action redux
import { postPokemon, getPokemonByType } from '../../actions'


const CharacterCreate = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
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
    
    // -------------HANDLERS ---------------------------
    const handleChnage = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    const handleSelector = e => {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(input);
        dispatch(postPokemon(input))
        alert('AWE! Pokemon has been created');
        setInput({
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
        navigate.push('./home')
    }

    return (
        <div>
            <Link to='/home'><button>Back</button></Link>
            <h1>Start with this adventure</h1>
            <h3>Lets create your own Pokemon</h3>
            <form action="">
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text"  value={input.name} name='name' onChange={handleChnage}/>
                </div>
                <div>
                    <label htmlFor="">HP</label>
                    <input type="text"  value={input.hp} name='hp' onChange={handleChnage}/>
                </div>
                <div>
                    <label htmlFor="">Attack</label>
                    <input type="text"  value={input.attack} name='attack' onChange={handleChnage}/>
                </div>
                <div>
                    <label htmlFor="">Defense</label>
                    <input type="text"  value={input.defense} name='defense' onChange={handleChnage}/>
                </div>
                <div>
                    <label htmlFor="">Speed</label>
                    <input type="text"  value={input.speed} name='speed' onChange={handleChnage}/>
                </div>
                <div>
                    <label htmlFor="">Height</label>
                    <input type="text"  value={input.height} name='height' onChange={handleChnage}/>
                </div>
                <div>
                    <label htmlFor="">Weight</label>
                    <input type="text"  value={input.weight} name='weight' onChange={handleChnage}/>
                </div>
                <div>
                    <label htmlFor="">Image</label>
                    <input type="text" value={input.img} name='img' onChange={handleChnage}/>
                </div>
                <div>
                    <label htmlFor="">Type</label>
                    <select name="" onChange={e=> handleSelector(e)} >
                        {types.map(typ => (
                            <option key={typ.id} value={typ.name}> 
                                {typ.name} 
                            </option>
                        ))}
                    </select>
                    <ul>
                        <li>
                            {input.types.map(e => e + " ,")}
                        </li>
                    </ul>
                </div>
                <button type='submit' onClick={e => handleSubmit(e)} > Create </button>
            </form>
        </div>
    )
}

export default CharacterCreate;
