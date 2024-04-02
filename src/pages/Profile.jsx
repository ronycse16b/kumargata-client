import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetDetailsQuery,
  useUserProfileUpdateMutation,
} from "../features/api/authApi";
import Swal from "sweetalert2";
import axios from "axios";
import CountUp from "react-countup";

export default function Profile() {
  const {
    userInfo: { name, email, role, id, image },
  } = useSelector((state) => state.auth);
  const [userProfileUpdate, result] = useUserProfileUpdateMutation();

  // console.log(res);
  const { refetch } = useGetDetailsQuery();
  const { isLoading, error, isError } = result;
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(false);

  const handleFileChange = async (event) => {
    await setSelectedFile(event.target.files[0]);
  };

  async function handleUpload() {
    setUploadProgress(true);
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    const token = localStorage.getItem("userToken");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/user/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        }
      );
      refetch();
      if (response?.data) {
        setUploadProgress(false); // Set uploadProgress to false before resetting the form
        const inputFile = document.getElementById("upload_profile");
        if (inputFile) {
          inputFile.value = ""; // Reset the input field value
        }
      }

      // handle success
    } catch (error) {
      console.error("Error uploading file:", error.message);
      setUploadProgress(false);
      setSelectedFile(null);
    }
  }

  useEffect(() => {
    handleUpload();
  }, [selectedFile]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const old_password = e.target.old_password.value;
    const new_password = e.target.new_password.value;
    const data = {
      name,
      old_password,
      new_password,
      email: email,
    };

    const res = await userProfileUpdate(data);
    if (res?.data) {
      // Reset form fields
      e.target.reset(); // Reset the form

      Swal.fire({
        title: "Updated!",
        text: `Updated Successfully`,
        icon: "success",
      });
      refetch();
    }
  };

  return (
    <div className="mt-5">
       <div className="  mb-3  text-green-600 font-bold   ">
        <h6 className="underline"> আমার প্রোফাইল</h6>
      </div>
      <div className=" flex gap-2 flex-col lg:flex-row    pt-10 rounded-lg text-gray-900">
        <div className="bg-white p-5 max-w-md rounded-md shadow-2xl">
          <div
            className={`mx-auto flex justify-center   pt-10 w-[250px] h-[300px] bg-blue-300/20 relative `}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className=" absolute bottom-0  left-0 bg-slate-50 w-[250px] border border-green-600 text-center">
              <input
                type="file"
                name="avatar"
                id="upload_profile"
                accept="image/*"
                onChange={handleFileChange}
                className=""
                required
                placeholder="Choose a new avatar"
              />
            </div>
          </div>
          {uploadProgress && (
            <div className="flex justify-center my-2">
              <h5 className="font-bold text-green-600">
                Uploading Picture({" "}
                <CountUp start={0} end={100} duration={5.3} />
                %)
              </h5>
            </div>
          )}

          <div className="text-center mt-2">
            <h2 className="font-bold text-xl text-blue-600">
              {name} ({role})
            </h2>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>

        <div className="flex justify-center bg-white py-4 rounded-md shadow-2xl  px-8">
          <form onSubmit={handleUpdateProfile} className="max-w-2xl">
            <div className="flex flex-wrap   rounded-lg p-3 dark:bg-gray-600">
              <h2 className="text-xl text-gray-600 dark:text-gray-300 pb-2">
                Account settings:
              </h2>

              <div className="flex flex-col gap-2 w-full border-gray-400">
                {isError && (
                  <p className="text-red-600 dark:text-gray-400 font-bold animate-pulse">
                    {error?.data?.message}
                  </p>
                )}
                <div>
                  <label className="text-gray-600 dark:text-gray-400">
                    name
                  </label>
                  <input
                    name="name"
                    defaultValue={name}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                    type="text"
                  />
                </div>
                <div>
                  <label className="text-gray-600 dark:text-gray-400">
                    old password
                  </label>

                  <input
                    required
                    name="old_password"
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                    type="password"
                  />
                </div>

                <div>
                  <label className="text-gray-600 dark:text-gray-400">
                    New password
                  </label>
                  <input
                    required
                    name="new_password"
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                    type="text"
                  />
                </div>

                <div className="flex justify-end mb-4">
                  <button
                    className="py-1.5 px-3 m-1 text-center bg-blue-700 border rounded-md text-white  hover:bg-blue-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                    type="submit"
                  >
                    {isLoading ? "Updating..." : "Save changes"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
