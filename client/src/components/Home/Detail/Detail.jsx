//hooks
import {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// actions redux
import { getDetail } from '../../../actions'
//----CSS
import './detail.css'

const Detail = () => {

    const dispatch = useDispatch();
    const {id} = useParams()
    useEffect(()=>{
        dispatch(getDetail(id))
    },[dispatch])

    const myCharacter = useSelector(state => state.detail)

    return (
        <div>   
            {
             myCharacter ? 
                <div>
                    <h1>{myCharacter.name}</h1>
                    <img src={myCharacter.img} alt="" /> 
                    <h2></h2>
                </div> : <p>Loading</p>
            }
            <Link to='/home'>
                <button>Back</button>
            </Link>
        </div>
    )
}

export default Detail
