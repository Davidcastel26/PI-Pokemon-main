import React from 'react'
//--- CSS
import './pages.css'

const Pages = ({pokemonsPerPage, allCharacters, pages}) => {
    
    const pageNumbers = []

    for( let i = 0; i<= Math.ceil(allCharacters/pokemonsPerPage); i++){
        pageNumbers.push(i+1)
    }

    return (
        <nav>
            <ul className='pages'>
                { pageNumbers && 
                pageNumbers.map(number => (
                    <li className='number' key={number}>
                        <a onClick={() => pages(number)}>
                            {number}
                        </a>
                    </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pages
