import react, { useState } from 'react'
import dayjs from 'dayjs'
import { addTodo as addTodoActionCreater } from '../../../state/todos-state'

const TodoCreater = ({ dispatch, todosLength }) => {
    
    const [ todoTitle, setTodoTitle ] = useState('')

    const addTodo = (ev) => {
        dispatch(addTodoActionCreater({
            id: todosLength,
            title: todoTitle,
            isCompleted: false,
            date: dayjs().format('YYYY-MM-DD')
        }))
    }

    return <>
        <div className='todo__creater'>
            <input value={ todoTitle } type="text" placeholder='Add your todo' onChange={(ev) => { setTodoTitle(ev.target.value) }}/>
            <button onClick={addTodo}>Create</button>
        </div>
    </>
}

export default TodoCreater