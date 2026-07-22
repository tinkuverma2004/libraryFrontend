import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  

   const  navigate = useNavigate()

    const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    const loginData = {
      email,
      password
    }

    try {

      let response = await axios.post(`${API_URL}/user/login`, loginData)
      console.log(response)
      // const user= response.data.data.result
      // console.log(user);
      
      

      if (response.data === "wrong password"){
        return  toast.error("wrong password")
      }
      else if( response.data === "user not found"){
       return  toast.error("user not found")

      }
      else{
      toast.success("login successfully")
      }

      

       let data = JSON.stringify(response.data.data.result)

      
      localStorage.setItem("user",data)

      localStorage.setItem("token", response.data.data.token)



      setEmail("")
      setPassword("")
      navigate("/")

    } catch (error) {

      console.log(error)

    }
  }
  
  return (
    <div>
       <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

            <div className="bg-zinc-900 p-8 rounded-2xl w-[400px] border border-yellow-500">

              {/* Close */}
              <button
                onClick={() => navigate("/")}
                className="text-white float-right text-2xl"
              >
                ×
              </button>

              <h1 className="text-3xl text-yellow-400 font-bold mb-6 text-center">
                Login
              </h1>

              {/* Form */}
              <form
                onSubmit={handleLogin}
                className="space-y-5"
              >

                {/* Email */}
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-black border border-yellow-500/40 text-white"
                />

                {/* Password */}
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl bg-black border border-yellow-500/40 text-white"
                />

                {/* Submit */}
                <button
               
                  type="submit"
                  className="w-full bg-yellow-500 py-3 rounded-xl text-black font-bold"
                >
                  Login
                </button>

              </form>
              {/* Footer */}
              <p className="text-center text-gray-400 mt-6">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    navigate('/register')
                    
                  }}
                  className="text-yellow-400 cursor-pointer hover:underline">
                  Register
                </button>
              </p>
            </div>

          </div>
        
    </div>
  )
}

export default Login