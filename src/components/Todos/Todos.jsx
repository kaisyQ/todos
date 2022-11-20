import react from 'react'
import TodoCreater from './TodoCreater/TodoCreater'
import Todo from './Todo/Todo'
import { todosWithParams } from '../../state/todo-filter'
import api from '../../firebase/api'

const Todos = ({ todos, dispatch, showParam }) => {
    api.getFolder()
    return <>
        <TodoCreater dispatch={dispatch} />
        {
            todosWithParams(todos, showParam).map(todo => <Todo {...todo} dispatch={dispatch} key={todo.id} />) 
        }
    </>
}

export default Todos