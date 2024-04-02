import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../features/auth/authActions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLogin(true);
    const action = await dispatch(userLogin({ email, password }));
    if (action.meta.requestStatus === "fulfilled") {
      toast.success("Login Successfully");
      navigate("/");
      setLogin(false);
    }
    if (action.meta.requestStatus === "rejected") {
      // toast.error(action.payload);
      setLogin(false);
    }
  };

  return (
    <div className=" relative flex flex-col justify-center items-center h-[100vh] bg-gradient-to-tl from-green-700 via-teal-800 to-cyan-900">
      <div className="absolute top-0 border-b w-full border-t glass bg-white bg-opacity-50">
        <h1 className="text-md sm:text-xl  py-2 text-center font-bold uppercase ">
          Smart Union Management System 
          <span className="text-red-600 ml-2">(Daulkhar Union)</span>
        </h1>
      </div>
      <div className="w-full sm:max-w-md  p-10 mx-auto shadow-white  shadow-2xl   rounded-tr-3xl my-4  ">
        <h2 className="mb-8 text-xl font-bold text-white">Welcome! Login</h2>
        <form onSubmit={handleSubmit} className="">
          {error && (
            <div
              role="alert"
              className="flex items-center mb-4 animate-pulse font-bold uppercase bg-warning rounded-md "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}
          <div className="mb-4">
            <input
              type="email"
              required
              placeholder="Email ID"
              
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center ">
              {/* <input id="remember_me" disabled type="checkbox" className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
                                <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900"> Remember me </label> */}
            </div>
            <Link to="/forgot" className="text-sm font-bold text-white">
              Forgotten password?{" "}
            </Link>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full inline-flex items-center  justify-center px-4 py-1 bg-red-600 border border-transparent rounded-full font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
            >
              {login ? (
                <span className=" animate-pulse text-white cursor-not-allowed">
                  Loging...
                </span>
              ) : (
                "Login Now"
              )}
            </button>
          </div>
          {/* {
                            isError &&
                            <p className="text-red-500 text-xs italic">{error}</p>
                        } */}
        </form>

        <div className="mt-5">
          <p className="text-sm text-center sm:px-6 text-gray-200">
            Don't have an account?
            <Link
              to="/register"
              rel="noopener noreferrer"
              href="#"
              className="underline font-bold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
