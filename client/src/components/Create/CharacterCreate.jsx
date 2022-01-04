// hooks from react 
import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// funcs from the action redux
import { postPokemon, getPokemonByType } from '../../actions'
//----CSS
import './create.css'
import NavBar from '../NavBar/NavBar'

const CharacterCreate = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const types = useSelector(state => state.pokemonsTypes)

    const [error, setErrors] = useState({})
    const [input, setInput] = useState({
        name:"",
        hp: "",
        attack: "",
        defense:"",
        speed:"", 
        height:"",
        weight:"",
        img:"",
        types:[]
    })

    useEffect( () => {
        dispatch(getPokemonByType())
    },[]);

    //---------- FORM CONTROLLER ----------------------

    const checkInfoObj = obj => {
        for( let e in obj){
            if(obj[e] !== null && obj[e] != "") return false;
        }
        return true;
    }

    const validate = input => {
        let errors = {};

        if(!input.name){ errors.name = 'A name is needed'};
        // if(!input.hp) { errors.name = 'A HP is needed :/'};
        
        // if(input.hp < 0){ errors.name = 'A HP should be more than 0 :/'}
        
        if(!input.img){
            errors.img = 'An URL is requiered';
        }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(input.img)){
            errors.img = 'A valid URL is needed exe. http://googlephotos.com'
        }

        if(!input.speed){
            errors.speed = 'A Speed is required'
        }else if(!/^[1-9]*$/.test(input.speed)){
            errors.speed = 'A valid Speed is required, the weight could be until 98'
        }

        if(!input.weight){
            errors.weight = 'A Weight is required'
        }else if(!/^[1-9]*$/.test(input.weight)){
            errors.weight = 'A valid Weight is required, the weight could be until 98'
        }



        return errors;
    }

    // -------------HANDLERS ---------------------------
    const handleChnage = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    const handleSelector = e => {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        // console.log(input);
        dispatch(postPokemon(input))
        alert('AWE! Pokemon has been created');
        setInput({
            name:"",
            hp: 0,
            attack: 0,
            defense:0,
            speed:0, 
            height:0,
            weight:0,
            img:"",
            types:[]
        })
        navigate('/home')
    }

    const handleDelete = (e) => {
         setInput({
             ...input,
             types: input.types.filter(ele => ele !== e)
         })
    }

    return (
        <div>
            <h1>Start with this adventure</h1>
            <h3>Lets create your own Pokemon</h3>
            <form action="" onSubmit={e => handleSubmit(e)}>
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text"  value={input.name} name='name' onChange={e => handleChnage(e)}/>
                    {error.name && (<p>{error.name}</p>)}
                </div>
                <div>
                    <label htmlFor="">HP</label>
                    <input type="number"  value={input.hp} name='hp' onChange={e => handleChnage(e)}/>
                    { error.hp && ( <p>{error.hp}</p>)}
                </div>
                <div>
                    <label htmlFor="">Attack</label>
                    <input type="number"  value={input.attack} name='attack' onChange={e => handleChnage(e)}/>
                    { error.hp && ( <p>{error.hp}</p>)}
                </div>
                <div>
                    <label htmlFor="">Defense</label>
                    <input type="number"  value={input.defense} name='defense' onChange={e => handleChnage(e)}/>
                    { error.hp && ( <p>{error.hp}</p>)}
                </div>
                <div>
                    <label htmlFor="">Speed</label>
                    <input type="number"  value={input.speed} name='speed' onChange={e => handleChnage(e)}/>
                    { error.speed && ( <p>{error.speed}</p>)}
                </div>
                <div>
                    <label htmlFor="">Height</label>
                    <input type="number"  value={input.height} name='height' onChange={e => handleChnage(e)}/>
                    { error.height && ( <p>{error.height}</p>)}
                </div>
                <div>
                    <label htmlFor="">Weight</label>
                    <input type="number"  value={input.weight} name='weight' onChange={e => handleChnage(e)}/>
                    { error.weight && ( <p>{error.weight}</p>)}
                    
                </div>
                <div>
                    <label htmlFor="">Image</label>
                    <input type="text" value={input.img} name='img' onChange={e => handleChnage(e)}/>
                    { error.img && ( <p>{error.img}</p>)}
                </div>
                <div>
                    <label htmlFor="">Type</label>
                    <select name="" onChange={e=> handleSelector(e)} >
                        <option hidden>none</option>
                        {types.map(typ => (
                            <option key={typ.id} value={typ.name}> 
                                {typ.name} 
                            </option>
                        ))}
                    </select>
                    <ul>
                        <li>
                            {input.types.map(e => 
                                    <div key={e}>
                                        <p >{e}</p>
                                        <button onClick={()=> handleDelete(e)}>x</button>
                                    </div>
                                )
                            }
                        </li>
                    </ul>
                </div>
                {(!Object.keys(error).length && !checkInfoObj(input)) ? (<button type='submit' > <span> Create </span> </button>) : <button disabled type='submit'> <span> Create </span></button>}
            </form>
        </div>
    )
}

export default CharacterCreate;
