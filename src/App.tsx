import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './models';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Array<Todo>>([])
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo){
      setTodos([...todos, {id: Date.now(), todo, isDone: false}])
      setTodo("")
    }
  }
  
  const OnDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    let add, 
      active = todos, 
      complete = completedTodos

    if (source.droppableId === 'TodosList'){
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }
    
    if (destination.droppableId === 'TodosRemove'){
      complete.splice(destination.index, 0, {...add, isDone:true})
    } else {
      active.splice(destination.index, 0, {...add, isDone:false})
    }

    setCompletedTodos(complete)
    setTodos(active)
  }

  return (
    <DragDropContext onDragEnd={(result) => {OnDragEnd(result)}}>
      <div className="App">
        <span className='heading'>Tasklify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos} 
          completedTodos={completedTodos} 
          setCompletedTodos={setCompletedTodos} 
          setTodos={setTodos}
          />
      </div>
    </DragDropContext>
    
  );
}

export default App;
