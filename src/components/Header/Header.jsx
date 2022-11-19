import react from 'react'
import { COMPLETED, ALL, OUT_OF_DATE, NOT_COMPLETED } from '../../state/showParams'

const Header = ({ setShowParam }) => {
    return <>
        <header className='header'>
            <h1>Todos</h1>
            <nav>
               <button onClick={(ev) => { setShowParam(COMPLETED) }}>Completed</button>
               <button onClick={(ev) => { setShowParam(NOT_COMPLETED) }}>Not completed</button> 
               <button onClick={(ev) => { setShowParam(ALL) }}>All</button>
               <button onClick={(ev) => { setShowParam(OUT_OF_DATE) }}>Out Of Date</button>
            </nav>
        </header>
    </>
}

export default Header