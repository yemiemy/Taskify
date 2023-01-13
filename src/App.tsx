import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './models';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Array<Todo>>([])


  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo){
      setTodos([...todos, {id: Date.now(), todo, isDone: false}])
      setTodo("")
    }
  }
  console.log(todos);
  
  return (
    <div className="App">
      <span className='heading'>Tasklify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
    </div>
  );
}

export default App;
