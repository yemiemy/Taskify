import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../models'
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdDone, MdClose } from "react-icons/md"
import { Draggable } from "react-beautiful-dnd"

type Props = {
    index: number
    todo: Todo
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({index, todo, todos, setTodos}) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)
    const inputRef = useRef<HTMLInputElement>(null)

    // const handlDone = (id: number | undefined) => {
    //     setTodos(
    //         todos.map(
    //             todo => todo.id === id ? {...todo, isDone:!todo.isDone } : todo
    //         )
    //     )
    // }

    const handlDelete = (id: number) => {
        setTodos(
            todos.filter(
                todo => todo.id !== id
            )
        )
    }

    const handleEdit = (e:React.FormEvent, id: number) => {
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
    <Draggable key={todo.id.toString()} draggableId={todo.id.toString()} index={index}>
        {
            (provided, snapshot) => (
                <form 
                    className={`todos__single ${snapshot.isDragging ? 'drag': ''}` }
                    onSubmit={(e) => handleEdit(e, todo.id)} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps} 
                    ref={provided.innerRef}
                >
                    {
                        edit ? (
                            <input 
                                ref={inputRef}
                                className='todos__single--text' 
                                type="text" value={editTodo} 
                                onChange={(e) => setEditTodo(e.target.value)} 
                            />
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
                        {
                            edit ? (
                            <button className='button__icon' type='submit'>
                                {
                                    todo.isDone ? (
                                        <MdClose />
                                    ) : (
                                        <MdDone />
                                    )
                                }
                                
                            </button>
                            ): (
                               <></> 
                            )
                        } 
                        {
                            !todo.isDone ? (
                                <span className='icon' onClick={
                                    () => {
                                        if(!edit && !todo.isDone){
                                            setEdit(!edit)
                                        } 
                                    }
                                }>
                                    <AiFillEdit />
                                </span>
                            ):(
                                <></>
                            )
                        } 
                        
                        <span className='icon' onClick={() => handlDelete(todo.id)}>
                            <AiFillDelete />
                        </span>
                    </div>
                </form>
            )
        }
    </Draggable>
    
  )
}

export default SingleTodo