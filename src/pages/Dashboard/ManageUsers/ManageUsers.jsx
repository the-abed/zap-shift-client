import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaEye,
  FaFileShield,
  FaUserMinus,
  FaUserShield,
} from "react-icons/fa6";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeUser = (user) => {
    const roleInfo = { role: "admin" };
    //TODO: Must ask for confirmation before proceed
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} is an admin now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    //TODO: Must ask for confirmation before proceed
    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} removed from admin!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl text-center font-bold mb-6">
        Manage Users ({users.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Created At</th>
              <th>Admin action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>

                <td className="px-4 py-3 font-medium">{user.displayName}</td>

                <td className="px-4 py-3">{user.email}</td>

                <td className="px-4 py-3 capitalize">{user.role || "user"}</td>

                <td className="px-4 py-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="text-red-600"
                    >
                      <FaUserMinus />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeUser(user)}
                      className="text-green-600"
                    >
                      <FaUserShield></FaUserShield>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
