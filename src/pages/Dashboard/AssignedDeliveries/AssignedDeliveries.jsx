import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=assigned`
      );
      // console.log("my-deliveries:",res.data);
      return res.data;
    },
  });

  const handleUpdateDeliveryStatus = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };
    let message = `Parcel status updated to ${status
      .split("_")
      .join(" ")} successfully.`;
    axiosSecure
      .patch(`/parcels/${parcel._id}/deliveryStatus`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl text-center font-bold">
        Assigned Deliveries : {parcels.length}
      </h2>

      {/* Table for assigned deliveries */}
      <div className="overflow-x-auto pt-5">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>District</th>
              <th>Status</th>
              <th>Action</th>
              <th>Others action</th>
            </tr>
          </thead>
          <tbody>
            {/* Table body*/}
            {parcels.map((parcel, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{parcel.senderName}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.deliveryStatus}</td>
                <td>
                  {parcel.deliveryStatus === "assigned" ? (
                    <>
                      <button
                        onClick={() =>
                          handleUpdateDeliveryStatus(
                            parcel,
                            "accepted_for_delivery"
                          )
                        }
                        className="btnSmall"
                      >
                        Accept
                      </button>
                      <button className="btnWarn">Cancel</button>
                    </>
                  ) : (
                    <button disabled className="btnWarn">
                      Accepted
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdateDeliveryStatus(parcel, "parcel_picked_up")
                    }
                    disabled={parcel.status === "parcel_picked_up"}
                    className={`btnSmall ${
                      parcel.status === "parcel_picked_up" &&
                      "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Mark As Picked Up
                  </button>

                  <button
                    onClick={() =>
                      handleUpdateDeliveryStatus(parcel, "parcel_delivered")
                    }
                    className="btnSmall"
                  >
                    Mark As Delivered
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

export default AssignedDeliveries;
