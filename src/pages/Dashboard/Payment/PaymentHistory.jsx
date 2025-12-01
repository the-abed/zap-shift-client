import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoaderSpinner from "../../../components/LoaderSpinner";

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

  const { data : parcel = [] } = useQuery({
    queryKey: ["parcel", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) return <LoaderSpinner></LoaderSpinner>;

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-5">
        Payment History: {payments.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full rounded-lg">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th>Parcel Info</th>
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
                  
                </td>

             

                {/* Tracking Number */}
                <td className="p-3 font-semibold text-blue-600">
                  {payment.trackingId}
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
