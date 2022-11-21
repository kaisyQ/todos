import { ALL, COMPLETED, NOT_COMPLETED } from "./showParams"

export const todosWithParams = (todos, param) => {
    switch(param) {
        case ALL:
            return todos
        case COMPLETED:
            return todos.filter(todo => todo.isCompleted === true)
        case NOT_COMPLETED:
            return todos.filter(todo => todo.isCompleted === false)
        default: 
            return todos
    }
}   