import React from 'react'
//--- CSS
import './pages.css'

const Pages = ({pokemonsPerPage, allCharacters, pages, currentPage}) => {
    
    const pageNumbers = []

    for( let i = 0; i<= Math.ceil(allCharacters/pokemonsPerPage); i++){
        pageNumbers.push(i+1)
    }

    return (
        <div className='pgs_container'>
            <ul className='pages'>
                { pageNumbers && 
                pageNumbers.map(number => (
                <li className='number' key={number}>
                    <a href='#top' onClick={() => pages(number)} id={(currentPage === number ? 'act':'')}>
                            {number}
                    </a>
                </li>
                ))
                }
            </ul>
        </div>
    )
}

export default Pages
