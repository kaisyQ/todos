import react from 'react'
import TodoCreater from './TodoCreater/TodoCreater'
import Todo from './Todo/Todo'
import { todosWithParams } from '../../state/todo-filter'

const Todos = ({ todos, dispatch, showParam }) => {
    return <>
        <main className='main'>
            <TodoCreater dispatch={dispatch} />
            <div className='todos'>
            {
                todosWithParams(todos, showParam).map(todo => <Todo {...todo} dispatch={dispatch} key={todo.id} />) 
            }
            </div>
        </main>
    </>
}

export default Todos