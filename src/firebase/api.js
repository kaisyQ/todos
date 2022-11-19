import { collection, addDoc, query, getDocs,  deleteDoc, doc, updateDoc  } from "firebase/firestore"
import { db } from "./app"

const TODOS_COLLECTION = 'todos'

class TodoApi {
    constructor () {
        this.collection = collection(db, TODOS_COLLECTION)
        this.db = db
    }

    addTodo = async ({title , date, isCompleted}) => {
        try {
            const docRef = await addDoc(this.collection, { title, date, isCompleted })
            return docRef
        } catch (err) {
            console.error("Error adding document: ", err)
        }
    }
    removeTodo = async (id) => {
        try {
            await deleteDoc(doc(this.db, TODOS_COLLECTION, id))
        } catch (err) {
            console.error("Error removing document: ", err)
        }
    }
    updateTodo = async (id, value) => {
        try {
            const docLog = await updateDoc(doc(this.db, TODOS_COLLECTION, id), { isCompleted: value })
            return docLog
        } catch (err) {
            console.error("Error updating document: ", err)
        }
    }

    getTodos = async() => {
        try {
            const todosQuery = await query(this.collection)
            const todosDocs = await getDocs(todosQuery)
            const todos = []
            
            todosDocs.forEach((todo) => {
                todos.push({ ...todo.data(), id: todo.id })
            })
            return todos
        } catch (err) {
            console.error("Error taking from firebase documents: ", err)
        }
    }
}

export default new TodoApi()