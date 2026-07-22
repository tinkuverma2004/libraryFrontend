import React from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Navbar = () => {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")

    toast.success("Logout Successfully")
    navigate("/login")
  }

  // 1. Not Logged In Navbar
  if (!user) {
    return (
      <div className="bg-black px-10 py-4 border-b border-yellow-500">
        <div className="flex justify-between items-center">
          <h1
            onClick={() => navigate("/")}
            className="text-3xl font-bold text-yellow-400 cursor-pointer"
          >
            Library
          </h1>

          <div className="flex gap-8 text-white font-semibold">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/bookDetails")}>Books</button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="bg-yellow-500 px-5 py-2 rounded-xl font-bold"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-cyan-500 px-5 py-2 rounded-xl font-bold text-white"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 2. Admin Navbar
  if (user.role === "admin") {
    return (
      <div className="bg-black border-b border-yellow-500 px-8 py-4">
        <div className="flex justify-between items-center">
          <h1
          onClick={()=> navigate("/admin")}
            
            className="text-3xl font-bold text-yellow-400 cursor-pointer"
          >
            Library Admin
          </h1>

          <div className="flex gap-8 text-white font-semibold">
            <button  className="text-xl font-semibold text-cyan-400 cursor-pointer" onClick={() => navigate("/profile")}>Profile</button>
            <button onClick={() => navigate("/add-book")}>Add Book</button>
            <button onClick={() => navigate("/fine-history")}>Fine History</button>
          
           
            <button onClick={() => navigate("/users")}>Users</button>
            <button onClick={() => navigate("/requests")}>Requests</button>
            

          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-5 py-2 rounded-xl font-bold text-white"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  // 3. User Navbar
  return (
    <div className="bg-black px-10 py-4 shadow-lg border-b border-yellow-500">
      <div className="flex items-center justify-between">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-yellow-400 cursor-pointer"
        >
          Library
        </h1>

        <div className="flex items-center gap-10">
          <h1
            onClick={() => navigate("/bookDetails")}
            className="text-xl font-semibold text-cyan-400 cursor-pointer"
          >
            Book
          </h1>

          <h1
            onClick={() => navigate("/mybooks")}
            className="text-xl font-semibold text-pink-400 cursor-pointer"
          >
            MyBooks
          </h1>

          <h1
            onClick={() => navigate("/profile")}
            className="text-xl font-semibold text-cyan-400 cursor-pointer"
          >
            Profile
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-400 px-5 py-2 rounded-xl font-bold text-white"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar