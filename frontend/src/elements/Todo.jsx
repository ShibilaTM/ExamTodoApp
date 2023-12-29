import React, { useState } from 'react'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import '../CSS/Todo.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';


const Todo = () => {
    const [add,setAdd] = useState({
        addyourtask:''
      })
      const navigate = useNavigate()
      const inputHandler=(e)=>{
        setAdd({...add,
          [e.target.name]:e.target.value
        })
      }
    
      const addHandler=async(e)=>{
        e.preventDefault()
        await axios.post('http://localhost:4000/todo/add',add)
        .then((response)=>{
          console.log(response)
          toast.success(response.data.message,{position:'top-right'})
          navigate('/todo')
        })
        .catch((error)=>console.log(error))
        
      }
    return (
        <div className='todo'>
          <div className="todo-header">
            Todo List
          </div>
          <div className="todo-add">
            <input type='text' placeholder='Add your task' name='addyourtask' onChange={inputHandler} className='todo-input'/>
            <div className='todo-add-btn' onClick={addHandler}><LibraryAddIcon/></div>
          </div>
          <Link to={'/todo'} className='addButton'>Todo List</Link>
       
        </div>
      );
            }      
export default Todo
