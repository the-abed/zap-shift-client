import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {data: parcels = []} = useQuery({
    queryKey: ["myParcel", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myParcel/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-5xl font-bold text-secondary">My Parcel : {parcels.length}</h2>
    </div>
  );
};

export default MyParcel;
