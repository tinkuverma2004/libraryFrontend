import axios from 'axios'
import { X } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
 

const Form = () => {
  const API_URL = process.env.REACT_APP_API_URL;

   const navigate = useNavigate()

   

    const [name, setName] = useState("")
    const [age , setAge] = useState("")
    const [email , setEmail] = useState("")
    const [phone , setPhone] = useState("")
    const [password , setPassword] = useState("")
    const [gender , setGender] = useState("")
    const [role , setRole] = useState("")

const userData = {
    name,
    age,
    email,
    phone,
    password,
    gender,
    role
}


  
const handleSubmit = async(e)=>{
    e.preventDefault()

     try{

      const response = await axios.post(`${API_URL}/addUser`,userData);

      console.log(response.data);
      if(response.data === "already exist"){
        toast.error("This user is already exist")
      }
      else{
        toast.success("Add user successfully")
      }
      
      setName("");
      setAge("");
      setEmail("");
      setPhone("");
      setPassword("");
      setGender("");
      setRole("")

    }catch(error){
    console.log(error);
    }
  };




  return (
    <div>

    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center px-4 py-10">

      <div className="relative w-full max-w-2xl bg-white/5 border border-gray-800 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 text-white">

        {/* Cross Button */}
        <button
        
         onClick={()=>navigate('/')}
          className="absolute top-5 right-5 bg-red-500 hover:bg-red-600 p-2 rounded-full transition-all"
        >
          <X size={20} />
        </button>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-yellow-400 mb-3">
            Registration Form 
          </h1>

          <p className="text-gray-400 text-base">
            Fill all user information carefully
          </p>
        </div>
 <form className="space-y-5">

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Full Name
            </label>

            <input
            value={name}
             onChange={(e) => setName(e.target.value)} 
              type="text"
              placeholder="Enter full name"
              className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-700 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 transition-all"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Age
            </label>

            <input
              value={age}
             onChange={(e) => setAge(e.target.value)} 
              type="number"
              placeholder="Enter age"
              className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-700 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 transition-all"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Email Address
            </label>

            <input
              value={email}
             onChange={(e) => setEmail(e.target.value)} 
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-700 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 transition-all"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Phone Number
            </label>

            <input
              value={phone}
             onChange={(e) => setPhone(e.target.value)} 
              type="number"
              placeholder="Enter phone number"
              className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-700 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 transition-all"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Gender
            </label>

            <select 
              value={gender}
             onChange={(e) => setGender(e.target.value)} 
             className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-700 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 transition-all">
              <option value={""} className="text-black">Select Gender</option>
              <option value={"Male"} className="text-black">Male</option>
              <option value={"Female"} className="text-black">Female</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Password
            </label>

            <input
              value={password}
             onChange={(e) => setPassword(e.target.value)} 
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-700 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 transition-all"
            />
          </div>
           <div>
            <label className="block mb-2 text-sm text-gray-300">
              Role
            </label>

            <input
            value={role}
             onChange={(e) => setRole(e.target.value)} 
              type="text"
              placeholder="roll"
              className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-gray-700 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 transition-all"
            />
          </div>

          <button
          onClick={handleSubmit}
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg"
          >
            Submit Details
          </button>

        </form>
      </div>
    </div>

    </div>
  )
}

export default Form
