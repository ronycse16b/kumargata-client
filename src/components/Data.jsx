import React from 'react';
import convertToBengaliNumber from '../util/convertToBengaliNumber';

export default function Data({singleData,componentRef}) {

    const gmtTime = new Date(singleData?.recipt?.createdAt);
    const localTimeString = gmtTime.toLocaleString();



  return (
    <>
     <div ref={componentRef} id="componentToDownload"

className=" grid grid-cols-1 lg:grid-cols-2 gap-2 max-w-4xl  mx-auto  bg-white    print:mx-0 print:my-0 print:px-0 print:py-0 actual-receipt"
>
<div className="card-body mx-auto max-w-3xl border ">
    <div className=" ">

        <div className="text-center">
            <h1 className="font-bold text-blue-700 print:text-[14px] ">
                {singleData?.recipt?.union}
            </h1>
            <h3 className="font-bold text-[12px] rounded-md px-1 ">
                কর পরিশদের রশিদঃ {singleData?.recipt?.sn}
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
                <li>বকেয়া</li>
            </ul>
            <ul>
                <li><span className="mr-5">:</span>{convertToBengaliNumber(singleData?.recipt?.holding || 0) || "-"}</li>
                <li><span className="mr-5">:</span>{convertToBengaliNumber(singleData?.recipt?.ward || 0) || "-"}</li>
                <li><span className="mr-5">:</span>{singleData?.recipt?.name || "-"}</li>
                <li><span className="mr-5">:</span>{singleData?.recipt?.fatherName || "-"}</li>
                <li><span className="mr-5">:</span>{singleData?.recipt?.villageName || "-"}</li>
                <li><span className="mr-5">:</span>{singleData?.recipt?.houseName || "-"}</li>
                <li><span className="mr-5">:</span>০{convertToBengaliNumber(singleData?.recipt?.mobile || 0) || "-"} </li>
                <li><span className="mr-5">:</span>{convertToBengaliNumber(singleData?.recipt?.year || 0) || "-"}</li>
                <li><span className="mr-5">:</span>{convertToBengaliNumber(singleData?.recipt?.total || 0) || "-"} =/</li>
                <li><span className="mr-5">:</span>{convertToBengaliNumber(singleData?.recipt?.due || 0) || "-"} =/</li>
            </ul>
        </div>


        <div>
            <img className="w-20 " src={singleData?.recipt?.qr} alt="QR Code" />
        </div>
    </div>

    <div className="mt-10 text-[11px] flex items-center justify-between ">
        <div>
            <h1 className="border-b-1  border-black">আদায়কারীর সাক্ষবঃ</h1>
            <p>{singleData?.recipt?.user}</p>
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
<div className="card-body mx-auto max-w-3xl border ">
    <div className=" ">

        <div className="text-center">
            <h1 className="font-bold text-blue-700 print:text-[14px] ">
                {singleData?.recipt?.union}
            </h1>
            <h3 className="font-bold text-[12px] rounded-md px-1 ">
                কর পরিশদের রশিদঃ {singleData?.recipt?.sn}
            </h3>
            <span className="font-bold text-[12px] rounded-full  px-1.5 py-0.5 bg-slate-300 ">
                গ্রহক কপি
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
                <li>বকেয়া</li>
            </ul>
            <ul>
                <li><span className="mr-5">:</span>{convertToBengaliNumber(singleData?.recipt?.holding || 0) || "-"}</li>
                <li><span className="mr-5">:</span>{convertToBengaliNumber(singleData?.recipt?.ward || 0) || "-"}</li>
                <li><span className="mr-5">:</span>{singleData?.recipt?.name || "-"}</li>
                <li><span className="mr-5">:</span>{singleData?.recipt?.fatherName || "-"}</li>
                <li><span className="mr-5">:</span>{singleData?.recipt?.villageName || "-"}</li>
                <li><span className="mr-5">:</span>{singleData?.recipt?.houseName || "-"}</li>
                <li><span className="mr-5">:</span>০{convertToBengaliNumber(singleData?.recipt?.mobile || 0) || "-"} </li>
                <li><span className="mr-5">:</span>{convertToBengaliNumber(singleData?.recipt?.year || 0) || "-"}</li>
                <li><span className="mr-5">:</span>{convertToBengaliNumber(singleData?.recipt?.total || 0) || "-"} =/</li>
                <li><span className="mr-5">:</span>{convertToBengaliNumber(singleData?.recipt?.due || 0) || "-"} =/</li>
            </ul>
        </div>


        <div>
            <img className="w-20 " src={singleData?.recipt?.qr} alt="QR Code" />
        </div>
    </div>

    <div className="mt-10 text-[11px] flex items-center justify-between ">
        <div>
            <h1 className="border-b-1  border-black">আদায়কারীর সাক্ষবঃ</h1>
            <p>{singleData?.recipt?.user}</p>
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
    </>
  );
}
