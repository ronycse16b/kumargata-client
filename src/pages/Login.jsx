import { useDispatch, useSelector } from "react-redux";
import { SignIn, SignUp } from "../features/auth.slice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const { isLoading, isError, error, user } = useSelector((state) => state.auth)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(SignIn({ email, password }));
        toast.success('Sign in Successfully');


    };

    useEffect(() => {
        if (!isLoading && user) {

            navigate('/')

        }
    }, [isLoading, user])

    return (
        <>
            <div className="w-full min-h-screen   flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
                <div className="w-full sm:max-w-md p-5 mx-auto  rounded-md">
                    <h2 className="mb-12 text-center text-3xl font-extrabold">Login</h2>
                    <form onSubmit={handleSubmit} className="">
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="email">Email-Address</label>
                            <input type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="password">Password</label>
                            <input type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember_me" disabled type="checkbox" className="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
                                <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900"> Remember me </label>
                            </div>
                            <a href="#" className="text-sm"> Forgot your password? </a>
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
                            >
                                {
                                    isLoading ?
                                        <span className="animate-spin border-dashed border-4 text-white w-6 h-6 rounded-full"></span>
                                        :
                                        "Login Now"
                                }
                            </button>

                        </div>
                        {
                            isError &&
                            <p className="text-red-500 text-xs italic">{error}</p>
                        }
                        <div className="flex items-center pt-4 space-x-1">
                            <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                            <p className="px-3 text-sm text-gray-400">Login with social accounts</p>
                            <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                        </div>
                        <div className="flex justify-center space-x-4 border my-4 cursor-pointer glass bg-orange-300 ">
                            <button aria-label="Log in with Google " className="p-3 rounded-sm flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                </svg> <span className=" ml-1">oogle</span>
                            </button>

                        </div>
                        <p className="text-xs text-center sm:px-6 text-gray-900">Don't have an account?
                            <Link to='/register' rel="noopener noreferrer" href="#" className="underline text-rose-700 font-bold">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>

    );
}
