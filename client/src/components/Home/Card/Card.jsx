import React from 'react'
// --- CSS
import './card.css'

const Card = ({img, name, type, id, hp, attack, defense, speed, heigth, weight}) => {
    return (
        <div className='card'>
            <div className="img__">
                <img src={img} alt="img not found"/>
            </div>
            <div className='container__info'>
                <div className='continer__name'>
                    <h1>{name}</h1>
                </div>
                <div className='basic__info'>
                    <p> type {type}</p>
                    {/* <li>{id}</li> */}
                    <div className='basic__info__1'>
                        <p>hp {hp}</p>
                        <p>st {attack}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
