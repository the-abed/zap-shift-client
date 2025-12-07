import React, { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import agentPending from "../../assets/agent-pending.png";

export default function RiderApplication() {
  const { register, handleSubmit, control } = useForm();
  const axiosSecure = useAxiosSecure();
  const serviceCenter = useLoaderData();

  /* ---------------- Region / District Logic ---------------- */
  const regions = useMemo(
    () => [...new Set(serviceCenter.map((r) => r.region))],
    [serviceCenter]
  );

  const selectedRegion = useWatch({ control, name: "region" });

  //   const districts = useMemo(() => {
  //     if (!selectedRegion) return [];
  //     return serviceCenter.filter((c) => c.region === selectedRegion);
  //   }, [selectedRegion, serviceCenter]);

  const warehouse = useMemo(() => {
    if (!selectedRegion) return [];
    return serviceCenter.filter((c) => c.region === selectedRegion);
  }, [selectedRegion, serviceCenter]);

  /* ---------------- Submit Logic ---------------- */
  const handleApply = (data) => {
    Swal.fire({
      title: "Submit Rider Application?",
      icon: "question",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        console.log(data);
        axiosSecure.post("/riders", data).then((r) => {
          if (r.data.insertedId) {
            Swal.fire("Success", "Application submitted!", "success");
          }
        });
      }
    });
  };

  return (
    <div className="my-10 bg-white shadow-md">
      <h2 className="text-5xl font-bold text-secondary px-6">Be a Rider</h2>
      <p className="px-6 text-gray-600 mt-2">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 items-center justify-between">
        {/* Left Side Form */}
        <form
          onSubmit={handleSubmit(handleApply)}
          className="space-y-6 order-1 md:order-1"
        >
          {/* Two-column section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Column 1 */}
            <section>
              <fieldset className="fieldset">
                <label className="label">Your Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className="input w-full"
                />
              </fieldset>

              <fieldset className="fieldset">
                <label className="label">Your Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="input w-full"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Your Region</legend>
                <select {...register("region")} className="input w-full">
                  <option value="" disabled selected>
                    Select your region
                  </option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>
            </section>

            {/* Column 2 */}
            <section>
              <fieldset className="fieldset">
                <label className="label">Your Age</label>
                <input
                  type="number"
                  {...register("age")}
                  className="input w-full"
                />
              </fieldset>

              <fieldset className="fieldset">
                <label className="label">Contact Number</label>
                <input
                  type="text"
                  {...register("contact")}
                  className="input w-full"
                />
              </fieldset>

              <fieldset className="fieldset">
                <label className="label">NID No</label>
                <input
                  type="text"
                  {...register("nid")}
                  className="input w-full"
                />
              </fieldset>
            </section>
          </div>

          {/* Warehouse Selection (Full width) */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Select your district</legend>
            <select {...register("district")} className="input w-full">
              <option value="" disabled selected>
                Select district
              </option>
              {warehouse.map((c) => (
                <option key={c.centerId} value={c.district}>
                  {c.district}
                </option>
              ))}
            </select>
          </fieldset>

          <button type="submit" className="myBtn">
            Submit
          </button>
        </form>

        {/* Right Side Image */}
        <div className="order-2 md:order-2">
          <img src={agentPending} alt="" />
        </div>
      </div>
    </div>
  );
}
