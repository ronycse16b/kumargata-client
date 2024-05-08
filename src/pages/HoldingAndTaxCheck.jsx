import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import convertToBengaliNumber from '../util/convertToBengaliNumber'
import axios from "axios";

import SmallLoader from "../components/SmallLoader";

export default function HoldingAndTaxCheck() {

    
    const { ward } = useSelector((state) => state.ward);
    const { register, handleSubmit, setValue } = useForm();
    const [searchLoading, setSearchLoading] = useState(false);

    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const path = location.pathname;

    const onSubmit = async ({ ward, searchQuery }) => {

        try {
            setSearchLoading(true);

            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/data/search?wardNumber=${ward}&&searchValue=${searchQuery}`
            );

            setSearchResults(res.data);
            setSearchLoading(false);
        } catch (error) {
            setSearchLoading(false);
        }



    };





    return (
        <div className=" mt-5   relative  ">
             <div className="  mb-10  text-green-600 font-bold   ">
              <h6 className="underline">হোল্ডিং যাচাই </h6>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col lg:flex-row gap-2  max-w-[460px] sm:lg:max-w-[800px] items-center w-full print:hidden "
            >
                <div className="lg:w-1/2 w-full">
                    <select
                        {...register("ward")}
                        className="select select-sm flex-grow w-full h-7 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    >
                        <option value="" selected disabled>
                            ওয়ার্ড নাম্বার পছন্দ করুন
                        </option>
                        {ward &&
                            ward.map((w) => (
                                <option key={w.number} value={w.number}>
                                    {w.label}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="lg:w-1/3 w-full">
                    <input
                        {...register("searchQuery")}
                        type="text"
                        required
                        name="searchQuery"
                        placeholder="Holding"
                        className="flex-grow w-full h-8 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button disabled={searchLoading} type="submit" className="text-white flex items-center  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-1.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  ">

                   Find Now
                    
                </button>
            </form>


            {searchLoading ? (
                <SmallLoader title='Please wait...' />
            ) : (
                searchResults?.data && (
                    <>
                        <section className="text-gray-600 body-font    ">
                            <div className="  py-16   ">
                                <div className="flex shadow-2xl lg:max-w-4xl xl:max-w-5xl border-2 glass  rounded bg-white border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                                    <div className="flex-grow ">
                                        <h2 className="text-gray-900 text-md  title-font font-bold mb-3">
                                            নাম {searchResults?.data?.name}
                                        </h2>

                                        <p className="leading-relaxed text-sm ">
                                            <ul className="flex gap-10 border border-gray-400 rounded-md p-2">
                                                <div>
                                                    <li>পিতা / স্বামীর</li>
                                                    <li>গ্রামঃ </li>
                                                    <li>ওয়ার্ডঃ </li>
                                                    <li>হোল্ডিং</li>
                                                    <li>কর</li>
                                                    <li>বকেয়া</li>
                                                </div>
                                                <div>
                                                    <li>
                                                        {" "}
                                                        <span className="mr-4">:</span>
                                                        {searchResults?.data?.fatherName}
                                                    </li>

                                                    <li>
                                                        {" "}
                                                        <span className="mr-4">:</span>
                                                        {searchResults?.data?.villageName}
                                                    </li>
                                                    <li>
                                                        {" "}
                                                        <span className="mr-4 font-bold">:</span>
                                                        {convertToBengaliNumber(
                                                            searchResults?.data?.ward || 0
                                                        )}
                                                    </li>
                                                    <li>
                                                        {" "}
                                                        <span className="mr-4 font-bold">:</span>
                                                        {convertToBengaliNumber(
                                                            searchResults?.data?.holding || 0
                                                        )}
                                                    </li>
                                                    <li>
                                                        {" "}
                                                        <span className="mr-4 font-bold">:</span>
                                                        {convertToBengaliNumber(
                                                            searchResults?.data?.cor || 0
                                                        )}
                                                    </li>
                                                    <li>
                                                        {" "}
                                                        <span className="mr-4 font-bold">:</span>
                                                        {convertToBengaliNumber(
                                                            searchResults?.data?.due || 0
                                                        )}
                                                    </li>

                                                </div>
                                            </ul>
                                        </p>
                                        <div className="border border-gray-400 p-2 rounded-md my-4 text-center">
                                            {path === '/register-levied-taxes' && <h1 className="text-blue-900  font-bold flex justify-center items-center">
                                                {" "}
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
                                                </svg>{" "}
                                                আপানার ধার্যকৃত কর ,{" "}
                                                <span className="mx-2 ">
                                                    {convertToBengaliNumber(
                                                        searchResults?.data?.cor || 0
                                                    )}
                                                </span>{" "}
                                                টাকা
                                            </h1>}
                                            {path === '/holding-check' && <h1 className="text-green-600 animate-pulse  font-bold flex justify-center items-center">
                                                {" "}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>

                                                হোল্ডিং যাচাই সম্পুন্ন হয়েছে

                                            </h1>}

                                           
                                        </div>
                                        {path === '/holding-check' && <Link
                                            to={`/details/${searchResults?.data?._id}`}
                                            className="mt-3  bg-blue-600 text-white inline-flex items-center px-5 py-2 rounded-md"
                                        >
                                            Details
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                strokeWidth="2"
                                                className="w-4 h-4 ml-2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                        </Link>}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )
            )}
            {searchResults?.success === false && (
                <div className=" text-rose-600 font-bold animate-pulse  py-5">
                    No Data Found
                </div>
            )}

        </div>
    );
}
