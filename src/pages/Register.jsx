import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authActions";
import toast from "react-hot-toast";
import { useGetAllUsersQuery } from "../features/api/authApi";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const { refetch } = useGetAllUsersQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = await dispatch(registerUser({ email, password, name }));
    refetch();
    if (action.meta.requestStatus === "fulfilled") {
      toast.success("Register Successfully");
      navigate("/login");
    }
  };

  return (
    <div className="w-full min-h-screen relative  bg-gradient-to-tl from-green-700 via-teal-800 to-cyan-900  flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
      <div className="absolute top-0 border-b w-full border-t glass bg-white bg-opacity-50">
        <h1 className="text-md sm:text-xl  py-2 text-center font-bold uppercase ">
          Smart Union Management System
          <span className="text-red-600 ml-2">(Daulkhar Union)</span>
        </h1>
      </div>
      <div className="w-full sm:max-w-md  p-10 mx-auto text-white shadow-white  shadow-2xl rounded-tr-3xl my-4  ">
        <h2 className="mb-8  text-xl font-bold">Create an account</h2>

        <form onSubmit={handleSubmit} className="">
          {error && (
            <p className="block animate-bounce font-bold mb-2 uppercase text-yellow-500 ">
              {error}
            </p>
          )}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mt-6">
            <button
              disabled={loading}
              type="submit"
              className="w-full inline-flex items-center justify-center px-4 py-1 bg-red-600 border border-transparent rounded-full font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
            >
              {loading ? "Please Wait... " : "Register Now"}
            </button>
          </div>

          <div className="my-4">
            <p className="text-sm text-center sm:px-6 text-gray-100">
              Have an account?
              <Link
                to="/login"
                rel="noopener noreferrer"
                href="#"
                className="underline  font-bold"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
