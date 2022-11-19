import { collection, addDoc } from "firebase/firestore"
import { db } from "./app"

const TODOS_COLLECTION = 'todos'

class TodoApi {
    constructor () {
        this.collection = collection(db, TODOS_COLLECTION)
    }

    addTodo = async ({title , date, isCompleted}) => {
        try {
            const docRef = await addDoc(this.collection, { title, date, isCompleted })
        } catch (err) {
            console.error("Error adding document: ", err)
        }
    }
    removeTodo = async () => {
        try {
    
    
        } catch (err) {
            console.error("Error removing document: ", err)
        }
    }
}

export default new TodoApi()