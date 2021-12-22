import React from 'react'

const Card = ({img, name, type, id, hp, strength, defense, speed, heigth, weight}) => {
    return (
        <div>
            <h1>{name}</h1>
            <img src={img} alt="img not found" width='250px' height='200px' />
            <h3>{type}</h3>
            <h3>{id}</h3>
            <h5>{hp}</h5>
            <h5>{strength}</h5>
            <h5>{defense}</h5>
            <h5>{speed}</h5>
            <h6>{heigth}</h6>
            <h6>{weight}</h6>
        </div>
    )
}

export default Card
