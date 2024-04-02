import React, { useEffect, useState } from "react";
import {
  useGetAllUsersQuery,
  useGetDetailsQuery,
  useUserDeleteMutation,
  useUserUpdateMutation,
} from "../features/api/authApi";
import Swal from "sweetalert2";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const AllUsers = () => {
  const { data: users, isFetching } = useGetAllUsersQuery();
  const [userDelete, { isLoading }] =
    useUserDeleteMutation();
  const [
    userUpdate,
    { isError: error, isLoading: loading, isSuccess: sucess },
  ] = useUserUpdateMutation();
  const { refetch } = useGetDetailsQuery();
  const [openModal, setOpenModal] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handelDelete = async (data) => {
    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert! (${data?.name})`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmResult.isConfirmed) {
        const res = await userDelete({ id: data?._id });
        Swal.fire({
          title: "Deleted!",
          text: `${res?.data?.message}`,
          icon: "success",
        });
        refetch();
      }
    } catch (error) {
      console.error("Failed to delete data:", error);
      // Handle error
    } finally {
      // setLoading(false);
    }
  };

  const handleUserUpdate = async (data) => {
    await userUpdate(data);
   toast.success('Updated Successfully')
    refetch();
  };

  useEffect(() => {
    if (userInfo && userInfo.role !== "admin") {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <div className="text-gray-900  mt-5  ">
       <div className="  mb-3  text-green-600 font-bold   ">
        <h6 className="underline">সকল ইউজার</h6>
      </div>
      <div className="">
        <h1 className="text-md uppercase font-bold py-5 underline">
          All Users
        </h1>
        {loading && (
          <span className="animate-pulse text-red-600 font-bold ">
            Updateing...
          </span>
        )}
      </div>

      <div className="overflow-auto shadow-xl ">
        <table className="table table-sm overflow-x-auto   table-zebra p-2 ">
          <thead className=" bg-slate-500  text-white print:text-white   ">
            <tr className="">
              <th className="border ">SN</th>
              <th className="border min-w-32">NAME</th>
              <th className="border ">EMAIL</th>

              <th className="border ">ROLE</th>
              <th className="border "></th>
            </tr>
          </thead>

          <tbody className=" overflow-hidden">
            {isFetching ? (
              "Loading..."
            ) : (
              <>
                {users?.map((user, index) => (
                  <tr
                    key={user?._id}
                    className="border-b hover:bg-orange-100 bg-white "
                  >
                    <td className=" border border-gray-400">{index + 1}</td>
                    <td className=" border border-gray-400">{user?.name}</td>
                    <td className=" border border-gray-400">{user?.email}</td>
                    <td className=" border border-gray-400">
                      <select
                        onChange={(e) =>
                          handleUserUpdate({
                            id: user._id,
                            data: e.target.value,
                          })
                        }
                        value={user.role}
                        defaultValue={user?.role}
                        className={`bg-transparent border-b-2 border-gray-300 ${
                          user?.role === "pending" && "text-red-600 font-bold"
                        }  `}
                      >
                        <option value="pending">Pending</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td className=" border border-gray-400">
                      <button
                        onClick={() => handelDelete(user)}
                        type="button"
                        className="text-sm text-red-600  px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        {isLoading ? "Deleting..." : <FaTrash />}
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
