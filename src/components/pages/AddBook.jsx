import { Pen, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddBook = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate()
    const [status, setStatus] = useState("available")
    const [editId, setEditId] = useState(null)
    const [books, setBooks] = useState([])
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [author, setAuthorName] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImg] = useState("")
    const [type, setType] = useState('recent')
    const [loader, setLoader] = useState(false)
    const [showForm, setShowForm] = useState(false)
  

    console.log(books)

    const handler = () => {

         if (!image) {
    toast.error("Please select image");
    return;
  }
        const formData = new FormData()
        formData.append("id" , Date.now());
        formData.append("title", title);
        formData.append("author", author)
        formData.append("category" , category)
        formData.append("description" , description)
        formData.append("price", price)
        formData.append("type", type)
        formData.append("status" , status)
        formData.append("image" , image)

        
        // let book = {
        //     id: Date.now(),
        //     title,
        //     author,
        //     category,
        //     description,
        //     image,
        //     price,
        //     type: type,
        //     status

        // }


        async function addBooks() {
            try {
                let respoonse = await fetch(`${API_URL}/addbook`, {
                    method: "POST",
                   
                    body: formData
                })
                let responseData = await respoonse.json()
                console.log(responseData)
                setBooks([...books, responseData.data])
                setShowForm(false);
                toast.success("Book added Successfully")
            }
            catch (err) {
                console.log(err)
                toast.error("error")

            }

        }
        addBooks()
        setTitle("")
        setImg(null)
        setCategory("")
        setDescription("")
        setPrice("")
        setAuthorName("")
    }

    useEffect(() => {
        setLoader(true)
        setTimeout(() => {
            async function getUser() {
                try {
                    const response = await fetch(`${API_URL}/getbooks`)
                    console.log(response)
                    let data = await response.json()
                    setBooks(data.data)
                    console.log(data.data)
                }
                catch (err) {
                    console.log(err)

                }
            }
            getUser()
            setLoader(false)
        }, 2000);
    }, []);


    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"))
        console.log(user)

        if (!user || user.role !== "admin") {

            navigate("/")
            toast.error("only admin can access")
        }

    },[navigate])

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/deletebook/${id}`, {
                method: "DELETE"
            })

            const data = await response.json()
            console.log(data)

            if (data.success) {
                toast.success("Book deleted successfully")


                setBooks(books.filter((item) => item._id !== id))
            }
        } catch (err) {
            console.log(err)
            toast.error("Book delete nahi hui")
        }
    }


    const handleEdit = (item) => {
        setEditId(item._id)
        setShowForm(true)

        setTitle(item.title)
        setAuthorName(item.author)
        setCategory(item.category)
        setDescription(item.description)
        setImg(item.image)
        setPrice(item.price)
        setType(item.type)
    }


    const handleUpdate = async () => {
        const updatedBook = {
            title,
            author,
            category,
            description,
            image,
            price,
            type
        }

        const response = await fetch(`${API_URL}/updatebook/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedBook)
        })

        const data = await response.json()

        if (data.success) {
            toast.success("Book updated successfully")

            setBooks(
                books.map((item) =>
                    item._id === editId ? data.data : item
                )
            )

            setEditId(null)
            setShowForm(false)
        }
    }
   return (
  <div className="min-h-screen bg-[#0B0B0B] text-white p-6">
    {/* Header */}
    <div className="flex justify-between items-center mb-8 bg-[#151515] border border-yellow-500/30 rounded-2xl p-6 shadow-lg">
      <div>
        <h1 className="text-3xl font-bold text-yellow-400">
          Library Admin Panel
        </h1>
        <p className="text-gray-400 mt-1">Manage your library books</p>
      </div>

      <button
        onClick={() => {
          setEditId(null);
          setTitle("");
          setAuthorName("");
          setCategory("");
          setDescription("");
          setPrice("");
          setImg(null);
          setType("recent");
          setStatus("available");
          setShowForm(true);
        }}
        className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
      >
        + Add Book
      </button>
    </div>

    {/* Form Modal */}
{showForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
    <div className="w-full max-w-[650px] max-h-[88vh] overflow-y-auto scrollbar-hide rounded-2xl bg-[#121212] border border-yellow-500/40 shadow-2xl">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#121212] border-b border-yellow-500/30 px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">
            {editId ? "Update Book" : "Add New Book"}
          </h2>
          <p className="text-sm text-gray-400">
            Fill book details carefully
          </p>
        </div>

        <button
          onClick={() => setShowForm(false)}
          className="h-9 w-9 rounded-full bg-red-500/10 text-red-400 text-2xl hover:bg-red-500 hover:text-white"
        >
          ×
        </button>
      </div>

      {/* Form Body */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book Name"
          className="md:col-span-2 bg-[#1e1e1e] border border-gray-700 text-white p-3 rounded-xl outline-none focus:border-yellow-400"
        />

        <input
          value={author}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Author Name"
          className="bg-[#1e1e1e] border border-gray-700 text-white p-3 rounded-xl outline-none focus:border-yellow-400"
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="bg-[#1e1e1e] border border-gray-700 text-white p-3 rounded-xl outline-none focus:border-yellow-400"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="bg-[#1e1e1e] border border-gray-700 text-white p-3 rounded-xl outline-none focus:border-yellow-400"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-[#1e1e1e] border border-gray-700 text-white p-3 rounded-xl outline-none focus:border-yellow-400"
        >
          <option value="recent">Recent</option>
          <option value="recommended">Recommended</option>
          <option value="featured">Featured</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-[#1e1e1e] border border-gray-700 text-white p-3 rounded-xl outline-none focus:border-yellow-400"
        >
          <option value="available">Available</option>
          <option value="borrowed">Borrowed</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
          className="bg-[#1e1e1e] border border-yellow-500/50 text-gray-300 p-3 rounded-xl file:bg-yellow-500 file:text-black file:border-0 file:px-4 file:py-2 file:rounded-lg file:font-bold"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Book Description"
          rows={3}
          className="md:col-span-2 bg-[#1e1e1e] border border-gray-700 text-white p-3 rounded-xl outline-none focus:border-yellow-400 resize-none"
        />
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-[#121212] border-t border-yellow-500/30 px-6 py-4 flex gap-4">
        <button
          onClick={() => setShowForm(false)}
          className="w-1/2 bg-gray-700 text-white py-3 rounded-xl font-bold hover:bg-gray-600"
        >
          Cancel
        </button>

        <button
          onClick={editId ? handleUpdate : handler}
          className="w-1/2 bg-yellow-500 text-black py-3 rounded-xl font-bold hover:bg-yellow-400"
        >
          {editId ? "Update Book" : "Add Book"}
        </button>
      </div>
    </div>
  </div>
)}

    {/* Table */}
    <div className="bg-[#151515] border border-yellow-500/20 rounded-2xl overflow-hidden shadow-lg">
      <table className="w-full">
        <thead className="bg-yellow-500 text-black">
          <tr>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Book Name</th>
            <th className="p-4 text-left">Author</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {loader ? (
            <tr>
              <td colSpan="6" className="text-center p-8 text-yellow-400">
                Loading Books...
              </td>
            </tr>
          ) : (
            books.map((item) => (
              <tr key={item._id} className="border-b border-gray-800 hover:bg-[#222]">
                <td className="p-4">
                  <img
                  src={item.image} 
                    className="w-[60px] h-[85px] object-cover rounded-lg border border-yellow-500/40"
                    alt=""
                  />
                </td>
                <td className="p-4 font-semibold">{item.title}</td>
                <td className="p-4 text-gray-300">{item.author}</td>
                <td className="p-4 text-gray-300">{item.category}</td>
                <td className="p-4 text-yellow-400 font-bold">₹{item.price}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-4">
                    <button onClick={() => handleEdit(item)} className="bg-blue-600 p-2 rounded-lg hover:bg-blue-500">
                      <Pen size={18} />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="bg-red-600 p-2 rounded-lg hover:bg-red-500">
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default AddBook;

