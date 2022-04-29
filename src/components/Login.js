import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);

  const login = async () => {
    await axios.post('http://localhost:8000/login', {
      username: username,
      password: password,
    }).then((response) => {
      if (!response.data.logged) {
        setLoginStatus(false);
        const loginStatus = false
        localStorage.setItem("isAuth", loginStatus)
      } else {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("role", response.data.role)
        console.log(response.data)
        setLoginStatus(true)
        const loginStatus = true
        localStorage.setItem("isAuth", loginStatus)
      }
      // console.log("")
    })
  }

  function isAuthenticated() {
    return loginStatus
  }

  const userAuthenticated = async () => {
    await axios.get('http://localhost:8000/login/isUserAuth', {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response)
    })
  }
  return (
  <>
    <div>
      <h1>Login</h1>
      <input 
        type="text" 
        placeholder="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input 
        type="text" 
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={login}>Login</button>
    </div>

    <h1>{loginStatus && (
      <button onClick={userAuthenticated}> Check if Authenticated </button>
    )}</h1>
  </>
  )
}

export default Login