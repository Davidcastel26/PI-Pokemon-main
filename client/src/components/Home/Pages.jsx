import React from 'react'

const Pages = ({pokemonsPerPage, allCharacters, pages}) => {
    
    const pageNumbers = []

    for( let i = 0; i<= Math.ceil(allCharacters/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <div>
             
        </div>
    )
}

export default Pages
