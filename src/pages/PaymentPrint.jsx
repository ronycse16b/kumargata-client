import { useRef } from "react";
import { FaPrint } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import '../style/payment.css'
import logo from '../assets/logo.png'
import convertToBengaliNumber from "../util/convertToBengaliNumber";
export default function PaymentPrint() {

  const { payment } = useSelector((state) => state.payment);


  console.log(payment);


  const gmtTime = new Date(payment?.data?.taxPayment?.createdAt);

  // Get the local time string
  const localTimeString = gmtTime.toLocaleString();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div
        ref={componentRef}
        id="componentToDownload"
        className=" grid grid-cols-1 lg:grid-cols-2 gap-2 max-w-4xl  mx-auto  bg-white print:flex   print:mx-0 print:my-0 print:px-0 print:py-0 actual-receipt"
      >
       <div className="relative">
        <img
          src={logo}
          className="left-24 w-64 object-cover absolute top-28 "
          alt=""
        />
       <div className="card-body relative bg-white opacity-95  mx-auto max-w-3xl border    ">
          <div className="   ">
            <div className="text-center ">
              <h1 className="font-bold text-blue-700 print:text-[14px] ">
                {payment?.data?.taxPayment?.union}
              </h1>
              <h3 className="font-bold text-[12px] rounded-md px-1 ">
                কর পরিশদের রশিদঃ {payment?.data?.taxPayment?.sn}
              </h3>
              <span className="font-bold text-[12px] rounded-full  px-1.5 py-0.5 bg-slate-300 ">
                অফিস কপি
              </span>
            </div>
          </div>

          <hr />

          <div className="flex max-w-2xl mx-auto font-normal gap-10 text-[12px] mt-4">
            <div className=" grid grid-cols-2 items-center">
              <ul>
                <li>হোল্ডিং #</li>
                <li>ওয়ার্ড #</li>
                <li>নামঃ</li>
                <li>পিতা / স্বামীর </li>
                <li>গ্রামঃ</li>
                <li>বাড়ির নামঃ</li>
                <li>মোবাইলঃ</li>
                <li>অর্থবছরঃ</li>
                <li>সর্বমোট টাকাঃ</li>
                <li>ডিসকাউন্টঃ</li>
                <li>বকেয়া</li>
              </ul>
              <ul>
                <li>
                  <span className="mr-5">:</span>
                  {convertToBengaliNumber(payment?.data?.taxPayment?.holding || 0) ||
                    "-"}
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {convertToBengaliNumber(payment?.data?.taxPayment?.ward || 0) || "-"}
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {payment?.data?.taxPayment?.name || "-"}
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {payment?.data?.taxPayment?.fatherName || "-"}
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {payment?.data?.taxPayment?.villageName || "-"}
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {payment?.data?.taxPayment?.houseName || "-"}
                </li>
                <li>
                  <span className="mr-5">:</span>০
                  {convertToBengaliNumber(payment?.data?.taxPayment?.mobile || 0) ||
                    "-"}{" "}
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {convertToBengaliNumber(payment?.data?.taxPayment?.year || 0) || "-"}
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {convertToBengaliNumber(payment?.data?.taxPayment?.total || 0) ||
                    "-"}{" "}
                  /=
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {convertToBengaliNumber(payment?.data?.taxPayment?.discount || 0) ||
                    "-"} /=
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {convertToBengaliNumber(payment?.data?.taxPayment?.due || 0) ||
                    "-"}{" "}
                  /=
                </li>
              </ul>
            </div>

            <div>
              <img
                className="w-20 "
                src={payment?.generatedQR}
                alt="QR Code"
              />
            </div>
          </div>

          <div className="mt-10 text-[11px] flex items-center justify-between ">
            <div>
              <h1 className="border-b-1  border-black">আদায়কারীর সাক্ষবঃ</h1>
              <p>{payment?.data?.taxPayment?.user}</p>
              <p>{localTimeString}</p>
            </div>
            <div>
              <p className="px-10">সীল</p>
            </div>
          </div>
          <div className=" mt-10">
            <hr />

            <p className="text-[11px] font-bold text-center">
              ***নেব সেবা দিব কর ইউনিয়ন হবে স্বনির্ভর***
            </p>

            <hr />
          </div>
        </div>
       </div>
       <div className="relative">
        <img
          src={logo}
          className="left-24 w-64 object-cover absolute top-28 "
          alt=""
        />
       <div className="card-body relative bg-white opacity-95  mx-auto max-w-3xl border    ">
          <div className="   ">
            <div className="text-center ">
              <h1 className="font-bold text-blue-700 print:text-[14px] ">
                {payment?.data?.taxPayment?.union}
              </h1>
              <h3 className="font-bold text-[12px] rounded-md px-1 ">
                কর পরিশদের রশিদঃ {payment?.data?.taxPayment?.sn}
              </h3>
              <span className="font-bold text-[12px] rounded-full  px-1.5 py-0.5 bg-slate-300 ">
                গ্রাহক কপি
              </span>
            </div>
          </div>

          <hr />

          <div className="flex max-w-2xl mx-auto font-normal gap-10 text-[12px] mt-4">
            <div className=" grid grid-cols-2 items-center">
              <ul>
                <li>হোল্ডিং #</li>
                <li>ওয়ার্ড #</li>
                <li>নামঃ</li>
                <li>পিতা / স্বামীর </li>
                <li>গ্রামঃ</li>
                <li>বাড়ির নামঃ</li>
                <li>মোবাইলঃ</li>
                <li>অর্থবছরঃ</li>
                <li>সর্বমোট টাকাঃ</li>
                <li>ডিসকাউন্টঃ</li>
                <li>বকেয়া</li>
              </ul>
              <ul>
                <li>
                  <span className="mr-5">:</span>
                  {convertToBengaliNumber(payment?.data?.taxPayment?.holding || 0) ||
                    "-"}
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {convertToBengaliNumber(payment?.data?.taxPayment?.ward || 0) || "-"}
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {payment?.data?.taxPayment?.name || "-"}
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {payment?.data?.taxPayment?.fatherName || "-"}
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {payment?.data?.taxPayment?.villageName || "-"}
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {payment?.data?.taxPayment?.houseName || "-"}
                </li>
                <li>
                  <span className="mr-5">:</span>০
                  {convertToBengaliNumber(payment?.data?.taxPayment?.mobile || 0) ||
                    "-"}{" "}
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {convertToBengaliNumber(payment?.data?.taxPayment?.year || 0) || "-"}
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {convertToBengaliNumber(payment?.data?.taxPayment?.total || 0) ||
                    "-"}{" "}
                  /=
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {convertToBengaliNumber(payment?.data?.taxPayment?.discount || 0) ||
                    "-"}{" "}
                  /=
                </li>
                <li>
                  <span className="mr-5">:</span>
                  {convertToBengaliNumber(payment?.data?.taxPayment?.due || 0) ||
                    "-"}{" "}
                  =/
                </li>
              </ul>
            </div>

            <div>
              <img
                className="w-20 "
                src={payment?.generatedQR}
                alt="QR Code"
              />
            </div>
          </div>

          <div className="mt-10 text-[11px] flex items-center justify-between ">
            <div>
              <h1 className="border-b-1  border-black">আদায়কারীর সাক্ষবঃ</h1>
              <p>{payment?.data?.taxPayment?.user}</p>
              <p>{localTimeString}</p>
            </div>
            <div>
              <p className="px-10">সীল</p>
            </div>
          </div>
          <div className=" mt-10">
            <hr />

            <p className="text-[11px] font-bold text-center">
              ***নেব সেবা দিব কর ইউনিয়ন হবে স্বনির্ভর***
            </p>

            <hr />
          </div>
        </div>
       </div>
       
       
      </div>
      <div className="flex justify-center px-10 print:hidden mt-10">
        <button
          className="flex items-center uppercase text-white btn btn-sm h-10 shadow-md bg-gradient-to-tr from-rose-600 to-rose-400"
          onClick={handlePrint}
        >
          print now <FaPrint />
        </button>
      </div>
    </div>
  );
}
