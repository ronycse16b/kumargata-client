import axios from "axios";
import toast from "react-hot-toast";
import { usePasswordResetMutation } from "../features/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const PasswordReset = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');

    const [passwordReset, { isError, error, isLoading }] = usePasswordResetMutation();


    const handlePasswordReset = async (event) => {
        event.preventDefault();
     
        const pin = event.target.pin.value;
        const password = event.target.password.value;

        try {

            const response = await passwordReset({ email, pin, password });
            if (response?.data) {
                setOpenModal(true)
                toast.success(response?.data?.message)
            }

        } catch (error) {
            console.log(error);
        }



    };



    return (
        <div>
            <div>

                <div className={`fixed z-[100] flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100`}>
                    <div className={`absolute max-w-md rounded-sm bg-white p-3 pb-5 text-center drop-shadow-2xl ${openModal ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'} `}>

                        <h1 className="mb-2 text-xl font-semibold text-black">Dear User!</h1>
                        <p className="px-1 mb-3 text-sm opacity-80 text-black font-bold">Your password reset Successfully <br /> please Login</p>
                        <Link to='/Login' className="me-2 rounded-sm bg-green-700 px-6 py-1 text-white">Login Now</Link>
                    </div>
                </div>
            </div>
            <div className="min-h-screen bg-gradient-to-tl from-green-700 via-teal-800 to-cyan-900 flex items-center justify-center">

                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
                    <h1 className="text-center text-2xl font-bold mb-6"> Password Reset Form</h1>
                    {
                        error && <h1 className="block animate-bounce font-bold mb-2 uppercase text-red-600" >
                            {error?.data?.message}
                        </h1>
                    }
                    <form onSubmit={handlePasswordReset}>
                        <div className="mb-4">

                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input onChange={(e)=>setEmail(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"   name="email" type="email" placeholder="Enter your email address" required />
                        </div>
                        <div className="mb-4">

                            <label className="block text-gray-700 font-bold mb-2" >
                                Pin Number
                            </label>
                            <input required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="pin" type="number" placeholder="enter your pin" />
                        </div>
                        <div className="mb-4">

                            <label className="block text-gray-700 font-bold mb-2" >
                                New Password
                            </label>
                            <input required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  name="password" type="password" placeholder="enter new password" />
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
                            {isLoading ? "Reseting..." : "Reset Password Now"}
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default PasswordReset;