import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const DueBooks = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [dueBooks, setDueBooks] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      navigate("/");
      toast.error("only admin can access");
    }
  }, [navigate]);

  useEffect(() => {
    handleDueBooks();
  }, []);

  const handleDueBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/due-books`);

      if (response.data.success) {
        setDueBooks(response.data.data || []);
      }
    } catch (error) {
      console.log(error);
      toast.error("Due books not fetched");
    }
  };

  const calculateFine = (dueDate, finePerDay = 10) => {
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
      fineAmount: lateDays * finePerDay,
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Due Books</h1>
          <p className="text-gray-500 mt-1">
            Books whose due date has passed
          </p>
        </div>

        <button
          onClick={() => navigate("/admin")}
          className="bg-indigo-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Back to Admin
        </button>
      </div>

      {dueBooks.length === 0 ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-[420px] p-10 bg-white rounded-2xl shadow-xl border text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-3">
              No Due Books
            </h2>

            <p className="text-gray-600">
              There are currently no overdue books.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {dueBooks.map((item) => {
            const fine = calculateFine(item.dueDate, item.finePerDay || 10);

            return (
              <div
                key={item._id}
                className="bg-black border-2 border-yellow-500 rounded-2xl p-6 shadow-xl hover:scale-105 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold text-yellow-400 mb-5">
                  {item.bookId?.title}
                </h2>

                <div className="space-y-3 text-white">
                  <p>
                    <span className="font-bold text-yellow-400">User:</span>{" "}
                    {item.userId?.name}
                  </p>

                  <p>
                    <span className="font-bold text-yellow-400">Email:</span>{" "}
                    {item.userId?.email}
                  </p>

                  <p>
                    <span className="font-bold text-yellow-400">Phone:</span>{" "}
                    {item.userId?.phone}
                  </p>

                  <p>
                    <span className="font-bold text-yellow-400">
                      Issue Date:
                    </span>{" "}
                    {item.issueDate?.slice(0, 10)}
                  </p>

                  <p>
                    <span className="font-bold text-yellow-400">Due Date:</span>{" "}
                    {item.dueDate?.slice(0, 10)}
                  </p>

                  <p>
                    <span className="font-bold text-yellow-400">
                      Late Days:
                    </span>{" "}
                    <span className="text-red-400 font-bold">
                      {fine.lateDays}
                    </span>
                  </p>

                  <p>
                    <span className="font-bold text-yellow-400">
                      Fine:
                    </span>{" "}
                    <span className="text-red-400 font-bold">
                      ₹{fine.fineAmount}
                    </span>
                  </p>
                </div>

                <button className="w-full mt-6 bg-red-600 py-3 rounded-lg font-bold text-white">
                  OVERDUE
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DueBooks;