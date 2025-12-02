import React, { useRef } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef(null);

  const { data: parcels = [] } = useQuery({
    queryKey: ["riders", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup"
      );
      return res.data;
    },
  });

  const openAssignRiderModal = (p) => {
    riderModalRef.current.showModal();
  };

  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold text-secondary text-center">
        Assign Riders: {parcels.length}
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Pickup District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels.map((p, index) => (
              <>
                <tr key={p._id}>
                  <th>{index + 1}</th>
                  <td>{p.parcelName}</td>
                  <td>{p.cost}</td>
                  <td>{p.createdAt}</td>
                  <td>{p.senderDistrict}</td>
                  <td>
                    <button
                    onClick={() => openAssignRiderModal(p)}
                     className="btn btn-sm">Assign</button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button
        className="btn"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        open modal
      </button> */}
      <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
