import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import {
  useGetVillageQuery,
  useGetWardDataForCalculateQuery,
  useGetWardDataQuery,
  usePostApplicationDataMutation,
} from "../features/api/authApi";
import axios from "axios";

export default function AddDataFrom() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    resetField,
    watch,
  } = useForm();

  const { ward, loading } = useSelector((state) => state.ward);
  const { userInfo } = useSelector((state) => state.auth);
  const [isSaving, setIsSaving] = useState(false);
  const [villageData, setVillageData] = useState([]);

  const [wardId, setWardId] = useState("");
  const { data, isFetching } = useGetVillageQuery({ ward: wardId });

  const backendURL = import.meta.env.VITE_SERVER_URL;

  const [nextHolding, setNextHolding] = useState(null);
  const [error, setError] = useState(null);

  const previewNextHolding = async () => {
  
    try {
      const response = await fetch(`${backendURL}/api/data/next-holding/${wardId}`);
      const data = await response.json();
      if (response.ok) {
        setNextHolding(data.nextHolding);
        setError(null);
      } else {
        setError(data.error);
        setNextHolding(null);
      }
    } catch (err) {
      setError('Error fetching the next holding number.');
      setNextHolding(null);
    }
  }

  useEffect(() => {
    previewNextHolding()
  }, [wardId ]);




  useEffect(() => {
    setVillageData(data?.village);
  }, [data, wardId, isFetching]);

  const [postApplicationData, { isError, isSuccess }] =
    usePostApplicationDataMutation();

  //create data function

  const handleCreateData = async (FieldData) => {
    try {
      setIsSaving(true);

      const userName = await userInfo?.name;

      const updatedFieldData = {
        ...FieldData,
        user: userName,
        ward: wardId,
        due: FieldData.due || 0,
        // holding:generatedNumber
      };

      // console.log(updatedFieldData);
      // setIsSaving(false);
      const res = await postApplicationData(updatedFieldData);

      if (res && res.data) {
        toast.success(res.data?.message);
        setIsSaving(false);

        // Reset the entire form
        reset();
      //  refetchCalculateData();
      previewNextHolding();

      } else {
        toast.error(res.error.data?.message);
        setIsSaving(false);
      }
    } catch (error) {
      setIsSaving(false);
      toast.error(error.message);
    }
  };

  return (
    <section className=" mt-5   rounded-md  scrollbar-hide md:max-w-3xl lg:max-w-full  ">
      <div className="  mb-3  text-green-600 font-bold   ">
        <h6 className="underline">এসেসমেন্ট আবেদন</h6>
        
      
      </div>
      <div className=" py-2 lg:p-2 ">
        <div className="xl:max-w-[970px] mx-auto">
          <div className=""></div>
          <div className="sm:mt-10">
            <form onSubmit={handleSubmit(handleCreateData)}>
              <div className=" border relative shadow-sm  bg-white max-w-[720px] lg:max-w-[970px]     mt-10">
                <h1 className="font-bold text-sm underline -mt-[10px] absolute z-50 ">
                  ব্যাক্তিগত তথ্যঃ{" "}
                </h1>
                <div className="flex flex-col lg:flex-row py-4 sm:p-10 glass   justify-between items-center gap-10">
                  <div className=" flex justify-center sm:gap-8 gap-2   ">
                    <div className="label-child space-y-9 lg:space-y-9 ">
                      <div className="">
                        <label className="text-sm" htmlfor="">
                          নামঃ (বাংলায়)
                        </label>
                      </div>
                      <div>
                        <label className="text-sm" htmlfor="">
                          পিতার নামঃ
                        </label>
                      </div>
                      <div>
                        <label className="text-sm" htmlfor="">
                          মাতার নামঃ
                        </label>
                      </div>
                      <div>
                        <label className="text-sm" htmlfor="">
                          জন্ম তারিখঃ
                        </label>
                      </div>
                      <div>
                        <label className="text-sm" htmlfor="">
                        প্রতিবন্ধীঃ
                        </label>
                      </div>
                    </div>
                    <div className=" space-y-[17px]">
                      <div className="">
                        <input
                          type="text"
                          className=" flex-grow w-full h-10 px-2  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                          placeholder="আব্দুল সালাম"
                          {...register("name", {
                            required: "Required",
                          })}
                        />
                        {errors.name && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.name.message}
                          </span>
                        )}
                      </div>
                      <div className="">
                        <input
                          type="text"
                          className="flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                          placeholder="সালাম"
                          {...register("fatherName")}
                        />
                        {errors.fatherName && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.fatherName.message}
                          </span>
                        )}
                      </div>
                      <div className="">
                        <input
                          type="text"
                          className="flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                          placeholder="সালমা বেগম"
                          {...register("motherName")}
                        />
                        {errors.motherName && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.motherName.message}
                          </span>
                        )}
                      </div>
                      <div className="">
                        <input
                          type="date"
                          className="flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                          placeholder="সালমা বেগম"
                          {...register("dateOfBirth")}
                        />
                        {errors.dateOfBirth && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.dateOfBirth.message}
                          </span>
                        )}
                      </div>
                      <div className="">
                        <select
                          {...register("potibondhi")}
                          className="select select-sm  flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline max-w-xs "
                        >
                          <option value="">পছন্দ করুন</option>
                          <option value="হ্যাঁ">হ্যাঁ</option>
                          <option value="না">না</option>
                          
                        </select>
                        {errors.potibondhi && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.potibondhi.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className=" flex justify-center gap-8 mt-3 sm:gap-8 ">
                    <div className="label-child space-y-9">
                      <div>
                        <label className="text-sm" htmlfor="grid-password">
                          এন আইডি/জন্ম নিবন্ধনঃ
                        </label>
                      </div>
                      <div>
                        <label className="text-sm" htmlfor="grid-password">
                          মোবাইলঃ
                        </label>
                      </div>
                      <div>
                        <label className="text-sm" htmlfor="grid-password">
                          পেশাঃ
                        </label>
                      </div>
                      <div>
                        <label className="text-sm" htmlfor="grid-password">
                          বৈবাহিক অবস্থাঃ
                        </label>
                      </div>
                      <div>
                        <label className="text-sm" htmlfor="">
                        সরকারি ভাতাঃ

                        </label>
                      </div>
                    </div>
                    <div className=" space-y-[17px]">
                      <div className="">
                        <input
                          type="number"
                          {...register("nid")}
                          className="flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                          placeholder="0177XXXXXXXXXX"
                        />
                        {errors.nid && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.nid.message}
                          </span>
                        )}
                      </div>
                      <div className="">
                        <input
                          type="number"
                          {...register("mobile")}
                          className="flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                          placeholder="0177XXXXXXXXXX"
                        />
                        {errors.mobile && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.mobile.message}
                          </span>
                        )}
                      </div>
                      <div className="">
                        <select
                          {...register("profession")}
                          className="select select-sm  flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline max-w-xs "
                        >
                          <option value="">পছন্দ করুন</option>
                          <option value="চাকুরিজীবি">চাকুরিজীবি</option>
                          <option value="প্রবাসী">প্রবাসী</option>
                          <option value="ব্যবসা">ব্যবসা</option>
                          <option value="দিন মজুর">দিন মজুর</option>
                          <option value="কৃষক">কৃষক</option>
                          <option value="অন্যান্য">অন্যান্য</option>
                        </select>
                        {errors.profession && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.profession.message}
                          </span>
                        )}
                      </div>
                      <div className="">
                        <select
                          {...register("marriedStatus")}
                          className="select select-sm  flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline max-w-xs "
                        >
                          <option value="">পছন্দ করুন</option>
                          <option value="বিবাহিত">বিবাহিত</option>
                          <option value="অবিবাহিত">অবিবাহিত</option>
                          <option value="তালাকপ্রাপ্ত">তালাকপ্রাপ্ত</option>
                          <option value="বিধবা">বিধবা</option>
                          <option value="অন্যান্য">অন্যান্য</option>
                        </select>
                        {errors.marriedStatus && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.marriedStatus.message}
                          </span>
                        )}
                      </div>
                      <div className="">
                        <select
                          {...register("gov_vata")}
                          className="select select-sm  flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline max-w-xs "
                        >
                          <option value="">পছন্দ করুন</option>
                          <option value="হ্যাঁ">হ্যাঁ</option>
                          <option value="না">না</option>
                          
                        </select>
                        {errors.gov_vata && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.gov_vata.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border relative shadow-sm border-white bg-white max-w-[720px] lg:max-w-[970px]      mt-10">
                <h1 className="font-bold text-sm underline -mt-[10px] z-50 absolute">
                  এসেসমেন্ট তথ্য :
                </h1>
                <div className=" flex flex-col lg:flex-row py-4 sm:p-10  glass justify-between  items-center gap-10 ">
                  <div className=" flex  gap-3 justify-between  ">
                    <div className="child space-y-8">
                      <div>
                        <label className="text-sm" htmlfor="grid-password">
                          ওয়ার্ড নাম্বারঃ
                        </label>
                      </div>
                      <div>
                        <label className="text-sm" htmlfor="grid-password">
                          গ্রামঃ
                        </label>
                      </div>
                      {/* <div>
                        <label className="text-sm" htmlfor="grid-password">
                          বাড়ির নামঃ
                        </label>
                      </div> */}

                      <div>
                        <label className="text-sm" htmlfor="grid-password">
                          পুরুষ সংখ্যাঃ
                        </label>
                      </div>
                      <div>
                        <label
                          className="sm:text-sm text-[13px]   "
                          htmlfor="grid-password"
                        >
                          বার্ষিক আয়
                        </label>
                      </div>
                    </div>
                    <div className="child-2 space-y-4">
                      <div className="">
                        <select
                          {...register("ward", {
                            required: "ওয়ার্ড নাম্বর দিন",
                          })}
                          onChange={(e) => {
                            setWardId(e.target.value);
                          }}
                          className="select select-sm  flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline max-w-xs "
                        >
                          {loading ? (
                            "Loading..."
                          ) : (
                            <option selected value="">
                              পছন্দ করুন
                            </option>
                          )}
                          {ward?.map((w) => (
                            <option key={w.number} value={w.number}>
                              {w.label}
                            </option>
                          ))}
                        </select>
                        {errors.ward && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.ward.message}
                          </span>
                        )}
                      </div>
                      <div className=" ">
                        <select
                          {...register("villageName")}
                          className="select select-sm  flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline max-w-xs"
                        >
                          {isFetching ? (
                            "গ্রাম লোডিং..."
                          ) : (
                            <>
                              <option value="">পছন্দ করুন ?</option>
                              {villageData &&
                                villageData?.map((wn) => (
                                  <option key={wn._id} value={wn.name}>
                                    {wn.name}
                                  </option>
                                ))}
                            </>
                          )}
                        </select>
                        {errors.villageName && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.villageName.message}
                          </span>
                        )}
                      </div>
                      {/* <div className="">
                        <input
                          type="text"
                          className="flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                          placeholder="বাড়ির নাম"
                          {...register("houseName")}
                        />
                        {errors.houseName && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.houseName.message}
                          </span>
                        )}
                      </div> */}
                      <div className="">
                        <select
                          {...register("male")}
                          className="select select-sm  flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline max-w-xs "
                        >
                          <option value="">পছন্দ করুন</option>
                          <option value="1">১</option>
                          <option value="2">২</option>
                          <option value="3">৩</option>
                          <option value="4">৪</option>
                          <option value="5">৫</option>
                          <option value="6">৬</option>
                          <option value="7">৭</option>
                          <option value="8">৮</option>
                          <option value="9">৯</option>
                          <option value="10">১০</option>
                        </select>
                        {errors.male && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.male.message}
                          </span>
                        )}
                      </div>
                      <div className="">
                        <input
                          type="number"
                          {...register("yearMullayon")}
                          className="flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                          placeholder="400"
                        />
                        {errors.yearMullayon && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.yearMullayon.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" flex gap-3 mt-5 lg:mt-0 sm:gap-3  ">
                    <div className=" text-[6px] py-2">
                      <div className="mb-10">
                        <label className="text-sm" htmlfor="grid-password">
                          হোল্ডিং নাম্বারঃ
                        </label>
                      </div>
                      <div className="mb-8">
                        <label className="text-sm" htmlfor="grid-password">
                          বাড়ির ধরনঃ
                        </label>
                      </div>
                      <div className="mb-10">
                        <label className="text-sm" htmlfor="grid-password">
                          নারীর সংখ্যাঃ
                        </label>
                      </div>

                      <div className="mb-8">
                        <label
                          className="sm:text-sm text-[14px]  "
                          htmlfor="grid-password"
                        >
                          ধার্যকৃত করঃ
                        </label>
                      </div>

                      <div>
                        <label
                          className="sm:text-sm text-[14px]  "
                          htmlfor="grid-password"
                        >
                          পূর্বের বকেয়াঃ
                        </label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="">
                        <input
                          type="text"
                          value={nextHolding !== null && nextHolding}
                          required
                          className="flex-grow w-full h-10 px-4 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        />

                        {errors.holding && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.holding.message}
                          </span>
                        )}
                      </div>

                      <div className="">
                        <select
                          {...register("house")}
                          className="select select-sm  flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline max-w-xs "
                        >
                          <option value="">পছন্দ করুন</option>
                          <option value="কাঁচা">কাঁচা</option>
                          <option value="সেমি">সেমি</option>
                          <option value="আধাপাকা">আধাপাকা</option>
                          <option value="পাকা">পাকা</option>
                          <option value="বিল্ডিং">বিল্ডিং</option>
                        </select>
                        {errors.house && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.house.message}
                          </span>
                        )}
                      </div>
                      <div className="">
                        <select
                          {...register("female")}
                          className="select select-sm  flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline max-w-xs "
                        >
                          <option value="">পছন্দ করুন</option>
                          <option value="1">১</option>
                          <option value="2">২</option>
                          <option value="3">৩</option>
                          <option value="4">৪</option>
                          <option value="5">৫</option>
                          <option value="6">৬</option>
                          <option value="7">৭</option>
                          <option value="8">৮</option>
                          <option value="9">৯</option>
                          <option value="10">১০</option>
                        </select>
                        {errors.female && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.female.message}
                          </span>
                        )}
                      </div>

                      <div className="">
                        <input
                          type="number"
                          className="flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                          placeholder="200"
                          {...register("cor")}
                        />
                        {errors.cor && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.cor.message}
                          </span>
                        )}
                      </div>
                      <div className="">
                        <input
                          type="number"
                          className="flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                          placeholder="200"
                          {...register("due")}
                        />
                        {errors.due && (
                          <span className="text-red-600 text-sm" role="alert">
                            {errors.cor.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" xl:justify-center   mt-6 mx-auto flex justify-end mb-5   ">
                <button
                  disabled={isSaving}
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                >
                  {isSaving ? (
                    <span>
                      {" "}
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 me-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>{" "}
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
