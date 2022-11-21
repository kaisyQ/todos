import react from 'react'
import { removeTodo as removeTodoActionCreater } from '../../../state/todos-state'
import { setIsCompleted as setIsCompletedActionCreater } from '../../../state/todos-state'
import TodosApi from '../../../firebase/api'
import dayjs from 'dayjs'

const Todo = ({ title, date, id, files, dispatch }) => {

    const redClass = dayjs().diff(dayjs(date), 'day') >= 7 ? "red-color__date" : ""
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
            <div className='todo__about'>
                <div className='todo__title'>
                    <div className='todo__item__head'>title</div>
                    { title }
                </div>
                <div className={`todo__date ${redClass}`}>
                    <div className={`todo__item__head`}>date</div> 
                    { date }
                </div>
                <div className='todo__files'>
                {
                    files.map((fileUrl, index) => <>
                            <div className='todo__file'>
                                <a className='todo__file__link' key={index} href={fileUrl} download>
                                    <img className='todo__file__image' src={fileUrl} alt={""}/>
                                    <span>file {index + 1}</span>
                                </a>
                            </div>
                        </>
                    )               
                }
                </div>
            </div>
            <button className='btn' onClick={ removeTodo }>Remove</button>
            <button className='btn' onClick={ setIsCompleted }>Set Complete</button>
        </div>
    </>
}

export default Todo