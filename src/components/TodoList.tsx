import React from 'react'
import { Todo } from '../models'
import SingleTodo from './SingleTodo'

interface Props {
    todos: Array<Todo>
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({ todos, setTodos}) => {
  return (
    <div className='todos'>
        {
            todos.length > 0 ?
            todos.map(
                todo => <SingleTodo todo={todo} todos={todos} setTodos={setTodos}/>
            )
            :
            "No Todos added yet."
        }
    </div>
  )
}

export default TodoList