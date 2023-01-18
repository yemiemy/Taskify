import React, { useRef, useState } from 'react'
import { Todo } from '../models'
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdDone, MdClose, MdOutlineDoneAll } from "react-icons/md"
import { Draggable } from "react-beautiful-dnd"

type Props = {
    index: number
    todo: Todo
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[]
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({index, todo, todos, setTodos, completedTodos, setCompletedTodos}) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDone = (id: number) => {
        let add;
        
        add = todos.filter(todo => todo.id === id)[0]
        if (!add)
            add = completedTodos.filter(todo => todo.id === id)[0]
        
        handleDelete(id)
        
        if (add.isDone)
            setTodos([...todos, {...add, isDone:false}])
        else
            setCompletedTodos([...completedTodos, {...add, isDone:true}])
        
    }

    const handleDelete = (id: number) => {
        setTodos(
            todos.filter(
                todo => todo.id !== id
            )
        )
        setCompletedTodos(
            completedTodos.filter(
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

  return (
    <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
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
                            <button className='button__icon' type='submit' title='Submit'>
                                <MdDone />
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
                                    <AiFillEdit title='Edit task'/>
                                </span>
                            ):(
                                <></>
                            )
                        }

                        {
                            todo.isDone ? (
                                <span className='icon' onClick={
                                    () => handleDone(todo.id)
                                }>
                                    <MdClose title='Move to active'/>
                                </span>
                                
                            ) : (
                                !edit ? (
                                    <span className='icon' onClick={
                                        () => handleDone(todo.id)
                                    }>
                                        <MdOutlineDoneAll title='Move to completed' />
                                    </span>
                                ): (
                                    <></>
                                )
                            )
                        }
                        
                        <span className='icon' onClick={() => handleDelete(todo.id)}>
                            <AiFillDelete title='Delete todo'/>
                        </span>
                    </div>
                </form>
            )
        }
    </Draggable>
    
  )
}

export default SingleTodo