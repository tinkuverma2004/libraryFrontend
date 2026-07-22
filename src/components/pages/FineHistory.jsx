import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const FineHistory = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [fines, setFines] = useState([]);
  const [payAmount, setPayAmount] = useState({});
  const [loadingFineId, setLoadingFineId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      navigate("/");
      toast.error("only admin can access");
    }
  }, [navigate]);

  useEffect(() => {
    getFineHistory();
  }, []);

  const getFineHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/fines`);
      setFines(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Fine history not found");
    }
  };

  const handleCollectFine = async (fineId) => {
    try {
      const amount = Number(payAmount[fineId]);

      if (!amount || amount <= 0) {
        toast.error("Enter valid amount");
        return;
      }

      setLoadingFineId(fineId);

      const response = await axios.put(`${API_URL}/collect-fine/${fineId}`, {
        payAmount: amount,
      });

      toast.success(response.data.message);

      setPayAmount({
        ...payAmount,
        [fineId]: "",
      });

      getFineHistory();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Fine not collected");
    } finally {
      setLoadingFineId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 text-center mb-8">
        Fine History
      </h1>

      {fines.length === 0 ? (
        <p className="text-center text-gray-400">No fine history found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-yellow-500">
            <thead>
              <tr className="bg-yellow-500 text-black">
                <th className="p-3 border">Student</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Book</th>
                <th className="p-3 border">Total Fine</th>
                <th className="p-3 border">Paid</th>
                <th className="p-3 border">Unpaid</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Collect</th>
                <th className="p-3 border">Paid At</th>
              </tr>
            </thead>

            <tbody>
              {fines.map((fine) => (
                <tr
                  key={fine._id}
                  className="text-center border border-yellow-500"
                >
                  <td className="p-3 border">
                    {fine.userId?.name || "N/A"}
                  </td>

                  <td className="p-3 border">
                    {fine.userId?.email || "N/A"}
                  </td>

                  <td className="p-3 border">
                    {fine.issueBookId?.bookId?.title || "N/A"}
                  </td>

                  <td className="p-3 border text-red-400 font-bold">
                    ₹{fine.amount}
                  </td>

                  <td className="p-3 border text-green-400">
                    ₹{fine.paidAmount}
                  </td>

                  <td className="p-3 border text-red-400">
                    ₹{fine.unpaidAmount}
                  </td>

                  <td className="p-3 border">
                    {fine.paid ? (
                      <span className="text-green-400 font-bold">Paid</span>
                    ) : (
                      <span className="text-red-400 font-bold">Pending</span>
                    )}
                  </td>

                  <td className="p-3 border">
                    {fine.paid ? (
                      <span className="text-green-400 font-bold">
                        Completed
                      </span>
                    ) : (
                      <div className="flex gap-2 justify-center">
                        <input
                          type="number"
                          value={payAmount[fine._id] || ""}
                          onChange={(e) =>
                            setPayAmount({
                              ...payAmount,
                              [fine._id]: e.target.value,
                            })
                          }
                          placeholder="Amount"
                          className="w-24 px-2 py-1 text-black rounded"
                        />

                        <button
                          onClick={() => handleCollectFine(fine._id)}
                          disabled={loadingFineId === fine._id}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          {loadingFineId === fine._id
                            ? "Collecting..."
                            : "Collect"}
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="p-3 border">
                    {fine.paidAt
                      ? new Date(fine.paidAt).toLocaleDateString()
                      : "Not Paid"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FineHistory;