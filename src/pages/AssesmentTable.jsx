// import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import {
    FaAddressBook,
    FaDollarSign,
    FaDonate,
    FaHandHolding,
    FaHandHoldingUsd,
    FaHome,
    FaHourglassStart,
    FaPrint,
    FaRegWindowClose,
    FaSearch,
    FaUsers,
} from "react-icons/fa";
import convertToBengaliNumber from "../util/convertToBengaliNumber";
import { Link, useLocation, useParams } from "react-router-dom";
import DataDetails from "../components/DataDetails";
import Loader from "../components/Loader";
import { useGetWardDataForCalculateQuery, useGetWardDataQuery } from "../features/api/authApi";
import SmallLoader from "../components/SmallLoader";

export default function AllData() {

    const { ward, loading } = useSelector((state) => state.ward);
    const [searchResults, setSearchResults] = useState();
    const [union, setUnion] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);

    const [page, setPage] = useState(1);
    const { id } = useParams();
    const initialPerPage = localStorage.getItem('perPage') || 5;
    const [perPage, setPerPage] = useState(parseInt(initialPerPage));
    const { data, isFetching: isLoading, refetch } = useGetWardDataQuery({ ward: id, page: page, perPage: perPage });
    const { data: calculateData, isFetching: isLoadingCalculateData, refetch: refetchCalculateData } = useGetWardDataForCalculateQuery({ ward: id, });
    const [searchQuery, setSearchQuery] = useState('')
    // useEffect hook to save perPage to localStorage whenever it changes
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        localStorage.setItem('perPage', perPage.toString());
    }, [perPage]); // Dependency array ensures this effect runs whenever perPage changes

    // Handler function to update perPage when select option changes
    const handlePerPageChange = (event) => {
        setPerPage(parseInt(event.target.value));
    };





    useEffect(() => {

        setTotalPages(data?.totalPages)
        refetchCalculateData()
    }, [data, id, refetchCalculateData]);

    const totalHolding = calculateData?.data?.reduce(
        (acc, currentValue) => {
            // Assuming "due" and "cor" are numeric properties in each element of the array
            const dueValue = currentValue.due || 0; // Use 0 if "due" is undefined or null
            const corValue = currentValue.cor || 0; // Use 0 if "cor" is undefined or null

            // Check if the "checkbox" array exists and has elements
            if (currentValue.checkbox && currentValue.checkbox.length > 0) {
                // Sum the "total" property for each element in the "checkbox" array
                currentValue.checkbox.forEach((checkboxItem) => {
                    acc.total += parseInt(checkboxItem?.total) || 0; // Use 0 if "total" is undefined or null
                });
            }

            // Update the accumulators for "due", "cor", and "total"
            acc.due += dueValue;
            acc.cor += corValue;

            return acc;
        },
        { due: 0, cor: 0, total: 0 } // Initialize total accumulator
    );






    const handlePreviousPage = () => {
        setPage(page - 1);
        refetch();
    };

    const handleNextPage = () => {
        setPage(page + 1);
        refetch();

    };


    const handleSearch = async (event) => {
        event.preventDefault();
        setSearchLoading(true);

        const searchRegex = new RegExp(searchQuery, 'i'); // 'i' flag for case-insensitive search

        const filterData = calculateData?.data?.filter(item => {
            // Filtering logic based on name, fatherName, holding, and mobile
            return (
                (item.name && (searchRegex.test(item.name) || item.name.includes(searchQuery))) || // Search in name
                (item.fatherName && (searchRegex.test(item.fatherName) || item.fatherName.includes(searchQuery))) || // Search in fatherName
                (item.holding && (searchRegex.test(item.holding.toString()) || item.holding.toString().includes(searchQuery)))
            );
        });

        setSearchResults(filterData);
        setSearchLoading(false);
    };

    const location = useLocation();

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <div className="  mb-3  text-green-600 font-bold mt-5  ">
          <h6 className="underline">অ্যাসেসমেন্ট তালিকা </h6>
        </div>
            <div className=" z-0    max-w-[375px] md:max-w-3xl  mt-5 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0  lg:max-w-full  xl:px-0 w-full ">
                <div className="  mx-auto   ">

                    <div className=" rounded-none    gap-5 flex flex-col lg:flex-row shadow-sm">
                        <div className=" card lg:w-[600px] h-20 p-5 rounded-md bg-rose-600 text-white glass">
                           
                            <div className="stat-title text-xs font-bold text-white">মোট খানা</div>
                            <div className="stat-value text-xs">
                                {isLoadingCalculateData ? (
                                    <span className=" animate-ping text-red-600 font-bold ">...</span>
                                ) : (
                                    <>{convertToBengaliNumber(calculateData?.data?.length.toLocaleString() || 0)}টি</>
                                )}
                            </div>
                        </div>
                        <div className=" card lg:w-[600px] h-20 p-5 rounded-md bg-green-600 text-white glass">
                           
                            <div className="stat-title text-xs font-bold text-white">মোট ধার্যকৃত কর</div>
                            <div className="stat-value text-xs">
                                {isLoadingCalculateData ? (
                                    <span className=" animate-ping text-red-600 font-bold ">...</span>
                                ) : (
                                    <>{convertToBengaliNumber(totalHolding?.cor.toLocaleString() || 0)} টাকা</>
                                )}
                            </div>
                        </div>
                        <div className=" card lg:w-[600px] h-20 p-5 rounded-md bg-blue-600 text-white glass">
                           
                            <div className="stat-title text-xs font-bold text-white">মোট কর আদায় </div>
                            <div className="stat-value text-xs">
                                {isLoadingCalculateData ? (
                                    <span className=" animate-ping text-red-600 font-bold ">...</span>
                                ) : (
                                    <>{convertToBengaliNumber(totalHolding?.total.toLocaleString() || 0)}টাকা</>
                                )}
                            </div>
                        </div>
                        <div className=" card lg:w-[600px] h-20 p-5 rounded-md bg-yellow-600 text-white glass">
                            
                            <div className="stat-title text-xs font-bold text-white">মোট বকেয়া </div>
                            <div className="stat-value text-xs">
                                {isLoadingCalculateData ? (
                                    <span className=" animate-ping text-red-600 font-bold ">...</span>
                                ) : (
                                    <>{convertToBengaliNumber(totalHolding?.due.toLocaleString() || 0)} টাকা</>
                                )}
                            </div>
                        </div>
                    </div>


                    {/* <h3 className="text-xl font-bold py-2">{union}</h3> */}
                    <div className="flex flex-wrap xl:flex-nowrap gap-2 mt-6">
                        {loading ? (
                            <SmallLoader title='Loading...' />
                        ) : (
                            <>
                                {ward?.map((w) => (
                                    <Link
                                        to={`/data-by-ward/${w?.number}`}
                                        key={w.number}
                                        className={`btn btn-sm shadow-sm ${location.pathname === `/data-by-ward/${w?.number}`
                                            ? 'bg-gradient-to-tr from-blue-600 to-blue-400 text-white'
                                            : 'bg-base-100 hover:bg-primary hover:text-base-100'
                                            }`}
                                    >
                                        {w.label}
                                    </Link>
                                ))}
                            </>
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        <form onSubmit={handleSearch} className="flex items-center gap-2 my-5">
                            <input
                                type="text"
                                onChange={(event) => setSearchQuery(event.target.value)}
                                placeholder="holding,name fathername"
                                name="search"
                                className="flex-grow w-full h-8 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline "
                                required
                            />
                            <button
                                type="submit"
                                className="flex items-center text-white btn btn-sm h-8 shadow-md bg-gradient-to-tr from-blue-600 to-blue-400"
                            >
                                Search <FaSearch />
                            </button>
                            {searchResults && <button
                                type="reset"
                                onClick={() => setSearchResults(null)}
                                className="flex items-center text-white btn btn-sm h-8 shadow-md bg-gradient-to-tr from-red-600 to-red-400"
                            >
                                Close search <FaRegWindowClose />
                            </button>}
                        </form>

                        {
                            data?.data?.length > 0 && <div className="print:hidden hidden lg:block">
                                <button
                                    className="flex items-center text-white btn btn-sm h-8 shadow-md bg-gradient-to-tr from-rose-600 to-rose-400 uppercase"
                                    onClick={handlePrint}
                                >
                                    print now <FaPrint />
                                </button>
                            </div>
                        }
                    </div>
                    {searchResults && (
                        <div className=" lg:text-sm bg-yellow-400 text-black font-bold">
                            Search Result:
                        </div>
                    )}
                    {isLoading ? (
                        <span className="text-red-600 font-bold animate-bounce">Loading...</span>
                    ) : (
                        <div
                            ref={componentRef}
                            className="overflow-x-auto border-white border-2      rounded-md  "
                        >
                            <div className="text-center  hidden print:block print:mb-5 ">
                                <h1 className="font-bold text-xl">১৪নং দৌলখাঁড় ইউনিয়ন পরিষদ</h1>
                                <p> ডাকঘরঃদৌলখাঁড় বাজার -৩৫৮০</p>
                                <p> উপজেলাঃনাঙ্গলকোট  জেলাঃকুমিল্লা</p>
                            </div>

                            <table className="table table-sm  table-zebra p-2  ">
                                <thead className="shadow-md bg-slate-500  text-white print:text-white   ">
                                    <tr className="">
                                        <th className=" border ">ক্রমিক</th>
                                        <th className=" border ">হোল্ডিং</th>
                                        <th className=" border ">ওয়ার্ড</th>
                                        <th className=" border min-w-32">মালিকের নাম</th>
                                        <th className=" border min-w-32">পিতার/স্বামীর নাম</th>
                                        <th className=" border ">মোবাইল</th>
                                        <th className=" border min-w-32">গ্রাম</th>
                                        <th className=" border ">পুরুষ</th>
                                        <th className=" border ">নারী</th>
                                        <th className=" border ">প্রতিবন্ধী</th>
                                        <th className=" border ">সঃ ভাতা</th>
                                        <th className=" border ">বাড়ির ধরন</th>
                                        <th className=" border min-w-32">পেশা</th>
                                        <th className=" border min-w-32">বাড়ির নাম</th>
                                        <th className=" border ">বার্ষিক আয়</th>
                                        <th className=" border ">বকেয়াঃ</th>
                                        <th className=" border ">করঃ</th>
                                        <th className=" border print:hidden ">সংশোধন</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {searchResults ? (
                                        <>
                                            {searchLoading ? (
                                                <div className="h-[80vh] flex items-center justify-center absolute left-1/2">
                                                    <span className="loading loading-spinner text-red-600 font-bold loading-lg"></span>
                                                </div>
                                            ) : searchResults && searchResults.length > 0 ? (
                                                searchResults.map((data, index) => (
                                                    <DataDetails
                                                        key={data._id}
                                                        setUnion={setUnion}
                                                        data={data}
                                                        index={index + (page - 1) * perPage}
                                                    />
                                                ))
                                            ) : (
                                                "not found"
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {data?.data &&
                                                data?.data.map((data, index) => (
                                                    <DataDetails
                                                        key={data._id}
                                                        refetch={refetch}
                                                        refetchCalculateData={refetchCalculateData}
                                                        data={data}
                                                        index={index + (page - 1) * perPage}
                                                    />
                                                ))}
                                        </>
                                    )}
                                </tbody>
                            </table>
                            {data?.countTotal === 0 && (
                                <p className="w-full bg-yellow-400 text-gray-500 font-bold">
                                    No data found
                                </p>
                            )}
                        </div>
                    )}
                    <div className="items-center space-y-2 text-xs sm:space-y-0 sm:space-x-3 flex pb-12 lg:pb-0 mt-4 ">
                        <span className="block ">
                            Page {page} of {totalPages}
                        </span>
                        <div className="space-x-1 ml-2 flex items-center gap-2">
                            <button
                                disabled={page <= 1}
                                onClick={handlePreviousPage}
                                title="previous"
                                type="button"
                                className="inline-flex items-center justify-center w-8 h-8 py-0 border border-base-100 rounded-md shadow"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4"
                                >
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                            <button
                                disabled={page >= totalPages}
                                onClick={handleNextPage}
                                title="next"
                                type="button"
                                className="inline-flex items-center justify-center w-8 h-8 py-0 border border-base-100 rounded-md shadow"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4"
                                >
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                            <select
                                defaultValue={perPage}
                                onChange={handlePerPageChange}
                                className="select  select-xs w-full max-w-[80px] outline-none border border-gray-400"
                            >

                                <option value={5}>05</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={18}>18</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                                <option value={300}>300</option>
                                <option value={400}>400</option>
                                <option value={500}>500</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
