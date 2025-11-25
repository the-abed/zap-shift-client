import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcel", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDeleteParcel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            // refresh the data after delete
            refetch();
            Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
          }
        });

      }
    });
  };

  const handlePayment = async (parcel)=>{
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName
    }
    const res = await axiosSecure.post('payment-checkout-session', paymentInfo);
    console.log(res.data);
    window.location.assign(res.data.url);
    
  }

  //   Calculate total cost
  const totalCost = parcels.reduce(
    (sum, item) => sum + (item.cost ? Number(item.cost) : 0),
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl text-center bg-primary font-bold text-secondary mb-6 p-2 rounded-md">
        My Parcel : {parcels.length}
      </h2>

      {/* Table */}
      <div className="overflow-x-auto border-1 border-gray-200 rounded-md">
        <table className="table table-zebra w-full text-center">
          <thead className="bg-base-200 text-lg font-semibold">
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Parcel Type</th>
              <th>Parcel Weight</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.parcelName}</td>
                <td>{parcel.parcelType}</td>

                {/* If parcel weight exists, show it — else show "N/A" */}
                <td className="text-center">
                  {parcel.parcelWeight ? parcel.parcelWeight : "N/A"}
                </td>

                {/* If cost exists, show it — else show "N/A" */}
                <td>{parcel.cost ? parcel.cost : "N/A"}</td>

                {/* If payment status exists, show it — else default to "Pending" */}
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-600">Paid</span>
                  ) : (
                    // <Link to={`/dashboard/payment/${parcel._id}`} className="myBtn btn-sm">Pay</Link>
                    <button
                    onClick={()=>handlePayment(parcel)} className="myBtn btn-sm">Pay</button>
                  )}
                </td>

                {/* If status exists, show it — else default to "Pending" */}
                <td>
                  {parcel.deliveryStatus ? parcel.deliveryStatus : "Pending"}
                </td>

                {/* Action Buttons (View, Edit and Delete) */}
                <td className="flex justify-center gap-2">
                  <button
                    className="btn btn-square tooltip hover:tooltip-bottom hover:bg-primary"
                    data-tip="View"
                  >
                    <FaMagnifyingGlass />
                  </button>
                  <button
                    className="btn btn-square tooltip hover:tooltip-bottom hover:bg-primary"
                    data-tip="Edit"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteParcel(parcel._id)}
                    className="btn btn-square tooltip hover:tooltip-bottom hover:bg-primary"
                    data-tip="Delete"
                  >
                    <IoTrashOutline />
                  </button>
                </td>
              </tr>
            ))}

            {/* Total Cost Row */}
            <tr className="bg-base-100 font-bold text-lg ">
              <td colSpan={4}></td>
              <td colSpan={3}></td>
              <td colSpan={1}>Total Cost: {totalCost}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcel;
