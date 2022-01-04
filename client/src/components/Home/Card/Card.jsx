import React from 'react'
// --- CSS
import './card.css'

const Card = ({img, name, type, id, hp, attack, defense, speed, heigth, weight}) => {
    return (
        <div className='card'>
            <h1>{name}</h1>
            <img src={img} alt="img not found" width='250px' height='200px' />
            <h3> type {type}</h3>
            <h3>{id}</h3>
            <h5>hp {hp}</h5>
            <h5>st {attack}</h5>
        </div>
    )
}

export default Card
