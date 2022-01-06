//hooks
import {/*useState,*/ useEffect} from 'react'
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
        <div className="mian_container__detail">   
            <div className="m_conta_desing">
            {
             myCharacter ? 
                <div className='card__main__detail'>
                    <div className='first_container_1_d'>
                        <h1>{myCharacter.name}</h1>
                        <div className='inside_first_container_1_d'>
                            <h4>TYPES</h4>
                            <p>{myCharacter.types}</p>
                        </div>
                    </div>
                    <img src={myCharacter.img} alt="" /> 
                    <div className='info__details_card__'>
                    {/* <ul> */}
                        {/* <li> */}
                            <p> attack {myCharacter.attack}</p>
                        {/* </li><li> */}
                            <p> height {myCharacter.height}</p>
                        {/* </li><li> */}
                            <p>weight {myCharacter.weight}</p>
                        {/* </li><li> */}
                            <p>health {myCharacter.hp}</p>
                        {/* </li><li> */}
                            <p>defense {myCharacter.defense}</p>
                        {/* </li><li> */}
                            <p>speed {myCharacter.speed}</p>
                        {/* </li> */}
                    {/* </ul> */}
                    </div>
                </div> : <p>Loading</p>
            }
            </div>
        </div>
    )
}

export default Detail
