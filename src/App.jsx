import react, { useReducer, useState, useEffect } from 'react'
import { reducer, initialState, setTodos } from './state/todos-state'
import { ALL } from './state/showParams'
import TodosApi from './firebase/api'
import Header from './components/Header/Header'
import Todos from './components/Todos/Todos'

const App = () => {
    
    const [state, dispatch] = useReducer(reducer, initialState)
    const [showParam, setShowParam] = useState(ALL)

    useEffect(() => {
        const todosAsyncWrapper = async () => {
            const todos = await TodosApi.getTodos()
            dispatch(setTodos(todos))
        }
        todosAsyncWrapper()
    }, [dispatch])
    
    return <>
        <Header setShowParam={setShowParam} />
        <Todos {...state} dispatch={dispatch} showParam={showParam} />
    </>
}

export default App