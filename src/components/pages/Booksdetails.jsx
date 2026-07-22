import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify';

const Booksdetails = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate()
  const [allbooks, setAllBooks] = useState([])
  
 

  useEffect(() => {
    async function getUser() {
      try {
        let user = JSON.parse(localStorage.getItem('user'))
        let token = user.token
        const response = await fetch(`${API_URL}/availablebooks`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        )
        console.log(response)
        let data = await response.json()
        setAllBooks(data.data)
        console.log(data.data)
      }
      catch (err) {
        console.log(err)

      }
    }
    getUser()

  }, []);
  return (
    <div>
      <div className="bg-[#f5f5f7] min-h-screen p-6 flex gap-6">
        <div className="w-[300px] h-[300px] bg-white rounded-xl p-5 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between cursor-pointer">
              <select className="w-full p-2  rounded-lg outline-none focus:ring-2 focus:ring-indigo-400">
                <option>Fiction</option>
                <option>Romance</option>
                <option>Thriller</option>
                <option>Mystery</option>
              </select>
            </div>



          </div>
        </div>
        <div className='flex flex-col border border-black rounded-xl justify-center items-center w-[93%]'>
          <div className="flex-1 border border-gray-700 w-[98%] p-6 bg-white">
            <h1 className="text-3xl font-bold mb-2 hover:text-purple-600 hover:scale-[1.01] transition duration-500"> Recently Added Books </h1>
            <p className="text-gray-500 mb-6">The books that recently added that show in here.</p>
            <div className="flex gap-6 flex-wrap justify-center">
              {allbooks
                .filter((item) => item.status === "available")
                .map((items) => (
                  <div className="w-[320px] h-[450px] bg-white border-2 border-yellow-400 rounded-xl p-4 shadow-md shadow-md hover:shadow-[0_10px_25px_rgba(255,215,0,0.4)] hover:scale-[1.1] transition duration-500">
                    <img src={items.image} className="w-full h-[230px]  object-cover rounded-lg mb-3 hover:scale-[1.06] transition duration-500 " alt="" onClick={() => navigate(`/books/${items.id}`)} />
                    <div className='flex gap-2'>
                      <h3 className="text-center font-medium mb-4"><span className='text-indigo-600'>title:</span>{items.title} </h3>
                      <h3 className="text-center font-medium mb-4"> <span className='text-indigo-600'>Author:</span>{items.author} </h3>
                    </div>
                    <p><span className='text-indigo-600'>discription:</span>{items.description}</p>
                    <h2><span className='text-indigo-600'>Price:</span>Rs {items.price}</h2>
                    <h2><span className='text-indigo-600 mb-2'>Category:</span>{items.category}</h2>
                    <div className="flex gap-3 mt-2">
                      <button

                        
                        className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:scale-105 transition"> Read only </button>
                      <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:scale-105 transition">Add to Cart </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <button className="text-center w-[130px] h-[45px] p-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 mt-2 mb-2" onClick={() => navigate('/Allbooks')}>View more</button>
        </div>
      </div>
    </div>
  )
}

export default Booksdetails