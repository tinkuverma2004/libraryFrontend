import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Requests = () => {
     const navigate = useNavigate()
    useEffect( ()=>{
         let user = JSON.parse(localStorage.getItem("user"))
         console.log(user)
    
         if(!user || user.role !=="admin"){
        
    navigate("/")
    toast.error("only admin can access")
         }
      
        })
  return (
    <div>
      Requests
    </div>
  )
}

export default Requests
