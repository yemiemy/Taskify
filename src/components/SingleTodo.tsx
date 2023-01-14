import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../models'
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdDone, MdClose } from "react-icons/md"

type Props = {
    todo: Todo
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({todo, todos, setTodos}) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string|undefined>(todo.todo)
    const inputRef = useRef<HTMLInputElement>(null)

    const handlDone = (id: number | undefined) => {
        setTodos(
            todos.map(
                todo => todo.id === id ? {...todo, isDone:!todo.isDone } : todo
            )
        )
    }

    const handlDelete = (id: number | undefined) => {
        setTodos(
            todos.filter(
                todo => todo.id !== id
            )
        )
    }

    const handleEdit = (e:React.FormEvent, id: number | undefined) => {
        e.preventDefault()
        setTodos(
            todos.map(
                todo => todo.id === id ? {...todo, todo:editTodo} : todo
            )
        )
        setEdit(false)
    }
    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
        {
            edit ? (
                <div>
                    <input 
                        ref={inputRef}
                        className='todos__single--text' 
                        type="text" value={editTodo} 
                        onChange={(e) => setEditTodo(e.target.value)} 
                    />
                </div>
            ) : (
                todo.isDone ? (
                    <s className='todos__single--text'>
                        {todo.todo}
                    </s>
                ) : (
                    <span className='todos__single--text'>
                        {todo.todo}
                    </span>
                )
            )
        }
        
        <div>
            <span className='icon' onClick={
                () => {
                    if(!edit && !todo.isDone){
                        setEdit(!edit)
                    } 
                }
            }>
                <AiFillEdit />
            </span>
            <span className='icon' onClick={() => handlDelete(todo.id)}>
                <AiFillDelete />
            </span>
            <span className='icon' onClick={() => handlDone(todo.id)}>
                {
                    todo.isDone ? (
                        <MdClose />
                    ) : (
                        <MdDone />
                    )
                }
                
            </span>
        </div>
    </form>
  )
}

export default SingleTodo