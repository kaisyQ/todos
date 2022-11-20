import { collection, addDoc, query, getDocs,  deleteDoc, doc, updateDoc  } from "firebase/firestore"
import { getStorage, ref, uploadString, getDownloadURL, listAll } from "firebase/storage";
import { db } from "./app"

const TODOS_COLLECTION = 'todos'

class TodoApi {
    constructor () {
        this.collection = collection(db, TODOS_COLLECTION)
        this.db = db
    }

    getFolder = async () => {
        const storage = getStorage()
        const starsRef1 = ref(storage, 'dTViEwpvQrE591i0FX1n/')
        const all = await listAll(starsRef1)
        console.log(all.items[1].name)
        const starsRef = ref(storage, 'dTViEwpvQrE591i0FX1n/0');
        getDownloadURL(starsRef).then(url => console.log(url))
    }

    addTodo = async ({title, date, isCompleted, files}) => {
        try {
            const docRef = await addDoc(this.collection, { title, date, isCompleted })

            const uploadFiles = async (id) => {
                
                files.map(async (file, index) => {
                    const storage = getStorage()
                    const storageRef = ref(storage, `${docRef.id}/${index}`)
                    const snapshot = await uploadString(storageRef, file, 'data_url')
                    if (snapshot) {
                        console.log('Uploaded a data_url string!')
                    }
                })
            }

            await uploadFiles(docRef.id)
            return docRef.id
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