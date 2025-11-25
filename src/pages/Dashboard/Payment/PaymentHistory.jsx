import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-5">
        Payment History: {payments.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th>Parcel Info</th>
              <th>Recipient Info</th>
              <th>Tracking Number</th>
              <th>Payment Info</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border">
                {/* Parcel Info */}
                <td className="p-3">
                  <p><strong>Name:</strong> {payment.parcelName}</p>
                  <p><strong>Weight:</strong> {payment.parcelWeight} kg</p>
                </td>

                {/* Recipient Info */}
                <td className="p-3">
                  <p><strong>Name:</strong> {payment.receiverName}</p>
                  <p><strong>Phone:</strong> {payment.receiverPhone}</p>
                  <p><strong>District:</strong> {payment.receiverDistrict}</p>
                </td>

                {/* Tracking Number */}
                <td className="p-3 font-semibold text-blue-600">
                  {"ddddddddd"}
                </td>

                {/* Payment Info */}
                <td className="p-3">
                  <p><strong>Amount:</strong> ${payment.amount}</p>
                  <p><strong>Status:</strong> {payment.paymentStatus}</p>
                  <p><strong>Date:</strong> {payment.paidAt}</p>
                </td>

                {/* Action */}
                <td className="p-3">
                  <button className="myBtn">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
