import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userLogin } from "../features/auth/authActions";


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false)

    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.auth)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLogin(true)
        const action = await dispatch(userLogin({ email, password }));
        if (action.meta.requestStatus === 'fulfilled') {
            toast.success('Login Successfully');
            navigate('/');
            setLogin(false)
        }
        if (action.meta.requestStatus ==='rejected') {
            toast.error(action.payload);
            setLogin(false)
        }

    };

    return (
        <>
            <div className="w-full min-h-screen   flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                
                <div className="w-full sm:max-w-md p-5 mx-auto  rounded-md border glass ">
                    <h2 className="mb-8 text-center text-3xl font-extrabold">Wellcome! Login</h2>
                    <form onSubmit={handleSubmit} className="">
                        {
                            error && <p className="text-red-500 font-bold animate-pulse my-2">{error}</p>
                        }
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="email">Email</label>
                            <input type="email" required
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="password">Password</label>
                            <input type="password"
                                required
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

                                {login ? <span className=" animate-pulse text-white cursor-not-allowed">Loging...</span>  : "Login Now"}

                            </button>

                        </div>
                        {/* {
                            isError &&
                            <p className="text-red-500 text-xs italic">{error}</p>
                        } */}


                    </form>


                    <div className="mt-5">
                        <p className="text-sm text-center sm:px-6 text-gray-900">Don't have an account?
                            <Link to='/register' rel="noopener noreferrer" href="#" className="underline text-rose-700 font-bold">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>

    );
}
