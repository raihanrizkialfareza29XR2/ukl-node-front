import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const history = useNavigate()
    useEffect(() => {
        logout()
    })
    const logout = () => {
        localStorage.removeItem('role')
        localStorage.removeItem('token')
        localStorage.removeItem('isAuth')
        history('/login')
    }
  return (
    <div></div>
  )
}

export default Logout