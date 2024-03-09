import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authActions";
import toast from "react-hot-toast";




export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { loading, userInfo, error } = useSelector((state) => state.auth)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const action = await dispatch(registerUser({ email, password, name }));
        console.log(action.meta.requestStatus);
        if (action.meta.requestStatus === 'fulfilled') {
            toast.success('Register Successfully');
            navigate('/login');
        }



    };





    return (
        <>
            <div className="w-full min-h-screen   flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div className="w-full sm:max-w-md p-5 mx-auto  rounded-md border glass">
                    <h2 className="mb-8 text-center text-3xl font-extrabold">Register Account</h2>
                    <form onSubmit={handleSubmit} className="">
                        {
                            error && <p className="text-red-500 font-bold animate-pulse my-2">{error}</p>
                        }
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="email">Full Name</label>
                            <input type="text"
                                placeholder="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="email">Email</label>
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

                        <div className="mt-6">
                            <button disabled={loading} type="submit" className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">{loading ? "wait.." : "Register Now"}</button>
                        </div>

                        <div className="mt-5">
                            <p className="text-sm text-center sm:px-6 text-gray-900">Have an account?
                                <Link to='/login' rel="noopener noreferrer" href="#" className="underline text-rose-700 font-bold">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
}
