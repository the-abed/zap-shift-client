import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["myParcel", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl text-center bg-primary font-bold text-secondary mb-6 p-2 rounded-md">
        My Parcel : {parcels.length}
      </h2>

      {/* Table */}
      <div className="overflow-x-auto border-1 border-gray-200 rounded-md">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-lg font-semibold">
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Parcel Type</th>
              <th>Parcel Weight</th>
              <th>Cost</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.parcelName}</td>
                <td>{parcel.parcelType}</td>

                {/* If parcel weight exists, show it — else show "N/A" */}
                <td className="text-center">{parcel.parcelWeight ? parcel.parcelWeight : "N/A"}</td>

                {/* If cost exists, show it — else show "N/A" */}
                <td>{parcel.cost ? parcel.cost : "N/A"}</td>

                {/* If status exists, show it — else default to "Pending" */}
                <td>{parcel.status ? parcel.status : "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcel;
