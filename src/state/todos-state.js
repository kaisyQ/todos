const ADD_TODO = 'APP_ADD_TODO'
const REMOVE_TODO = 'APP_REMOVE_TODO'
const SET_ISCOMPLETED = 'APP_SET_ISCOMPLETED'
const SET_TODOS = 'APP_SET_TODOS'

export const initialState = {
    todos: []
}

export const addTodo = (payload) => ({
    type: ADD_TODO,
    payload: payload
})

export const removeTodo = (payload) => ({
    type: REMOVE_TODO,
    payload: payload
})

export const setIsCompleted = (payload) => ({
    type: SET_ISCOMPLETED,
    payload: payload
})

export const setTodos = (payload) => ({
    type: SET_TODOS,
    payload: payload
})

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
        return {
            ...state, 
            todos: [...state.todos, action.payload]
        }
    case REMOVE_TODO:
        return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== action.payload.id)
        }
    case SET_ISCOMPLETED: 
        return {
            ...state,
            todos: state.todos.map(todo => {
                if (todo.id === action.payload.id) return {...todo, isCompleted: true}
                return todo
            })
        }
    case SET_TODOS:
        return {
            ...state,
            todos: [...action.payload]
        }
    default:
      throw new Error()
  }
}