import react, { useReducer, useState } from 'react'
import { reducer, initialState } from './state/todos-state'
import { ALL } from './state/showParams'
import Header from './components/Header/Header'
import Todos from './components/Todos/Todos'

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [showParam, setShowParam] = useState(ALL)

    return <>
        <Header setShowParam={setShowParam} />
        <Todos {...state} dispatch={dispatch} showParam={showParam} />
    </>
}

export default App