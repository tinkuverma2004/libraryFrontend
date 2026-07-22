import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Admin = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [allbooks, setAllBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [showIssueModal, setShowIssueModal] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const [selectedBook, setSelectedBook] = useState(null);
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedReturnBook, setSelectedReturnBook] = useState(null);
  const [fineData, setFineData] = useState({
    lateDays: 0,
    fineAmount: 0,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      navigate("/");
      toast.error("only admin can access");
    }
  }, [navigate]);

  const getBook = async () => {
    try {
      const response = await fetch(`${API_URL}/getbooks`);
      const data = await response.json();

      if (data.success) {
        setAllBooks(data.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Books not found");
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  const searchUser = async (value) => {
    try {
      const response = await fetch(
        `${API_URL}/user/search-user?search=${value}`
      );

      const data = await response.json();

      if (data.success) {
        setSelectedUser(data.data);
      } else {
        setSelectedUser(null);
      }
    } catch (err) {
      console.log(err);
      setSelectedUser(null);
    }
  };

  useEffect(() => {
    if (!userSearch.trim()) {
      setSelectedUser(null);
      return;
    }

    const timer = setTimeout(() => {
      searchUser(userSearch.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [userSearch]);

  const handleIssuedBook = (book) => {
    setSelectedBook(book);

    const today = new Date().toISOString().split("T")[0];
    setIssueDate(today);

    setShowIssueModal(true);
  };

  const submitIssueBook = async (e) => {
    e.preventDefault();

    if (!selectedBook || !selectedUser || !issueDate || !dueDate) {
      return toast.error("All fields are required");
    }

    try {
      const issueData = {
        bookId: selectedBook._id,
        userId: selectedUser._id,
        issueDate,
        dueDate,
      };

      const response = await fetch(`${API_URL}/issue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);

        setAllBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === selectedBook._id
              ? { ...book, status: "borrowed", dueDate }
              : book
          )
        );

        closeIssueModal();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Book issue failed");
    }
  };

  const calculateFine = (dueDate) => {
    if (!dueDate) {
      return {
        lateDays: 0,
        fineAmount: 0,
      };
    }

    const today = new Date();
    const due = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    if (today <= due) {
      return {
        lateDays: 0,
        fineAmount: 0,
      };
    }

    const diffTime = today - due;
    const lateDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return {
      lateDays,
      fineAmount: lateDays * 10,
    };
  };

  const openReturnModal = (book) => {
    const fine = calculateFine(book.dueDate);

    setSelectedReturnBook(book);
    setFineData(fine);
    setShowReturnModal(true);
  };

  const handleReturnBook = async () => {
    if (!selectedReturnBook) {
      return toast.error("No book selected");
    }

    try {
      const response = await fetch(
        `${API_URL}/returnBook/${selectedReturnBook._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);

        setAllBooks((prevBooks) =>
          prevBooks.map((item) =>
            item._id === selectedReturnBook._id
              ? {
                  ...item,
                  status: "available",
                  dueDate: null,
                }
              : item
          )
        );

        closeReturnModal();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Book return failed");
    }
  };

  const closeIssueModal = () => {
    setShowIssueModal(false);
    setSelectedBook(null);
    setSelectedUser(null);
    setUserSearch("");
    setIssueDate("");
    setDueDate("");
  };

  const closeReturnModal = () => {
    setShowReturnModal(false);
    setSelectedReturnBook(null);
    setFineData({
      lateDays: 0,
      fineAmount: 0,
    });
  };

  const filteredBooks = allbooks.filter((book) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "available") return book.status === "available";
    if (selectedCategory === "issued") return book.status === "borrowed";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Issue Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-4">
          <form
            onSubmit={submitIssueBook}
            className="bg-white w-full max-w-[450px] p-6 rounded-2xl shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
              Issue Book
            </h2>

            <label className="font-semibold text-gray-700">Book</label>
            <input
              type="text"
              value={selectedBook?.title || ""}
              readOnly
              className="w-full border p-3 rounded-lg mb-3 bg-gray-100 outline-none"
            />

            <label className="font-semibold text-gray-700">
              Search User By Name or Email
            </label>
            <input
              type="text"
              value={userSearch}
              onChange={(e) => {
                setUserSearch(e.target.value);
                setSelectedUser(null);
              }}
              placeholder="Enter user name or email"
              className="w-full border p-3 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-indigo-400"
            />

            {selectedUser && (
              <div className="bg-green-50 border border-green-400 p-3 rounded-lg mb-3 text-sm">
                <p>
                  <b>Name:</b> {selectedUser.name}
                </p>
                <p>
                  <b>Email:</b> {selectedUser.email}
                </p>
                <p>
                  <b>Phone:</b> {selectedUser.phone}
                </p>
              </div>
            )}

            <label className="font-semibold text-gray-700">Issue Date</label>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="w-full border p-3 rounded-lg mb-3 outline-none"
              required
            />

            <label className="font-semibold text-gray-700">
              Due Date / Expected Return Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border p-3 rounded-lg mb-5 outline-none"
              required
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
              >
                Issue Book
              </button>

              <button
                type="button"
                onClick={closeIssueModal}
                className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Return Modal */}
      {showReturnModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-[460px] p-6 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold text-center mb-5 text-gray-800">
              Return Book
            </h2>

            <div className="space-y-3 bg-gray-100 p-4 rounded-xl text-gray-700">
              <p>
                <b>Book:</b> {selectedReturnBook?.title}
              </p>

              <p>
                <b>Author:</b> {selectedReturnBook?.author || "N/A"}
              </p>

              <p>
                <b>Due Date:</b>{" "}
                {selectedReturnBook?.dueDate
                  ? selectedReturnBook.dueDate.slice(0, 10)
                  : "N/A"}
              </p>

              <p>
                <b>Late Days:</b>{" "}
                <span className="text-red-600 font-bold">
                  {fineData.lateDays}
                </span>
              </p>

              <p>
                <b>Fine Amount:</b>{" "}
                <span className="text-red-600 font-bold">
                  ₹{fineData.fineAmount}
                </span>
              </p>
            </div>

            {fineData.fineAmount > 0 ? (
              <p className="mt-4 text-red-600 font-semibold text-center">
                Please collect ₹{fineData.fineAmount} fine before return.
              </p>
            ) : (
              <p className="mt-4 text-green-600 font-semibold text-center">
                No fine. Book can be returned directly.
              </p>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleReturnBook}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Confirm Return
              </button>

              <button
                onClick={closeReturnModal}
                className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="p-6 flex gap-6">
        {/* Sidebar */}
        <div className="w-[280px] h-fit bg-white rounded-2xl p-5 shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Filter Books
          </h2>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="all">All Books</option>
            <option value="available">Available Books</option>
            <option value="issued">Issued Books</option>
          </select>

          <div className="mt-5 bg-indigo-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Total Books</p>
            <h3 className="text-2xl font-bold text-indigo-600">
              {allbooks.length}
            </h3>
          </div>

          <div className="mt-3 bg-green-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Available</p>
            <h3 className="text-2xl font-bold text-green-600">
              {allbooks.filter((book) => book.status === "available").length}
            </h3>
          </div>

          <div className="mt-3 bg-red-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Issued</p>
            <h3 className="text-2xl font-bold text-red-600">
              {allbooks.filter((book) => book.status === "borrowed").length}
            </h3>
          </div>
        </div>

        {/* Books Section */}
        <div className="flex-1 bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {selectedCategory === "all" && "All Books"}
                {selectedCategory === "available" && "Available Books"}
                {selectedCategory === "issued" && "Issued Books"}
              </h1>

              <p className="text-gray-500 mt-1">
                Manage your library books easily
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/due-books")}
                className="bg-orange-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-orange-600 hover:-translate-y-1 transition shadow-md"
              >
                Due Books
              </button>

              <button
                onClick={() => navigate("/add-book")}
                className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 hover:-translate-y-1 transition shadow-md"
              >
                Manage Books
              </button>
            </div>
          </div>

          {/* Books Grid */}
          {filteredBooks.length === 0 ? (
            <div className="flex justify-center items-center h-[300px] w-full">
              <h2 className="text-2xl font-semibold text-gray-500">
                No Books Found
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBooks.map((items) => (
                <div
                  key={items._id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={items.image} 
                      className="w-full h-48 object-cover cursor-pointer hover:scale-110 transition duration-500"
                      alt={items.title}
                      onClick={() => navigate(`/books/${items._id}`)}
                    />

                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                        items.status === "available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {items.status === "available" ? "Available" : "Issued"}
                    </span>
                  </div>

                  <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-800 truncate">
                      {items.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1 truncate">
                      Author: {items.author || "N/A"}
                    </p>

                    <p className="text-gray-600 text-sm mt-3 line-clamp-2 min-h-[40px]">
                      {items.description || "No description available"}
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <span className="font-bold text-indigo-600">
                        ₹{items.price}
                      </span>

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {items.category || "General"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 px-4 pb-4">
                    {items.status === "available" ? (
                      <button
                        onClick={() => handleIssuedBook(items)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold transition"
                      >
                        Issue Book
                      </button>
                    ) : (
                      <button
                        onClick={() => openReturnModal(items)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold transition"
                      >
                        Return Book
                      </button>
                    )}

                   
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate("/Allbooks")}
              className="bg-blue-600 text-white px-10 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;