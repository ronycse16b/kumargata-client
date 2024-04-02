import axios from "axios";
import toast from "react-hot-toast";
import { useRequestPasswordResetMutation } from "../features/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const RequestForgotPassword = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const [requestPassword, { isError, error, isLoading }] = useRequestPasswordResetMutation();






    const handleResetRequest = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;

        try {

            const response = await requestPassword({ email });
            if (response?.data) {
                setOpenModal(true)
                toast.success(response?.data)
                // navigate('/password-reset');
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
                        <p className="px-1 mb-3 text-sm opacity-80 text-black font-bold">Your password reset mail wass Sent Successfully <br/> please chcek inbox</p>
                        <Link to='/password-reset' className="me-2 rounded-sm bg-green-700 px-6 py-1 text-white uppercase">change password</Link>
                    </div>
                </div>
            </div>
            <div className="min-h-screen bg-gradient-to-tl from-green-700 via-teal-800 to-cyan-900 flex items-center justify-center">

                <div className=" border rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full text-white">
                    <h1 className="text-center text-2xl font-bold mb-6">Forgot Password</h1>
                    {
                        error && <h1 className="block animate-bounce font-bold mb-2 uppercase text-red-600" >
                            {error?.data?.message}
                        </h1>
                    }
                    <form onSubmit={handleResetRequest}>
                        <div className="mb-4">

                            <label className="block text-gray-200 font-bold mb-2" htmlFor="email">
                                Email 
                            </label>
                            <input required className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Enter your email address" />
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
                            {isLoading ? "Processing..." : "Request Reset Password"}
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default RequestForgotPassword;