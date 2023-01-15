import React from 'react'
import { Todo } from '../models'
import SingleTodo from './SingleTodo'
import { Droppable } from 'react-beautiful-dnd';

interface Props {
    todos: Array<Todo>
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[]
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos}) => {
  return (
    <div className='container'>
        <Droppable droppableId='TodosList'>
            {
                (provided, snapshot) => (
                    <div className={`todos ${snapshot.isDraggingOver? 'dragactive' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">Active Tasks</span>
                        {
                            todos.length > 0 ?
                            todos.map((todo, index) => (                                
                                <SingleTodo index={index} todo={todo} todos={todos} setTodos={setTodos}/>)
                                    
                            )
                            :
                            "No active todos added yet."
                        }
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
        
        <Droppable droppableId='TodosRemove'>
            {
                (provided, snapshot) => (
                    <div className={`todos remove ${snapshot.isDraggingOver? 'dragcomplete' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className="todos__heading">Completed Tasks</span>
                        {
                            completedTodos.length > 0 ?
                            completedTodos.map((todo, index) => (
                                <SingleTodo index={index} todo={todo} todos={completedTodos} setTodos={setCompletedTodos}/>)
                            )
                            :
                            "No completed todos added yet."
                        }
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
        
    </div>
  )
}

export default TodoList