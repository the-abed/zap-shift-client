// SendParcel.jsx
// A single-page form that lets users book a parcel delivery.
// Data for regions/districts is fetched via React-Router loader and rendered
// as cascading selects (district list updates when region changes).
// The whole form is validated and submitted through react-hook-form.

import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';

/* ------------------------------------------------------------------ */
/*  Re-usable UI primitives                                             */
/* ------------------------------------------------------------------ */
const Input = ({ label, register, name, type = 'text', ...rest }) => (
  <fieldset className="fieldset">
    <label className="label">{label}</label>
    <input
      type={type}
      {...register(name)}
      className="input w-full"
      {...rest}
    />
  </fieldset>
);

const Select = ({ label, register, name, children, ...rest }) => (
  <fieldset className="fieldset">
    <legend className="fieldset-legend">{label}</legend>
    <select {...register(name)} className="input" {...rest}>
      {children}
    </select>
  </fieldset>
);

/* ------------------------------------------------------------------ */
/*  Field definitions – keeps JSX DRY                                   */
/* ------------------------------------------------------------------ */
const SENDER_FIELDS = [
  { name: 'senderName', label: 'Sender Name', placeholder: 'Enter your name' },
  { name: 'senderEmail', label: 'Sender Email', type: 'email', placeholder: 'Enter your email' },
  { name: 'senderPhone', label: 'Sender Phone', placeholder: 'Enter your phone' },
  { name: 'senderAddress', label: 'Sender Address', placeholder: 'Enter your address' },
];

const RECEIVER_FIELDS = [
  { name: 'receiverName', label: 'Receiver Name', placeholder: 'Enter receiver name' },
  { name: 'receiverEmail', label: 'Receiver Email', type: 'email', placeholder: 'Enter receiver email' },
  { name: 'receiverPhone', label: 'Receiver Phone', placeholder: 'Enter receiver phone' },
  { name: 'receiverAddress', label: 'Receiver Address', placeholder: 'Enter receiver address' },
  { name: 'receiverDistrict', label: 'Receiver District', placeholder: 'Enter receiver district' },
];

export default function SendParcel() {
  /* -------------------------------------------------------------- */
  /*  Form logic – react-hook-form gives us register, watch, etc.   */
  /* -------------------------------------------------------------- */
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const serviceCenter = useLoaderData(); // array of {region, district, ...}

  /* derive unique regions once */
  const regions = useMemo(
    () => [...new Set(serviceCenter.map(r => r.region))],
    [serviceCenter]
  );

  /* watch selected sender region so we can filter districts */
  const senderRegion = watch('senderRegion');

  /* memoised list of districts for the selected region */
  const senderDistricts = useMemo(() => {
    if (!senderRegion) return [];
    return serviceCenter.filter((c) => c.region === senderRegion);
  }, [senderRegion, serviceCenter]);

  /* -------------------------------------------------------------- */
  /*  Submit handler – replace with actual API call when ready      */
  /* -------------------------------------------------------------- */
  const onSubmit = (data) => {
    console.log('Parcel payload:', data);
    // TODO: POST /parcels
  };

  /* ============================================================== */
  /*  Render                                                        */
  /* ============================================================== */
  return (
    <div className="my-10 bg-white shadow-md">
      <h2 className="text-5xl font-bold text-secondary px-6">Send Parcel</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 mt-5">
        {/* Parcel type radios */}
        <div className="flex gap-4 mb-6">
          <label className="label flex items-center gap-2">
            <input
              type="radio"
              value="document"
              {...register('parcelType')}
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label flex items-center gap-2">
            <input
              type="radio"
              value="non-document"
              {...register('parcelType')}
              className="radio"
            />
            Non-Document
          </label>
        </div>

        {/* Parcel details grid */}
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
            placeholder="Enter parcel weight"
            step="0.1"
          />
        </div>

        {/* Two-column layout: Sender vs Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* ----------- Sender ----------- */}
          <section>
            <h4 className="text-xl font-bold mb-3">Sender Details</h4>
            {SENDER_FIELDS.map((f) => (
              <Input key={f.name} {...f} register={register} />
            ))}

            <Select label="Region" register={register} name="senderRegion" defaultValue="">
              <option value="" disabled>
                Select your region
              </option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Select>

            <Select label="District" register={register} name="senderDistrict" defaultValue="">
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
          </section>
        </div>

        <button type="submit" className="myBtn mt-6">
          Submit
        </button>
      </form>
    </div>
  );
}


