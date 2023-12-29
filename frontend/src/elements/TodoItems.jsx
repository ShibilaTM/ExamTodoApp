// import React, { useEffect, useState } from 'react'
// import '../CSS/TodoItems.css'
// import DeleteIcon from '@mui/icons-material/Delete';
// import toast from 'react-hot-toast';
// import axios from 'axios'
// import { Link } from 'react-router-dom';
// const TodoItems = () => {
//   const [todos,setTodos] = useState([])

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get('http://localhost:4000/todo/getall');
//           setTodos(response.data);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       };
    
//       fetchData();
//     }, []);
  
//   const deleteUser=async(userId)=>{
//     await axios.delete(`http://localhost:4000/todo/delete/${userId}`)
//     .then((response)=>{
//       setTodos((prevUser)=>prevUser.filter((todo)=>todo._id!==userId))
//       toast.success(response.data.message,{position:'top-right'})
//     }).catch((error)=>{
//       console.log(error)
//     })
//   }
//   return (  
//     <div className='userTable'>
//       <Link to={'/'} className='addButton'>Add Task</Link>
//     <table border={1} cellPadding={15} cellSpacing={0}>
//       <thead>
//           <tr>
//               <th>SI No:</th>
//               <th>Todo List</th>
//               <th>Actions</th>
//           </tr>
//       </thead>
//       <tbody>
//       {Array.isArray(todos) && todos.map((todo, index) => {
//               return(
//                 <tr key={todo._id}>
//                 <td>{index+1}</td>
//                 <td>{todo.addyourtask}</td>
//                 <td className='actionButtons'>
//                 <button onClick={()=>{deleteUser(todo._id)}}><DeleteIcon/></button>
//                 </td>
//             </tr>
//               )
//             })
//             }
    
//       </tbody>
//     </table>
//   </div>
//   )
// }

// export default TodoItems

import React, { useEffect, useState } from 'react';
import '../CSS/TodoItems.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TodoItems = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/todo/getall');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updateUser = async (userId, completed) => {
    await axios
      .put(`http://localhost:4000/todo/update/${userId}`, { completed })
      .then((response) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === userId ? { ...todo, completed } : todo
          )
        );
        toast.success(response.data.message, { position: 'top-right' });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:4000/todo/delete/${userId}`)
      .then((response) => {
        setTodos((prevUser) =>
          prevUser.filter((todo) => todo._id !== userId)
        );
        toast.success(response.data.message, { position: 'top-right' });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'incomplete') {
      return !todo.completed;
    }
    return true;
  });

  return (
    <div className='userTable'>
      <Link to={'/'} className='addButton'>
        Add Task
      </Link>
      <div className='filterButtons'>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      <table border={1} cellPadding={15} cellSpacing={0}>
        <thead>
          <tr>
            <th>SI No:</th>
            <th>Todo List</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredTodos) &&
            filteredTodos.map((todo, index) => {
              return (
                <tr key={todo._id}>
                  <td>{index + 1}</td>
                  <td>
                    {todo.completed ? (
                      <del>{todo.addyourtask}</del>
                    ) : (
                      todo.addyourtask
                    )}
                  </td>
                  <td className='actionButtons'>
                    <Checkbox
                      checked={todo.completed}
                      onChange={(e) =>
                        updateUser(todo._id, e.target.checked)
                      }
                    />
                    <button onClick={() => deleteUser(todo._id)}>
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TodoItems;


