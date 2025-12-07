import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';

const TrackParcel = () => {
    const { trackingId } = useParams();
    const axiosInstance = useAxios();
    
    const {data: trackings = []} = useQuery({
        queryKey: ['tracking', trackingId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
            return res.data;
        },
    })

    return (
     <div className="p-5">
  <h2 className="text-2xl font-bold text-secondary">
    Track Your Parcel: {trackingId}
  </h2>
  <p>Total Logs: {trackings.length}</p>

  {/* Timeline */}
  <div className="mt-6 border-l-2 border-gray-300 pl-6 space-y-6">

    {trackings.map((log) => (
      <div key={log._id} className="relative">
        
        {/* Dot */}
        <span className="absolute -left-3 top-1 w-5 h-5 bg-green-600 rounded-full border-2 border-white"></span>

        {/* Content */}
        <div className="pl-4">
          <p className="text-lg font-semibold capitalize">
            {log.status.replaceAll("_", " ")}
          </p>

          

          <p className="text-gray-600 text-xs mt-1">
            {new Date(log.createdAt).toLocaleString()}
          </p>
        </div>

      </div>
    ))}

  </div>
</div>

    );
};

export default TrackParcel;