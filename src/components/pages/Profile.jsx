import { LogOut, Mail, MapPin, Phone, UserRoundKey } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Profile = () => {
  const API_URL = process.env.REACT_APP_API_URL;



  const [user, setUser] = useState({})
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const localStorageClear = () => {
    localStorage.clear()
  }

  const navigate = useNavigate()
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user"))

    console.log(userData);


    if (!userData) {
      navigate("/login")
      toast.error("please login first")
    }
    else {
      setUser(userData)
      setFormData(userData);
    }

  }, [navigate])

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/updateUser/${user._id}`,
        formData
      );

      localStorage.setItem("user", JSON.stringify(response.data.data));
      setUser(response.data.data);

      toast.success("Profile updated successfully");
      setIsEdit(false);

    } catch (error) {
      console.log(error);
      toast.error("Profile update failed");
    }
  };
  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-6">

      {/* Main Card */}
      <div className="w-full max-w-4xl bg-[#111111] rounded-3xl shadow-2xl overflow-hidden border border-yellow-500">

        {/* Top Section */}
        <div className="bg-yellow-500 h-40 relative">

          {/* Profile Image */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-20">
            <div className="w-36 h-36 rounded-full border-4 border-black overflow-hidden shadow-lg">
              <img
                src="https://i.pravatar.cc/300"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-24 pb-10 px-8">

          {/* Name */}
          <h1 className="text-4xl font-bold text-center text-yellow-500">
            {user.name}

          </h1>

          <p className="text-center text-gray-400 mt-2">
            Library Management User
          </p>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div className="bg-black border border-yellow-500 p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <UserRoundKey className="text-yellow-500" />
                <div>
                  <p className="text-gray-400 text-sm">{user.role}</p>
                </div>
              </div>
            </div>



            <div className="bg-black border border-yellow-500 p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <Mail className="text-yellow-500" />
                <div>
                  <p className="text-gray-400 text-sm">{user.email}</p>

                </div>
              </div>
            </div>

            <div className="bg-black border border-yellow-500 p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <Phone className="text-yellow-500" />
                <div>
                  <p className="text-gray-400 text-sm">{user.phone}</p>

                </div>
              </div>
            </div>

            <div className="bg-black border border-yellow-500 p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <MapPin className="text-yellow-500" />
                <div>
                  <p className="text-gray-400 text-sm">{user.gender}</p>

                </div>
              </div>
            </div>


          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-5 mt-10">

            <button
              onClick={() => setIsEdit(true)}
              className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition">
              Edit Profile
            </button>

            <button
              onClick={() => {
                localStorageClear()
                navigate("/")
                toast.error("Logout Successfully")

              }

              }
              className="border border-yellow-500 text-yellow-500 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-yellow-500 hover:text-black transition">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
      {isEdit && (
        <div className="mt-8 bg-black border border-yellow-500 p-6 rounded-2xl">

          <input
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            className="w-full mb-3 p-3 rounded bg-zinc-900 text-white"
          />

          <input
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            className="w-full mb-3 p-3 rounded bg-zinc-900 text-white"
          />

          <input
            value={formData.phone || ""}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Phone"
            className="w-full mb-3 p-3 rounded bg-zinc-900 text-white"
          />

          <input
            value={formData.gender || ""}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            placeholder="Gender"
            className="w-full mb-3 p-3 rounded bg-zinc-900 text-white"
          />

          <button
            onClick={handleUpdate}
            className="bg-yellow-500 text-black px-5 py-2 rounded font-bold"
          >
            Save
          </button>
        </div>
      )}
    </div>
  )
}

export default Profile
