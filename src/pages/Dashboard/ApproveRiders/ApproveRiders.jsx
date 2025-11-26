import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaUserCheck } from "react-icons/fa6";
import { IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";
import LoaderSpinner from "../../../components/LoaderSpinner";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: riders = [], isLoading, refetch } = useQuery({
    queryKey: ["riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

const updateRiderStatus = async (rider, status) => {
  try {
    const res = await axiosSecure.patch(`/riders/${rider._id}`, {
      status,
      email: rider.email
    });

    if (res.data.modifiedCount) {
      refetch(); // refresh rider list
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Rider status is set to ${status}.`,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire("Info", "No changes were made", "info");
    }
  } catch (err) {
    console.error("Error updating rider:", err.response || err);
    Swal.fire(
      "Error",
      err.response?.data?.message || "Failed to update rider status",
      "error"
    );
  }
};




  const handleApproval = async (rider) => {
    updateRiderStatus(rider, "approved");
    
  };

  const handleReject = async (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  if (isLoading) {
    return <LoaderSpinner></LoaderSpinner>;
  }

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold">Approve Riders</h2>
      <p className="text-xl mb-4">Total Riders: {riders.length}</p>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>Age</th>
              <th>NID</th>
              <th>Contact</th>
              <th>Warehouse</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id} className="hover">
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.age}</td>
                <td>{rider.nid}</td>
                <td>{rider.contact}</td>
                <td>{rider.warehouse}</td>

                {/* Status */}
                <td>
                  <span
                    className={
                      rider.status === "approved"
                       ? "badge badge-success"
                        : "badge badge-warning"
                    }
                  >
                    {rider.status}
                  </span>
                </td>

                {/* Created At */}
                <td>{new Date(rider.createdAt).toLocaleDateString()}</td>

                {/* Buttons */}
                <td>
                  <button
                  onClick={()=> handleApproval(rider)}
                   className="myBtn btn-sm"><FaUserCheck></FaUserCheck> Approve</button>

                  <button 
                  onClick={()=> handleReject(rider)}
                  className="myBtn btn-sm"><IoPersonRemove></IoPersonRemove> Reject</button>

                  <button

                   className="myBtn btn-sm"><FaTrash></FaTrash> Delete</button>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
