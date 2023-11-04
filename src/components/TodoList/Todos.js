import React, { useEffect, useState } from 'react'
import { deleteTodoApi, retrieveAllTodosForUsername } from '../api/TodoApiService';
import { useAuth } from '../Security/AuthContext';
import { useNavigate } from 'react-router-dom';

function Todos() {

    // const today = new Date();
    // const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDate());


    const navigate = useNavigate();

    const [todos, setTodos] = useState([])
    const [message , setMessage] = useState(null);

    const authContext = useAuth();

    const username = authContext.username;

    function refreshAll(){
        retrieveAllTodosForUsername(username)
        .then(resp =>{
            console.log(resp);
            setTodos(resp.data)
        })
        .catch(err =>{
            console.log(err);
        })
    }

    useEffect (() =>  refreshAll() ,[])
    // const todos =[
    //     { id: 1, description:"Learn AWS", done:false, targetDate:targetDate},
    //     { id: 2, description:"Learn Kubernets" , done:false, targetDate:targetDate},
    //     { id: 3, description:"Learn DevOps" , done:false, targetDate:targetDate}
    // ]


    function deleteTodo(id) {
        deleteTodoApi(username ,id)
        .then(() =>{
                setMessage(`Delete todo of id = ${id}`);
                refreshAll();
            }
        )
        .catch(err =>{
            console.log(err);
        })
    }
    function handleNewTodoClick() {
        console.log("clicked");
        navigate(`/todos/update/-1`);
    }

    function updateTodo(id) {
        console.log(`clicked ${id}`);
        navigate(`/todos/update/${id}`);
    }

  return (
    <>
    <div>
        <h1>Your Todos</h1>
    </div>
    <div>{message}</div>
    <div>
        <table className='table'>
            <thead>
                <tr>
                    <td>Description</td>
                    <td>Is Done?</td>
                    <td>Target Date</td>
                    <td>Delete</td>
                    <td>Update</td>
                </tr>
            </thead>
            <tbody>
                {
                    todos.map((todo) =>(
                        <tr key = {todo.id}>
                            <td>{todo.description}</td>
                            <td>{todo.done.toString()}</td>
                            <td>{todo.targetDate.toString()}</td>
                            <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                            <td><button className="btn btn-warning" onClick={() => updateTodo(todo.id)}>Update</button></td>
                        </tr>
                    ))
}
            </tbody>
        </table>
        <div>
            <button onClick={handleNewTodoClick}>Add new Todo</button>
        </div>
    </div>
    </>
  )
}

export default Todos