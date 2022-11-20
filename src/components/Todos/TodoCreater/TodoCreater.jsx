import react, { useState } from 'react'
import dayjs from 'dayjs'
import TodosApi from '../../../firebase/api'
import { addTodo as addTodoActionCreater } from '../../../state/todos-state'

const TodoCreater = ({ dispatch }) => {
    
    const [ todoTitle, setTodoTitle ] = useState('')
    const [ todoFiles, setTodoFiles ] = useState([])
    
    const addTodo = async (ev) => {
        if (todoTitle) {
            const todoLog = await TodosApi.addTodo({
                title: todoTitle,
                isCompleted: false,
                date: dayjs().add(7, 'day').format('YYYY-MM-DD'),
                files: todoFiles
            })
            dispatch(addTodoActionCreater({
                id: todoLog,
                title: todoTitle,
                isCompleted: false,
                date: dayjs().add(7, 'day').format('YYYY-MM-DD'),
                files: todoFiles
            }))

            setTodoTitle('')
        }
    }
    const todoFileChange = (ev) => {
        Array.from(ev.target.files).map(file => {
            const reader = new FileReader()
            reader.onload = (ev) => {
                setTodoFiles((prevTodoFiles) => {
                    return [...prevTodoFiles, ev.target.result]
                })
            }
            reader.readAsDataURL(file)
        }) 
    }

    return <>
        <div className='todo__creater'>
            <input value={ todoTitle } type="text" placeholder='Add your todo' onChange={(ev) => { setTodoTitle(ev.target.value) }}/>
            <input type="file" multiple="multiple" name="files[]" onChange={todoFileChange} />
            {
                todoFiles.map((todoFile, index)=> <img width={'100px'} height={'100px'} src={todoFile} key={index} />)
            }
            <button onClick={addTodo}>Create</button>
        </div>
    </>
}

export default TodoCreater