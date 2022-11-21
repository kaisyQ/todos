import react from 'react'
import { removeTodo as removeTodoActionCreater } from '../../../state/todos-state'
import { setIsCompleted as setIsCompletedActionCreater } from '../../../state/todos-state'
import TodosApi from '../../../firebase/api'

const Todo = ({ title, date, id, files, dispatch }) => {
    const removeTodo = (ev) => {
        TodosApi.removeTodo(id)
        dispatch(removeTodoActionCreater({
            id: id
        }))
    }

    const setIsCompleted = (ev) => {
        TodosApi.updateTodo(id, true)
        dispatch(setIsCompletedActionCreater({
            id: id
        }))
    }

    return <> 
        <div className='todo'>
            <div>
                <div className='todo__title'>{ title }</div>
                <div className='todo__date'>{ date }</div>
                <div className='todo__files'>
                    <div className='todo__file'>
                    {
                        files.map((fileUrl, index) => <a key={index} href={fileUrl} download>File 1</a>)               
                    }
                    </div>
                </div>
            </div>
            <button onClick={ removeTodo }>Remove</button>
            <button onClick={ setIsCompleted }>Set Complete</button>
        </div>
    </>
}

export default Todo