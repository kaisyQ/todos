import react from 'react'
import { removeTodo as removeTodoActionCreater } from '../../../state/todos-state'
import { setIsCompleted as setIsCompletedActionCreater } from '../../../state/todos-state'

const Todo = ({ title, date, id, dispatch }) => {
    
    const removeTodo = (ev) => {
        dispatch(removeTodoActionCreater({
            id: id
        }))
    }

    const setIsCompleted = (ev) => {
        dispatch(setIsCompletedActionCreater({
            id: id
        }))
    }

    return <> 
        <div className='todo'>
            <div>
                <div className='todo__title'>{ title }</div>
                <div className='todo__date'>{ date }</div>
            </div>
            <button onClick={ removeTodo }>Remove</button>
            <button onClick={ setIsCompleted }>Set Complete</button>
        </div>
    </>
}

export default Todo