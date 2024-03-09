import { useEffect, useState } from "react";
import { FaRegCheckCircle, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "qrcode";

import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Link } from "react-router-dom";
import convertToBengaliNumber from "../util/convertToBengaliNumber";
import { paymentFulfilled, paymentRejected, paymentStarted } from "../features/payments/tax.payment.slice";


export default function Tax() {
  const { ward } = useSelector((state) => state.ward);
  const [wardId, setWardId] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const { payment, loading, error } = useSelector((state) => state.payment);

  const [selectedYears, setSelectedYears] = useState([]);
  const [payableAmount, setPayableAmount] = useState(0);


  const [discountAmount, setDiscountAmount] = useState(0)
  const [year, setYear] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    watch,
  } = useForm();

  const handleCheckboxChange = (value) => {
    // Check if the value is already in the selectedYears array
    // If it is, remove it; otherwise, add it
    const updatedYears = selectedYears.includes(value)
      ? selectedYears.filter((year) => year !== value)
      : [...selectedYears, value];

    setSelectedYears(updatedYears);
  };

  const TotalCorAmount =
    searchResults?.data?.cor * selectedYears?.length + searchResults?.data?.due;


  const inTotal = TotalCorAmount - discountAmount;
  const newDue = inTotal - payableAmount;

  const dispatch = useDispatch();

  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * 100) + 1000000; // Generates a random number between 1 and 100
    return newRandomNumber;
  };

  const SerialNo = generateRandomNumber();

  const handelSearch = async (event) => {
    try {
      setSearchLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/data/search?wardNumber=${event.wardId
        }&&searchValue=${event?.holding}`
      );

      setSearchResults(res.data);
      setYear(res?.data?.data?.checkbox);
      setSearchLoading(false);
    } catch (error) {
      console.log(error.message);
      setSearchLoading(false);
    }
  };

  const checkbox = [
    { value: "2022-23", label: "২০২২-২৩" },
    { value: "2023-24", label: "২০২৩-২৪" },
    { value: "2024-25", label: "২০২৪-২৫" },
    { value: "2025-26", label: "২০২৫-২৬" },
    { value: "2026-27", label: "২০২৬-২৭" },
    { value: "2027-28", label: "২০২৭-২৮" },
    { value: "2028-29", label: "২০২৮-২৯" },
    { value: "2029-30", label: "২০২৯-৩০" },
    { value: "2030-31", label: "২০৩০-৩১" },
    { value: "2031-32", label: "২০৩১-৩২" },
  ];

  const onSubmitPayment = async (event) => {
    event.preventDefault();
    try {
      // dispatch(paymentStarting());
      dispatch(paymentStarted())

      const name = event.target.name.value;
      const fatherName = event.target.fatherName.value;
      const villageName = event.target.villageName.value;
      const mobile = event.target.mobile.value;
      const houseName = event.target.houseName.value;
      const paymentId = searchResults?.data?._id;
      const newData = {
        sn: SerialNo,
        name,
        fatherName,
        mobile,
        villageName,
        ward: searchResults?.data?.ward,
        holding: searchResults?.data?.holding,
        cor: searchResults?.data?.cor,
        paymentId,
        user: userInfo?.name,
        year: selectedYears,
        houseName,
        total: payableAmount,
        due: newDue,
        discount: discountAmount,
      };


      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/data/tax-pay`,
        newData
      );



      if (response?.data) {
        document.getElementById("my_modal_3").showModal();
        const GenerateQRCode = async (SerialNo) => {
          const url = `https://doulkhaup.web.app/api/payment-view/${SerialNo}`;

          try {
            const generatedQR = await QRCode.toDataURL(url, {
              width: 400,
              margin: 2,
            });
            dispatch(paymentFulfilled({ data: response.data, generatedQR }))

            await axios.put(
              `${import.meta.env.VITE_SERVER_URL}/api/data/update-qr/${response?.data?.taxPayment?._id
              }`,
              { generatedQR }
            );
          } catch (err) {
            console.error(err);
          }
        };

        // Call GenerateQRCode and wait for it to complete
        await GenerateQRCode(SerialNo);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message);
      dispatch(paymentRejected(error.message));
    }
  };


  return (
    <>
    
      <div className="sm:px-2 sm:mt-5  relative  ">
        {loading ? (
          <div className="h-[80vh] flex items-center justify-center absolute left-1/2">
            <h1 className="text-red-600 animate-pulse ">Payment Processing... </h1>
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit(handelSearch)}
              className="flex flex-col lg:flex-row gap-2 max-w-[360px] sm: lg:max-w-[800px] items-center w-full print:hidden sm:px-5"
            >
              <div className="lg:w-1/2 w-full ">
                <select
                  {...register("wardId", {
                    required: "একটি ওয়ার্ড পছন্দ করুন",
                  })}
                  className="select flex-grow w-full select-sm h-8 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                  defaultValue="" // Use defaultValue instead of selected
                >
                  <option value="" disabled>
                    ওয়ার্ড নাম্বার পছন্দ করুন
                  </option>
                  {ward &&
                    ward.map((w) => (
                      <option key={w.number} value={w.number}>
                        {w.label}
                      </option>
                    ))}
                </select>
                {errors.wardId && (
                  <span className="text-red-600 text-sm" role="alert">
                    {errors.wardId.message}
                  </span>
                )}
              </div>

              <div className="lg:w-1/3 w-full">
                <input
                  type="number"
                  {...register("holding", {
                    required: " হোল্ডিং নাম্বার দিন ১,৫",
                  })}
                  placeholder="হোল্ডিং নাম্বার দিন ১,৫"
                  className="flex-grow w-full h-8 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                />
                {errors.holding && (
                  <span className="text-red-600 text-sm" role="alert">
                    {errors.holding.message}
                  </span>
                )}
              </div>
              <button type="submit" className="btn btn-sm h-8 btn-warning ">
                Search
                <FaSearch />
              </button>
            </form>

            {searchLoading ? (
              <div className="h-[80vh] flex items-center justify-center absolute left-1/2">
                <span className="loading loading-spinner text-red-600 font-bold loading-lg"></span>
              </div>
            ) : (
              searchResults?.data && (
                <section className="text-gray-600 body-font sm:border     sm:px-5 mt-5  border-base-100 rounded-md relative print:hidden">
                  <div className=" pt-6">
                    <div className="lg:w-full  flex flex-col md:w-2/3 ">
                      <form
                        onSubmit={onSubmitPayment}

                      >
                        <div className="flex flex-col lg:flex-row border gap-2 bg-gray-200 p-5 shadow-md">
                          <div className="flex  gap-2  lg:w-1/2 w-full    ">

                            <div className=" w-1/2 ">
                              <div className="  w-full">
                                <div className="relative">
                                  <label
                                    htmlFor="name"
                                    className="leading-7 text-sm text-gray-600"
                                  >
                                    নামঃ
                                  </label>
                                  <input
                                    defaultValue={searchResults?.data?.name}
                                    type="text"
                                    readOnly
                                    required
                                    id="name"
                                    name="name"
                                    className="w-full bg-white  rounded border border-gray-300  focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out h-8"
                                  />
                                </div>
                              </div>
                              <div className="  w-full">
                                <div className="relative">
                                  <label
                                    htmlFor="email"
                                    className="leading-7 text-sm text-gray-600"
                                  >
                                    পিতা/ স্বামীর নামঃ
                                  </label>
                                  <input
                                    defaultValue={searchResults?.data?.fatherName}
                                    type="text"
                                    readOnly
                                    required
                                    id="email"
                                    name="fatherName"
                                    className="w-full bg-white  rounded border border-gray-300  focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out h-8"
                                  />
                                </div>
                              </div>


                              <div className="  w-full">
                                <div className="relative">
                                  <label
                                    htmlFor="email"
                                    className="leading-7 text-sm text-gray-600"
                                  >
                                    ওয়ার্ড নাম্বারঃ
                                  </label>
                                  <input
                                    value={convertToBengaliNumber(
                                      searchResults?.data?.ward || 0
                                    )}
                                    type="text"
                                    readOnly
                                    required
                                    name="wardNumber"
                                    className="w-full bg-white  rounded border border-gray-300  focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out h-8"
                                  />
                                </div>
                              </div>
                              <div className="  w-full">
                                <div className="relative">
                                  <label
                                    htmlFor="email"
                                    className="leading-7 text-sm text-gray-600"
                                  >
                                    হোল্ডিং নাম্বারঃ
                                  </label>
                                  <input
                                    value={convertToBengaliNumber(
                                      searchResults?.data?.holding || 0
                                    )}
                                    type="text"
                                    readOnly
                                    required
                                    name="holding"
                                    className="w-full bg-white  rounded border border-gray-300  focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out h-8"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="w-1/2">
                              <div className="  w-full">
                                <div className="relative">
                                  <label
                                    htmlFor="email"
                                    className="leading-7 text-sm text-gray-600"
                                  >
                                    গ্রাম / মহল্লাঃ
                                  </label>
                                  <input
                                    defaultValue={searchResults?.data?.villageName}
                                    type="text"
                                    readOnly
                                    required
                                    id="email"
                                    name="villageName"
                                    className="w-full bg-white  rounded border border-gray-300  focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out h-8"
                                  />
                                </div>
                              </div>


                              <div className="  w-full">
                                <div className="relative">
                                  <label
                                    htmlFor="email"
                                    className="leading-7 text-sm text-gray-600"
                                  >
                                    মোবাইলঃ
                                  </label>
                                  <input
                                    defaultValue={
                                      searchResults?.data?.mobile || 0
                                    }
                                    type="text"

                                    required
                                    id="email"
                                    name="mobile"
                                    className="w-full bg-white  rounded border border-gray-300  focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out h-8"
                                  />
                                </div>
                              </div>
                              <div className="  w-full">
                                <div className="relative">
                                  <label
                                    htmlFor="email"
                                    className="leading-7 text-sm text-gray-600"
                                  >
                                    বাড়ির নামঃ
                                  </label>
                                  <input
                                    value={searchResults?.data?.houseName}
                                    type="text"
                                    readOnly
                                    required
                                    id="email"
                                    name="houseName"
                                    className="w-full bg-white  rounded border border-gray-300  focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out h-8"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="lg:w-1/2 w-full ">
                            <div className="border border-gray-300  p-4 my-2 rounded-md ml-2 max-w-[360px] lg:max-w-full w-full    ">
                              <div className=" w-full ">
                                <div className=" ">
                                  <div>
                                    <label
                                      htmlFor="email"
                                      className="leading-7 text-sm text-gray-600"
                                    >
                                      ধার্যকৃত কর বছরঃ
                                    </label>
                                    <div className="grid  grid-cols-2 lg:grid-cols-3">
                                      {checkbox?.map((cb) => (
                                        <div
                                          key={cb.value}
                                          className="flex items-center border p-1 border-primary"
                                        >
                                          <input

                                            disabled={year?.some((item) =>
                                              item?.year.includes(cb.value)
                                            )}
                                            type="checkbox"
                                            id={cb.value}
                                            name={cb.value}
                                            value={cb.value}
                                            onChange={() =>
                                              handleCheckboxChange(cb.value)
                                            }
                                          />
                                          <label
                                            htmlFor={cb.value}
                                            className="ml-2"
                                          >
                                            {cb.label}
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>


                          </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-2 p-2 bg-gray-200 glass mt-10 shadow-md">

                          <div className=" lg:w-1/2 w-full flex justify-between py-1  border  ">

                            <div className="w-1/2 list-none ">
                              <li className="border px-2 font-bold border-gray-400 text-sm">Description</li>
                              <li className="border px-2 font-bold border-gray-400 text-sm">ধার্যকৃত কর</li>
                              {
                                searchResults?.data?.due > 0 && <li className="border px-2 font-bold border-gray-400 text-sm">পূর্বের বকেয়া</li>
                              }

                              {
                                newDue < inTotal && newDue !== 0 && <li className="border px-2 font-bold border-gray-400 text-sm">নতুন বকেয়া</li>
                              }

                              <li className="border px-2 font-bold border-gray-400 text-sm">ডিসকাউন্ট </li>
                              <li className="border px-2 font-bold border-gray-400 text-sm text-black">সবমোট টাকা</li>
                            </div>
                            <div className="w-1/2 list-none">
                              <li className="border px-2 font-bold border-gray-400 text-sm">Amount</li>
                              <li className="border px-2 font-bold border-gray-400 text-sm">{searchResults?.data?.cor}</li>
                              {
                                searchResults?.data?.due > 0 && <li className="border px-2 font-bold border-gray-400 text-sm">{searchResults?.data?.due}</li>
                              }

                              {
                                newDue < inTotal && newDue !== 0 && <li className="border px-2 font-bold border-gray-400 text-sm text-yellow-700">{newDue}</li>
                              }

                              <li className="border px-2 font-bold border-gray-400 text-sm">{discountAmount || 0}</li>
                              <li className="border px-2  border-gray-400 text-sm font-bold text-black">{inTotal}</li>
                            </div>

                          </div>
                          <div className="card lg:w-1/2 w-full">
                            <div className="w-full flex items-center gap-4 py-1 ">


                              {selectedYears.length > 0 && (
                                <div className=" lg:w-1/2 w-full">
                                  <div className="relative">
                                    <label
                                      htmlFor="email"
                                      className="leading-7 text-sm text-gray-600"
                                    >

                                    </label>
                                    <input
                                      onChange={(e) =>
                                        setDiscountAmount(e.target.value)
                                      }
                                      type="number"
                                      placeholder="ডিসকাউন্ট % "

                                      id="email"
                                      className="w-full  font-bold  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                  </div>
                                </div>
                              )}
                              {selectedYears.length > 0 && (
                                <div className=" lg:w-1/2 w-full">
                                  <div className="relative">
                                    <label
                                      htmlFor="email"
                                      className="leading-7 text-sm text-gray-600"
                                    >

                                    </label>
                                    <input
                                      onChange={(e) =>
                                        setPayableAmount(e.target.value)
                                      }
                                      type="number"
                                      placeholder="পেমেন্ট কৃত টাকার পরিমানঃ"
                                      required
                                      id="email"
                                      className="w-full  font-bold  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                  </div>
                                </div>
                              )}



                            </div>
                          </div>


                        </div>
                        <div className="  ">
                          <div className=" w-full mb-2 flex items-center justify-end gap-2 my-4 ">
                            <button
                              onClick={() => setSearchResults(null)}
                              className="flex btn bg-red-600 text-white"
                            >
                              CANCEL
                            </button>
                            <button
                              disabled={selectedYears.length === 0}
                              className="flex btn btn-info uppercase"
                            >
                              Payment now
                            </button>
                          </div>
                        </div>

                      </form>
                    </div>
                  </div>
                </section>
              )
            )}
            {searchResults?.success === false && (
              <span className="text-rose-600 font-bold sm:ml-10 py-5">
                Data Not Found
              </span>
            )}
          </>
        )}

        {/* modal */}

        {/* You can open the modal using document.getElementById('ID').showModal() method */}

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">

              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 to">
                ✕
              </button>

              <div>
                <div className="bg-base-100 ">
                  <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center">
                    <FaRegCheckCircle className="w-16 h-16 text-green-600" />
                  </div>
                  <h1 className="text-center font-bold text-2xl text-[#269426] mb-10">
                    Payment Successful
                  </h1>

                  <div className="">
                    <ul className="flex font-normal ga items-center justify-evenly text-sm list-none">
                      <li>
                        <h1>SN#</h1>
                        <h1>হোল্ডিং #</h1>
                        <h1>ওয়ার্ড #</h1>
                        <h1> নামঃ</h1>
                        <h1>পিতা / স্বামীর নামঃ</h1>

                        <h1>মোবাইলঃ</h1>
                        <h1>গ্রামঃ</h1>
                        <h1>বাড়ির নামঃ</h1>
                        <h1>সর্বমোট কর আদায়</h1>
                        <h1>বকেয়া</h1>
                        <h1>অর্থবছরঃ</h1>
                      </li>

                      {payment && (
                        <li>
                          <div>
                            <h1 className="font-bold">
                              {payment?.data?.taxPayment?.sn}
                            </h1>
                            <h1>
                              {convertToBengaliNumber(
                                payment?.data?.taxPayment?.holding ?? 0
                              )}
                            </h1>
                            <h1>{payment?.data?.taxPayment?.ward}</h1>
                            <h1>{payment?.data?.taxPayment?.name}</h1>
                            <h1>{payment?.data?.taxPayment?.fatherName}</h1>

                            <h1>
                              ০
                              {convertToBengaliNumber(
                                payment?.data?.taxPayment?.mobile || 0
                              )}
                            </h1>
                            <h1>{payment?.data?.taxPayment?.villageName}</h1>
                            <h1>{payment?.data?.taxPayment?.houseName}</h1>
                            <h1>
                              {convertToBengaliNumber(
                                payment?.data?.taxPayment?.total || 0
                              )}{" "}
                              =/ টাকা
                            </h1>
                            <h1>
                              {convertToBengaliNumber(
                                payment?.data?.taxPayment?.due || 0
                              )}{" "}
                              =/ টাকা
                            </h1>
                            <h1>
                              (
                              {convertToBengaliNumber(
                                payment?.data?.taxPayment?.year || 0
                              )}
                              )
                            </h1>
                          </div>
                        </li>
                      )}
                      <img
                        className="w-28 "
                        src={payment?.generatedQR}
                        alt=""
                      />
                    </ul>
                  </div>
                  <div className="card-actions justify-center mt-10 ">
                    <Link
                      to="/payment-print"
                      className="btn-primary text-white badge badge-outline "
                    >
                      PRINT RECEIPT
                    </Link>

                    <Link to="/" className="badge badge-outline  print:hidden">
                      GO HOME
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
}
