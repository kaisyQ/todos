import { collection, addDoc, query, getDocs,  deleteDoc, doc, updateDoc  } from "firebase/firestore"
import { getStorage, ref, uploadString, deleteObject, listAll, getDownloadURL  } from "firebase/storage";
import { db } from "./app"

const TODOS_COLLECTION = 'todos'

class TodoApi {
    constructor () {
        this.collection = collection(db, TODOS_COLLECTION)
        this.db = db 
    }

    getFolderFiles = async (id) => {
        
        const storage = getStorage()
        const folderRef = ref(storage, `${id}/`)
        
        const allFiles = await listAll(folderRef)

        const urls = Promise.all(allFiles.items.map(async (item, index) => {
            const fileRef = ref(storage, `${id}/${index}`)
            const url = await getDownloadURL(fileRef)
            return url
        }))

        return urls
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
            const storage = getStorage()
            const folderRef = ref(storage, `${id}/`)

            await deleteDoc(doc(this.db, TODOS_COLLECTION, id))
            const allFiles = await listAll(folderRef)

            Promise.all(allFiles.items.map(async (item, index) => {
                const fileRef = ref(storage, `${id}/${index}`)
                await deleteObject(fileRef)
            }))
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

    getTodos = async () => {
        try {
            const todosQuery = await query(this.collection)
            const todosDocs = await getDocs(todosQuery)

            const todosPromise = Promise.all(Array.from(todosDocs.docs).map(async (todo) => {
                const todoFiles = await this.getFolderFiles(todo.id)
                return { ...todo.data(), id: todo.id, files: todoFiles }
            }))
            const todos = await todosPromise
            return todos
        } catch (err) {
            console.error("Error taking from firebase documents: ", err)
        }
    }
}

export default new TodoApi()