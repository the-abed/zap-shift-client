// SendParcel.jsx
import React, { useMemo, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

/* ---------------- re-usable UI ---------------- */
const Input = ({
  label,
  name,
  type = "text",
  register,
  defaultValue,
  ...rest
}) => (
  <fieldset className="fieldset">
    <label className="label">{label}</label>
    <input
      type={type}
      defaultValue={defaultValue} // applies auth default
      {...register(name)}
      className="input w-full"
      {...rest}
    />
  </fieldset>
);

const Select = ({ label, name, register, defaultValue, children, ...rest }) => (
  <fieldset className="fieldset">
    <legend className="fieldset-legend">{label}</legend>
    <select
      {...register(name)}
      defaultValue={defaultValue} // applies auth default
      className="input w-full"
      {...rest}
    >
      {children}
    </select>
  </fieldset>
);

/* -------------- field lists -------------- */


const RECEIVER_FIELDS = [
  { name: "receiverName", label: "Receiver Name" },
  { name: "receiverEmail", label: "Receiver Email", type: "email" },
  { name: "receiverPhone", label: "Receiver Phone" },
  { name: "receiverAddress", label: "Receiver Address" },
];

export default function SendParcel() {
  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth(); // ← auth data
  const axiosSecure = useAxiosSecure();
  const serviceCenter = useLoaderData();


  const SENDER_FIELDS = (defaults) => [
  { name: "senderName", label: "Sender Name", defaultValue: user?.displayName || '' ,
    readOnly: true
   },
  {
    name: "senderEmail",
    label: "Sender Email",
    type: "email",
    defaultValue: user?.email || '',
    readOnly: true
  },
  { name: "senderPhone", label: "Sender Phone" },
  { name: "senderAddress", label: "Sender Address" },
];

  const regions = useMemo(
    () => [...new Set(serviceCenter.map((r) => r.region))],
    [serviceCenter]
  );

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const senderDistricts = useMemo(() => {
    if (!senderRegion) return [];
    return serviceCenter.filter((c) => c.region === senderRegion);
  }, [senderRegion, serviceCenter]);

  const receiverDistricts = useMemo(() => {
    if (!receiverRegion) return [];
    return serviceCenter.filter((c) => c.region === receiverRegion);
  }, [receiverRegion, serviceCenter]);


  /* -------- submit logic (unchanged) -------- */
  const handleSendParcel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 50 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCost = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCost;
      }
    }
    console.log("cost is", cost);
    data.cost = cost;
    Swal.fire({
      title: "Are you want send parcel?",
      text: `Your parcel cost is ${cost} taka.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel info to the database
        axiosSecure.post("/parcels", data).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              title: "Parcel has been sent !",
              text: "Your parcel has been sent.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  /* ========================================================== */
  /*  Render – now with EXTRA fields and auth defaults injected */
  /* ========================================================== */
  return (
    <div className="my-10 bg-white shadow-md">
      <h2 className="text-5xl font-bold text-secondary px-6">Send Parcel</h2>

      <form onSubmit={handleSubmit(handleSendParcel)} className="p-6 mt-5">
        {/* Parcel type radios */}
        <div className="flex gap-4 mb-6">
          <label className="label flex items-center gap-2">
            <input
              type="radio"
              value="document"
              {...register("parcelType")}
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label flex items-center gap-2">
            <input
              type="radio"
              value="non-document"
              {...register("parcelType")}
              className="radio"
            />
            Non-Document
          </label>
        </div>

        {/* Parcel info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Parcel Name"
            register={register}
            name="parcelName"
            placeholder="Enter parcel name"
          />
          <Input
            label="Parcel Weight (KG)"
            register={register}
            name="parcelWeight"
            type="number"
            step="0.1"
            placeholder="Enter parcel weight"
          />
        </div>

        {/* Two-column: Sender vs Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* ----------- Sender ----------- */}
          <section>
            <h4 className="text-xl font-bold mb-3">Sender Details</h4>
            {/*  EXTRA FIELDS with auth defaults  */}
            {SENDER_FIELDS({
              name: user?.displayName || "",
              email: user?.email || "",
            }).map((f) => (
              <Input key={f.name} {...f} register={register} />
            ))}

            <Select
              label="Region"
              register={register}
              name="senderRegion"
              defaultValue=""
            >
              <option value="" disabled>
                Select your region
              </option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Select>

            <Select
              label="District"
              register={register}
              name="senderDistrict"
              defaultValue=""
            >
              <option value="" disabled>
                Select your district
              </option>
              {senderDistricts.map((d) => (
                <option key={d.district} value={d.district}>
                  {d.district}
                </option>
              ))}
            </Select>
          </section>

          {/* ----------- Receiver ----------- */}
          <section>
            <h4 className="text-xl font-bold mb-3">Receiver Details</h4>
            {RECEIVER_FIELDS.map((f) => (
              <Input key={f.name} {...f} register={register} />
            ))}

            {/*  EXTRA REGION + DISTRICT for receiver  */}
            <Select
              label="Region"
              register={register}
              name="receiverRegion"
              defaultValue=""
            >
              <option value="" disabled>
                Select receiver region
              </option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Select>

            <Select
              label="District"
              register={register}
              name="receiverDistrict"
              defaultValue=""
            >
              <option value="" disabled>
                Select receiver district
              </option>
              {receiverDistricts.map((d) => (
                <option key={d.district} value={d.district}>
                  {d.district}
                </option>
              ))}
            </Select>
          </section>
        </div>

        <button type="submit" className="myBtn mt-6">
          Submit
        </button>
      </form>
    </div>
  );
}
