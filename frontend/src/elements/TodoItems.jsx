import React, { useEffect, useState } from 'react'
import '../CSS/TodoItems.css'
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import axios from 'axios'
import { Link } from 'react-router-dom';
const TodoItems = () => {
  const [todos,setTodos] = useState([])

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
  
  const deleteUser=async(userId)=>{
    await axios.delete(`http://localhost:4000/todo/delete/${userId}`)
    .then((response)=>{
      setTodos((prevUser)=>prevUser.filter((todo)=>todo._id!==userId))
      toast.success(response.data.message,{position:'top-right'})
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (  
    <div className='userTable'>
      <Link to={'/'} className='addButton'>Add Task</Link>
    <table border={1} cellPadding={15} cellSpacing={0}>
      <thead>
          <tr>
              <th>SI No:</th>
              <th>Todo List</th>
              <th>Actions</th>
          </tr>
      </thead>
      <tbody>
      {Array.isArray(todos) && todos.map((todo, index) => {
              return(
                <tr key={todo._id}>
                <td>{index+1}</td>
                <td>{todo.addyourtask}</td>
                <td className='actionButtons'>
                <button onClick={()=>{deleteUser(todo._id)}}><DeleteIcon/></button>
                </td>
            </tr>
              )
            })
            }
    
      </tbody>
    </table>
  </div>
  )
}

export default TodoItems
