import react from 'react'
import TodoCreater from './TodoCreater/TodoCreater'
import Todo from './Todo/Todo'
import { todosWithParams } from '../../state/todo-filter'

const Todos = ({ todos, dispatch, showParam }) => {
    return <>
        <TodoCreater dispatch={dispatch} todosLength={todos.length} />
        {
            todosWithParams(todos, showParam).map(todo => <Todo {...todo} dispatch={dispatch} key={todo.id} />) 
        }
    </>
}

export default Todos