import React, {  useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'
import { useAuth } from '../Security/AuthContext';
// import {  useAuth } from '../Security/AuthContext';

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    // const [message, setMessage] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);

    const authContext = useAuth();

    const handleUsernameChange = (e) =>{
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) =>{
        setPassword(e.target.value);
    }

    const handleLoginClick = async(e) =>{
        e.preventDefault();
        if(await authContext.login(username,password)){
            navigate(`/welcome/${username}`)
        }
        else{
            setErrorMsg(true);
        }
    }

  return (
    <div className={`${styles.mainConatiner}`}>

        <h1>Login here...</h1>
        {/* {message && <div>Logged in successfully</div>} */}
        {errorMsg && <div>Not authenticated!!!</div>}
        <form method='POST'>
            <label>Username:</label>
            <input type="text" name="username" placeholder="Enter your name...." value={username} onChange={handleUsernameChange}/>

            <label>Password:</label>
            <input type="password" name="password" placeholder="Enter your password...." value={password} onChange={handlePasswordChange}/>

            <button type="submit" onClick={handleLoginClick}>Login</button>
        </form>
    </div>
  )
}

export default Login