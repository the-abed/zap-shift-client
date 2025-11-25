import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoaderSpinner from "../../../components/LoaderSpinner";

const Payment = () => {
  const { parcelId } = useParams();

  const axiosSecure = useAxiosSecure();
  const { data: parcel = [], isLoading } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  const handlePayment = async () => {
  const paymentInfo = {
    cost: parcel.cost,
    parcelId: parcel._id,
    senderEmail: parcel.senderEmail,
    parcelName: parcel.parcelName
  }

  const res = await axiosSecure.post('payment-checkout-session', paymentInfo);
  console.log(res.data);
  window.location.href = res.data.url;
}
 
  

  if (isLoading) {
    return <LoaderSpinner></LoaderSpinner>;
  }

  return (
    <div className="p-5">
      <h2>Payment : {parcel.parcelName} </h2>
      <p>please pay ${parcel.cost}</p>
      <button onClick={handlePayment} className="myBtn">Pay</button>
    </div>
  );
};

export default Payment;
