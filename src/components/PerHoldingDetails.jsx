import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import convertToBengaliNumber from "../util/convertToBengaliNumber";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";
import { useGetSingleDetailsQuery } from "../features/api/authApi";

export default function PerHoldingDetails() {

  const [year, setyear] = useState([]);
  const { id } = useParams();
  const { data, isFetching: isLoading,refetch  } = useGetSingleDetailsQuery({ id: id });

  useEffect(() => {
    if (data?.data?.checkbox) {
      setyear(data?.data?.checkbox);
      refetch()
    }
  }, [id, data,refetch])




  const dateObject = new Date(data?.data?.createdAt);
  // Options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Dhaka", // Set the time zone to Bangladeshi time
  };

  // Format the date using toLocaleString
  const formattedDate = dateObject.toLocaleString("en-US", options);

  const formatDateInBangla = (dateString) => {
    const dateObject = new Date(dateString);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    };
    const formattedDate = new Intl.DateTimeFormat("bn-BD", options).format(
      dateObject
    );
    return formattedDate;
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="">
      {
        isLoading ? <div className="h-[80vh] flex items-center justify-center absolute left-1/2">
          <span className="loading loading-spinner text-red-600 font-bold loading-lg"></span>
        </div> : <>

          <div
            ref={componentRef}
            className="container mx-auto p-8 max-w-4xl bg-white    h-auto border "
          >
            <header className="flex flex-col sm:flex-row justify-around items-center p-4">
              {/* Logo and Union Parishad Information */}
              {/* <div className="flex-shrink-0">
            <img
              className="w-24"
              src="https://laksampurbaup.comillalg.gov.bd/logo_images/logo.png"
              alt=""
            />
          </div> */}
              <div className="text-center mt-2">
                <h1 className="text-blue-800 text-xl font-bold mb-1">
                  ১৪নং দৌলখাঁড় ইউনিয়ন পরিষদ
                </h1>
                <h2 className="text-sm mb-1"> ডাকঘরঃ দৌলখাঁড় বাজার -৩৫৮০</h2>
                <h3 className="text-sm mb-1">উপজেলাঃনাঙ্গলকোট  জেলাঃকুমিল্লা</h3>
                <h4 className="text-sm">
                  web:{" "}
                  <span className="text-blue-900 underline">
                    https://doulkhaup.comillalg.gov.bd
                  </span>
                </h4>
              </div>
              {/* Government Logo */}
              {/* <div className="flex-shrink-0 hidden sm:block">
            <img
              className="w-24"
              src="https://seeklogo.com/images/B/bangladesh-govt-logo-A2C7688845-seeklogo.com.png"
              alt=""
            />
          </div> */}
            </header>

            <main className="mt-10">
              <div className="text-center font-bold text-md">
                <h1 className="underline">আবেদন তথ্য</h1>
              </div>
              <div className="flex justify-evenly flex-col sm:flex-row">
                <div className="mt-10 px-5 flex items-center text-sm">
                  <div className="list-none">
                    <ul>
                      <li className="flex gap-10 justify-between items-center">
                        <span>আবেদনের তারিখ</span> <span className="">:</span>
                      </li>
                      <li className="flex gap-10 justify-between items-center">
                        <span>নাম</span> <span className="">:</span>
                      </li>
                      <li className="flex gap-10 justify-between items-center">
                        <span>পিতার নাম</span> <span className="">:</span>
                      </li>
                      <li className="flex gap-10 justify-between items-center">
                        <span>মাতার নাম</span> <span className="">:</span>
                      </li>
                      <li className="flex gap-10 justify-between items-center">
                        <span>মোবাইল</span> <span className="">:</span>
                      </li>
                      {/* <li className="flex gap-10 justify-between items-center">
                    <span>জন্ম তারিখ</span> <span className="">:</span>
                  </li>
                  <li className="flex gap-10 justify-between items-center">
                    <span>এন আইডি নম্বর</span> <span className="">:</span>
                  </li>
                  <li className="flex gap-10 justify-between items-center">
                    <span>জন্ম নিবন্ধন নম্বর</span> <span className="">:</span>
                  </li> */}
                    </ul>
                  </div>
                  <div className="list-none ml-5">
                    <ul>
                      <li className="">
                        <span>{formattedDate}</span>
                      </li>
                      <li className="">
                        <span>{data?.data?.name || "-"}</span>
                      </li>
                      <li className="">
                        <span>{data?.data?.fatherName || "-"}</span>
                      </li>
                      <li className="">
                        <span>{data?.data?.motherName || "-"}</span>
                      </li>
                      <li className="">
                        <span>
                          {convertToBengaliNumber(data?.data?.mobile ? '0' + data?.data?.mobile : '' || 0) || "-"}
                        </span>
                      </li>

                      {/* <li className="">
                    <span>
                      {formatDateInBangla(data?.data?.dateOfBirth || 0) || "-"}
                    </span>
                  </li> */}
                      {/* <li className="">
                    <span>{data?.data?.nidNumber || "-"}</span>
                  </li>
                  <li className="">
                    <span>{data?.data?.birthRegNumber || "-"}</span>
                  </li> */}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 px-5 flex items-center text-sm">
                  <div className="list-none">
                    <ul>

                      <li className="flex gap-10 justify-between items-center">
                        <span>পেশা</span> <span className="">:</span>
                      </li>

                      <li className="flex gap-10 justify-between items-center">
                        <span>বাড়ির নাম</span> <span className="">:</span>
                      </li>
                      <li className="flex gap-10 justify-between items-center">
                        <span>গ্রাম</span> <span className="">:</span>
                      </li>
                      <li className="flex gap-10 justify-between items-center">
                        <span>ওয়ার্ড </span> <span className="">:</span>
                      </li>
                      <li className="flex gap-10 justify-between items-center">
                        <span>হোল্ডিং</span> <span className="">:</span>
                      </li>
                    </ul>
                  </div>
                  <div className="list-none ml-5">
                    <ul>

                      <li className="">
                        <span>{data?.data?.profession || "-"}</span>
                      </li>
                      <li className="">
                        <span>{data?.data?.houseName || "-"}</span>
                      </li>
                      <li className="">
                        <span>{data?.data?.villageName || "-"}</span>
                      </li>
                      <li className="">
                        <span>
                          {convertToBengaliNumber(data?.data?.ward || 0) || "-"}
                        </span>
                      </li>
                      <li className="">
                        <span>
                          {convertToBengaliNumber(data?.data?.holding || 0) || "-"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className=" sm:mx-[80px] print:sm:mx-[50px] text-center sm:text-start  text-sm font-bold mt-14 mb-8">
                <h1 className="underline">এসেসমেন্ট তথ্য</h1>
              </div>
              <div className="px-10 max-w-3xl mx-auto">
                <table className=" w-full  ">
                  <thead className="text-sm">
                    <tr>
                      <th className="border px-4 py-2">পুরুষ</th>
                      <th className="border px-4 py-2">মহিলা</th>
                    </tr>
                  </thead>
                  <tbody className="text-center text-sm">
                    <tr>
                      <td className="border px-4 py-2">
                        <span>
                          {convertToBengaliNumber(data?.data?.male || 0) || "-"}
                        </span>{" "}
                        জন
                      </td>
                      <td className="border px-4 py-2">
                        <span>
                          {convertToBengaliNumber(data?.data?.female || 0) || "-"}
                        </span>{" "}
                        জন
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between max-w-[690px] print:max-w-[590px] mx-auto flex-col sm:flex-row">
                <div className="mt-10  sm:mx-[20px] flex items-center text-sm">
                  <div className="list-none">
                    <ul>
                      <li className="flex gap-10 justify-between items-center">
                        <span>ধার্যকৃত কর</span> <span className="">:</span>
                      </li>
                      <li className="flex gap-10 justify-between items-center">
                        <span>বকেয়া</span> <span className="">:</span>
                      </li>
                    </ul>
                  </div>
                  <div className="list-none ml-5">
                    <ul>
                      <li className="">
                        <span>{convertToBengaliNumber(data?.data?.cor || 0) || "-"}</span>
                      </li>
                      <li className="">
                        <span>{convertToBengaliNumber(data?.data?.due || 0) || "-"}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-10 px-5 flex items-center text-sm">
                  <div className="list-none">
                    <ul>
                      <li className="flex gap-10 justify-between items-center">
                        <span>বার্ষিক মূল্যায়ন</span> <span className="">:</span>
                      </li>
                      {/* <li className="flex gap-10 justify-between items-center">
                    <span>কর আদায়কৃত অর্থবছর </span> <span className="">:</span>
                  </li> */}
                    </ul>
                  </div>
                  <div className="list-none ml-5">
                    <ul>
                      <li className="">
                        <span>
                          {convertToBengaliNumber(data?.data?.yearMullayon || 0) || "-"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className=" sm:mx-[90px] text-center sm:text-start  text-sm  mt-4 mb-8">
                <h1 className="text-[12px] text-blue-800 font-bold">
                  কর আদায়কৃত অর্থবছর
                </h1>
                <hr />
                <div className="flex gap-1 mt-2 text-[10px ] ">
                  {year?.map((y, index) => (
                    <div className="flex flex-col gap-1 ">
                      <span
                        className="border px-2 border-blue-800 "
                        key={index + 1}
                      >
                        {convertToBengaliNumber(y?.year || 0) || "-"}
                      </span>
                      <span
                        className="border px-2 border-blue-800 "
                        key={index + 1}
                      >
                        {convertToBengaliNumber(y?.total || 0) || "-"}=/
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className=" sm:mx-[80px] print:sm:mx-[50px] text-center sm:text-start  text-sm font-bold mt-6 mb-4">
                <h1 className="underline">আবাসনের তথ্য</h1>
              </div>
              <div className="px-10 max-w-3xl mx-auto">
                <table className=" w-full  ">
                  <thead className="text-sm">
                    <tr>
                      <th className="border px-4 py-2">বাড়ির ধরন</th>
                      <th className="border px-4 py-2">{data?.data?.house || "-"}</th>
                    </tr>
                  </thead>
                  <tbody className="text-center text-sm"></tbody>
                </table>
              </div>
            </main>
            <div className="  sm:mx-[80px] print:sm:mx-[50px] text-center sm:text-start text-sm font-bold  mb-2 mt-5">
              <h1 className="underline ">নির্দেশনাবলী</h1>
            </div>
            <footer className="px-10 max-w-3xl text-sm mx-auto bottom-0 my-6">
              <p>
                -1) এলাকার ১ জন ওয়ার্ড মেম্বার কর্তৃক সতায়িত করে ইউনিয়ন পরিষদে জমা
                দিন ।
              </p>
              <p>-২) ১ কপি পাসপোর্ট সাইজ ছবি,(সতায়িত) ।</p>
              <p>
                -৩) আবেদন পত্রের অবস্থা জানার জন্য SL Number দিয়ে ওয়েব সাইট থেকে
                যাচাই করুন ।
              </p>
            </footer>
          </div>
          <div className="flex justify-center px-10 print:hidden my-10">
            <button
              className="flex items-center text-white btn btn-sm h-10 shadow-md bg-gradient-to-tr from-rose-600 to-rose-400 uppercase"
              onClick={handlePrint}
            >
              print now <FaPrint />
            </button>
          </div>

        </>
      }

    </div>
  );
}
