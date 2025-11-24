import React from "react";
import { useForm, Watch } from "react-hook-form";
import { data, useLoaderData } from "react-router";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const serviceCenter = useLoaderData();
  

  const regionsDuplicate = serviceCenter.map((reg) => reg.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = watch("senderRegion");
  // console.log(regions);

  const districtsByRegion = region => {
    const districts = serviceCenter.filter((dist) => dist.region === region);
    return districts;
  }

  const handleSendParcel = (data) => {
    console.log(data);
  };

  return (
    <div className="my-10 bg-white shadow-md">
      <h2 className="text-5xl font-bold text-secondary px-6">Send Parcel</h2>

      <form onSubmit={handleSubmit(handleSendParcel)} className="p-6 mt-5 ">
        {/* Parcel type */}
        <div>
          <label className="label mr-4 ">
            <input
              type="radio"
              {...register("parcelType")}
              className="radio"
              value="document"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              className="radio"
              value=" non-document"
              defaultChecked
            />
            Non-Document
          </label>
        </div>

        {/* Parcel info : name , weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Enter parcel name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (KG)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Enter parcel weight"
            />
          </fieldset>
        </div>

        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* sender info */}
          <div>
            <h4 className="text-xl font-bold">Sender Details</h4>
            {/* Sender Name */}
            <fieldset className="fieldset">
              <label className="label">Sender Name</label>
              <input
                type="text"
                {...register("senderName")}
                className="input w-full"
                placeholder="Enter Your Name"
              />
            </fieldset>

            {/* Sender email */}
            <fieldset className="fieldset">
              <label className="label">Sender Email</label>
              <input
                type="email"
                {...register("senderEmail")}
                className="input w-full"
                placeholder="Enter Your Email"
              />
            </fieldset>

            {/* Sender phone */}
            <fieldset className="fieldset">
              <label className="label">Sender Phone</label>
              <input
                type="text"
                {...register("senderPhone")}
                className="input w-full"
                placeholder="Enter Your Phone"
              />
            </fieldset>

            {/* Sender address */}
            <fieldset className="fieldset">
              <label className="label">Sender Address</label>
              <input
                type="text"
                {...register("senderAddress")}
                className="input w-full"
                placeholder="Enter Your Address"
              />
            </fieldset>

              {/* Sender Region */}
            <fieldset className="fieldset">
            <legend className="fieldset-legend ">Region </legend>
            <select {...register("senderRegion")} className="input" defaultValue="Select Your Region">
              <option disabled>Select Your Region</option>
              {regions.map((reg, index) => (
                <option key={index} value={reg}>
                  {reg}
                </option>
              ))}
            
            </select>
            </fieldset>

           {/* Sender District */}
           <fieldset className="fieldset">
            <legend className="fieldset-legend ">District </legend>
            <select {...register("senderDistrict")} className="input" defaultValue="Select Your District">
              <option disabled>Select Your District</option>
             {
              districtsByRegion(senderRegion).map((dist, index) => (
                <option key={index} value={dist.district}>
                  {dist.district}
                </option>
              ))
             }
            
            </select>
            </fieldset>

            {/* Region */}
          </div>

          {/* receiver info */}
          <div>
            <h4 className="text-xl font-bold">Receiver Details</h4>
            {/* Receiver Name */}
            <fieldset className="fieldset">
              <label className="label">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full"
                placeholder="Enter Your Name"
              />
            </fieldset>

            {/* Receiver email */}
            <fieldset className="fieldset">
              <label className="label">Receiver Email</label>
              <input
                type="email"
                {...register("receiverEmail")}
                className="input w-full"
                placeholder="Enter Your Email"
              />
            </fieldset>

            {/* Receiver phone */}
            <fieldset className="fieldset">
              <label className="label">Receiver Phone</label>
              <input
                type="text"
                {...register("receiverPhone")}
                className="input w-full"
                placeholder="Enter Your Phone"
              />
            </fieldset>

            {/* Receiver address */}
            <fieldset className="fieldset">
              <label className="label">Receiver Address</label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input w-full"
                placeholder="Enter Your Address"
              />
            </fieldset>

            {/* Receiver District */}
            <fieldset className="fieldset">
              <label className="label">Receiver District</label>
              <input
                type="text"
                {...register("receiverDistrict")}
                className="input w-full"
                placeholder="Enter Your District"
              />
            </fieldset>
          </div>
        </div>
        <input type="submit" value="Submit" className="myBtn" />
      </form>
    </div>
  );
};

export default SendParcel;