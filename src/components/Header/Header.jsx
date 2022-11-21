import react from 'react'
import { COMPLETED, ALL, NOT_COMPLETED } from '../../state/showParams'

const Header = ({ setShowParam }) => {
    return <>
        <header className='header'>
            <h1 className="header__title">Todos</h1>
            <nav className="header__nav">
               <button className='btn' onClick={(ev) => { setShowParam(COMPLETED) }}>Completed</button>
               <button className='btn' onClick={(ev) => { setShowParam(NOT_COMPLETED) }}>Not completed</button> 
               <button className='btn' onClick={(ev) => { setShowParam(ALL) }}>All</button>
            </nav>
        </header>
    </>
}

export default Header