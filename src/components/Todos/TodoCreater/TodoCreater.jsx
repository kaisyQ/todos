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
            setTodoFiles([])
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
            <input className='todo__creater__input' value={ todoTitle } type="text" placeholder='Add your todo' onChange={(ev) => { setTodoTitle(ev.target.value) }}/>
            <div className='input-file-wrapper'>
                <input className='todo__creater__input file-input' id='input__file' type="file" multiple="multiple" name="files[]" onChange={todoFileChange} />
                <label htmlFor="input__file" className="input__file-button btn">
                    <span className="input__file-button-text">Выберите файл</span>
                </label>
            </div>
            {
                todoFiles.map((todoFile, index)=> <img width={'100px'} height={'100px'} src={todoFile} key={index} />)
            }
            <button className='btn' onClick={addTodo}>Create</button>
        </div>
    </>
}

export default TodoCreater