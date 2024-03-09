import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useSelector } from "react-redux";
import { useGetSingleDetailsQuery, useGetVillageQuery, useSingleDataUpdateMutation } from "../features/api/authApi";

const UpdateData = () => {

    const { id } = useParams();
    const { data, isFetching } = useGetSingleDetailsQuery({ id: id });
    const [wardId, setWardId] = useState(null);
    const { ward, loading: wardLoading } = useSelector((state) => state.ward);
    const { data: villageData, isFetching: loading } = useGetVillageQuery({ ward: wardId });
    const [singleDataUpdate, { isLoading: isUpdating, }] = useSingleDataUpdateMutation()

    const { userInfo } = useSelector((state) => state.auth);
    const [isSaving, setIsSaving] = useState(false);
    const [villageName, setVillageName] = useState('');
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const location = useLocation();
    const navigate = useNavigate();






    useEffect(() => {
        if (data && data.data) {
            const {
                name,
                holding,
                ward,
                fatherName,
                female,
                male,
                house,
                houseName,
                profession,
                villageName,
                yearMullayon,
                cor,
                mobile,
                due
            } = data.data;

            setValue('name', name);
            setValue('holding', holding);
            setValue('ward', ward);
            setValue('fatherName', fatherName);
            setValue('female', female);
            setValue('male', male);
            setValue('house', house);
            setValue('houseName', houseName);
            setValue('profession', profession);
            setValue('villageName', villageName);
            setValue('yearMullayon', yearMullayon);
            setValue('cor', cor);
            setValue('mobile', mobile);
            setValue('due', due);
        }

        if (data && data.data) {
            setWardId(data?.data?.ward);
            setVillageName(data?.data.villageName);
        }



    }, [data, setValue]);



    const onSubmitUpdate = async (event) => {
        try {
            setIsSaving(true);
            const updatedFieldData = {
                ...event,
                user: userInfo?.name,

            };

            const res = await singleDataUpdate({ data: updatedFieldData, id: id })

            if (res && res.data) {
                toast.success(res.data?.message);
                setIsSaving(false);
                navigate(`/data-by-ward/${res?.data?.data.ward}`);

            } else {
                setIsSaving(false);
                toast.error(res.error.data?.message);
            }
        } catch (error) {
            console.log(error);
            setIsSaving(false);
        }
    };



    return (
        <section className="  p-2 sm:m-10 shadow-inner  rounded-md">
            {
                isFetching ? 'Loading...' : <div className="">
                    <div className="">
                        <div className="">
                            <div className=" text-center py-2 shadow-inner text-green-600 font-bold border ">
                                <h6 className="">এসেসমেন্ট আপডেট ফর্ম</h6>
                            </div>
                        </div>
                        <div className="">
                            <div className=" max-w-5xl p-4 mx-auto flex border-b my-10 ">
                                <h1 className="font-bold text-sm">ব্যাক্তিগত তথ্যঃ </h1>
                            </div>
                            <form onSubmit={handleSubmit(onSubmitUpdate)}>
                                <div className="flex flex-col lg:flex-row  justify-evenly">
                                    <div className="parent flex justify-items-center gap-8  ">
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
                                                    className=" flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
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

                                    <div className="parent flex justify-items-center gap-2 mt-3 sm:gap-8 ">
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
                                                    className="select select-sm flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline max-w-xs "
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
                                <div className=" max-w-5xl p-4 mx-auto flex border-b mt-10">
                                    <h1 className="font-bold text-sm">এসেসমেন্ট তথ্য :</h1>
                                </div>

                                <div className=" flex flex-col lg:flex-row justify-evenly mt-10  items-center ">
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
                                                    className="select select-sm flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline max-w-xs "
                                                >
                                                    <option value="">পছন্দ করুন</option>
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
                                                <div className=" ">
                                                    <select
                                                        {...register("villageName")}
                                                        className="select select-sm flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline max-w-xs"
                                                    >


                                                        <>
                                                            <option >{villageName}</option>
                                                            {villageData?.village &&
                                                                villageData?.village?.map((wn) => (

                                                                    <option key={wn._id} value={wn.name}>
                                                                        {wn.name}
                                                                    </option>
                                                                ))}
                                                        </>

                                                    </select>
                                                </div>
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
                                                    className="select select-sm flex-grow w-full h-10 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline max-w-xs "
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
                                <div className=" max-w-[945px] p-4 mx-auto flex justify-end">
                                    <button
                                        className="px-5 bg-rose-600 mb-5  rounded-md py-2 text-white  "
                                        disabled={isSaving}
                                    >
                                        {isSaving ? (
                                            <span className="flex items-center cursor-not-allowed">
                                                <svg
                                                    className="animate-spin text-base-100  rounded-full border-4 border-dashed h-5 w-5 mr-3 ..."
                                                    viewBox="0 0 24 24"
                                                ></svg>
                                                Updating ...
                                            </span>
                                        ) : (
                                            "Update"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }

        </section>
    );
};

export default UpdateData;
