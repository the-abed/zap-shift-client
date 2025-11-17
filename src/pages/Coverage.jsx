import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { FaSearch } from "react-icons/fa";

const Coverage = () => {
    const data = useLoaderData();
    const mapRef = useRef();
    console.log(data);
  const position = [23.6850, 90.3563];

  const handleSearch = (event) => {
    event.preventDefault();
    const location = event.target.location.value;
    const district = data.find(dist => dist.district.toLowerCase().includes(location.toLowerCase()));
    
    if (district) {
      const { latitude, longitude } = district;
      const position = [latitude, longitude];

      // Center the map on the selected district
      mapRef.current.flyTo(position, 14);
      console.log(position);
    }

  };
  return (
    <div className="my-10">
      <h2 className="text-5xl text-center font-bold text-secondary mb-5">
        We are available in 64 districts
      </h2>

      <div className="mb-5">
        <form onSubmit={handleSearch}>
         <input className="input input-bordered w-full max-w-xs" type="search" name="location" placeholder="Search by district name" />
         <input className="btn btn-primary text-secondary" type="submit" value="Search"
         />
        </form>
      </div>

      <div className="border w-full h-[800px]">
        <MapContainer
         center={position}
          zoom={8} 
          scrollWheelZoom={false}
          className="h-[800px]"
          ref={mapRef}
          >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
         {
          data.map((d,i) => <Marker key={i} position={[d.latitude,d.longitude]}><Popup><strong>{d.district}</strong> <br />
          <small>Service Area: {d.covered_area.join(", ")}</small>
          </Popup>
          </Marker>)
         }
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;