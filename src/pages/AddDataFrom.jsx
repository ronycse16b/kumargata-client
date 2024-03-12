import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
// import QRCode from "qrcode";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import { useDispatch, useSelector } from "react-redux";
import { useGetVillageQuery, useGetWardDataQuery, usePostApplicationDataMutation } from "../features/api/authApi";
// import bengaliToEnglish from "../../hook/BanglaliNumberToEng";
// import convertToBengaliNumber from "../../hook/convertToBengaliNumber";

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

  
  
  const [wardId, setWardId] = useState('');
  const { data, isFetching } = useGetVillageQuery({ ward: wardId })

  useEffect(() => {
    setVillageData(data?.village)
  }, [data, wardId,isFetching])

  const [postApplicationData, { isLoading, isError, isSuccess }] = usePostApplicationDataMutation()
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
      };
      const res = await postApplicationData(updatedFieldData);
  
      if (res && res.data) {
        toast.success(res.data?.message);
        setIsSaving(false);
        
        // Reset the entire form
        reset();
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
    <section className="p-2 sm:m-10  scrollbar-hide md:max-w-3xl lg:max-w-full  ">
      <div className="">
        <div className="">
          <div className="">
            <div className=" text-center py-2 shadow-sm text-green-600 font-bold  ">
              <h6 className="">এসেসমেন্ট আবেদন</h6>
            </div>
          </div>
          <div className="">
            <div className=" md:max-w-[700px] lg:max-w-[935px] p-4 mx-auto flex lg:justify-start justify-center  mb-4 ">
              <h1 className="font-bold text-sm underline">ব্যাক্তিগত তথ্যঃ </h1>
            </div>
            <form onSubmit={handleSubmit(handleCreateData)}>
              <div className="flex flex-col lg:flex-row  justify-evenly">
                <div className="parent flex justify-center sm:gap-8 gap-2   ">
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
                   
                  </div>
                </div>

                <div className="parent flex justify-center gap-8 mt-3 sm:gap-8 ">
                  <div className="label-child space-y-9">
                   
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
                    
                  </div>
                  <div className=" space-y-[17px]">
                   
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
                   
                  </div>
                </div>
              </div>
              <div className=" max-w-[720px] lg:max-w-[970px] p-4 mx-auto justify-center lg:justify-start flex  mt-10">
                <h1 className="font-bold text-sm underline">এসেসমেন্ট তথ্য :</h1>
              </div>

              <div className=" flex flex-col lg:flex-row justify-evenly mt-5  items-center ">
                <div className="parent flex justify-items-center gap-6 ">
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
                    <div>
                      <label className="text-sm" htmlfor="grid-password">
                        বাড়ির নামঃ
                      </label>
                    </div>

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
                        {loading ? "Loading..." : <option selected value="">পছন্দ করুন</option>
                        }
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
                    <div className="">
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
                    </div>
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
                <div className="parent flex gap-3 mt-5 lg:mt-0 sm:gap-3  ">
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
                        type='number'
                        {...register("holding", {

                        })}
                             required
                        className="flex-grow w-full h-10 px-4   transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"

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

              <div className=" sm:max-w-[1000px] px-12 mt-6 mx-auto flex justify-end mb-5   ">
                <button
                  className=" btn btn-success   rounded-md py-2 text-white  "
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <span className="flex items-center cursor-not-allowed ">
                      <svg
                        className="animate-spin text-base-100  rounded-full border-4 border-dashed h-5 w-5 mr-3 ..."
                        viewBox="0 0 24 24"
                      ></svg>
                      Saving ...
                    </span>
                  ) : (
                    <><span className="uppercase">Save Assessment</span></>
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
