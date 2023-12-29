import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Todo from './elements/Todo';
import TodoItems from './elements/TodoItems';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Todo/>} />
        <Route path='/todo' element={<TodoItems/>}/>
      </Routes>

    </div>
  );
}

export default App;
