import dayjs from "dayjs"
import { ALL, COMPLETED, NOT_COMPLETED, OUT_OF_DATE } from "./showParams"

export const todosWithParams = (todos, param) => {
    switch(param) {
        case ALL:
            return todos
        case COMPLETED:
            return todos.filter(todo => todo.isCompleted === true)
        case NOT_COMPLETED:
            return todos.filter(todo => todo.isCompleted === false)
        case OUT_OF_DATE: {
            return todos
        }
        default: 
            return todos
    }
}   