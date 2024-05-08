import { FaBan, FaDollarSign, FaHome } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { useGetAllDataQuery } from "../features/api/authApi";
import convertToBengaliNumber from "../util/convertToBengaliNumber";
import SmallLoader from "./SmallLoader";

const AdminDashboardCard = () => {

    const { data, isFetching, refetch } = useGetAllDataQuery();

    // Check if data is still fetching

    // Process the data
    const totalHolding = data?.data?.reduce((acc, currentValue) => {
        const dueValue = currentValue.due || 0;
        const corValue = currentValue.cor || 0;
       

        if (currentValue.checkbox && currentValue.checkbox.length > 0) {
            currentValue.checkbox.forEach((checkboxItem) => {
                acc.total += parseInt(checkboxItem?.total) || 0;
                acc.discount += parseInt(checkboxItem?.discount) || 0;
            });
        }

        acc.due += dueValue;
        acc.cor += corValue;
       

        return acc;
    }, { due: 0, cor: 0, total: 0 ,discount: 0});





    return (
        <>
            <div className="grid grid-cols-1 gap-4  mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">

                <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div className="p-4 bg-green-400">
                        <MdOutlineHomeWork className="h-12 w-12 text-white" />
                    </div>
                    <div className="px-4 text-gray-700">
                        <h3 className="text-sm tracking-wider">মোট খানা</h3>
                        {isFetching ?  <span className=" animate-ping text-red-600 font-bold ">...</span> : <p className="text-2xl">{convertToBengaliNumber(data?.data?.length?.toLocaleString() || 0)}</p> }
                    </div>
                </div>
                <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div className="p-4 bg-blue-400">
                        <FaDollarSign className="h-12 w-12 text-white" />
                    </div>
                    <div className="px-4 text-gray-700">
                        <h3 className="text-sm tracking-wider">মোট ধার্যকৃত কর</h3>
                        {isFetching ?  <span className=" animate-ping text-red-600 font-bold ">...</span> : <p className="text-2xl">{convertToBengaliNumber(totalHolding?.cor?.toLocaleString() || 0)}/-</p> }
                    </div>
                </div>
                <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div className="p-4 bg-indigo-400">
                        <BsFillCheckSquareFill className="h-12 w-12 text-white" />
                    </div>
                    <div className="px-4 text-gray-700">
                        <h3 className="text-sm tracking-wider">মোট কর আদায়</h3>
                        {isFetching ?  <span className=" animate-ping text-red-600 font-bold ">...</span> : <p className="text-2xl">{convertToBengaliNumber(totalHolding?.total.toLocaleString() || 0)}/-</p> }
                        
                        {isFetching ?  <span className=" animate-ping text-red-600 font-bold ">...</span> : <p className="text-xs"> মোট ডিসকাউন্ট = {convertToBengaliNumber(totalHolding?.discount.toLocaleString() || 0)} /-</p> }
                    </div>
                </div>
                <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                    <div className="p-4 bg-red-400">
                        <FaBan className="h-12 w-12 text-white" />
                    </div>
                    <div className="px-4 text-gray-700">
                        <h3 className="text-sm tracking-wider">মোট বকেয়া</h3>
                        {isFetching ?  <span className=" animate-ping text-red-600 font-bold ">...</span> : <p className="text-2xl">{convertToBengaliNumber(totalHolding?.due.toLocaleString() || 0)}/-</p> }
                    </div>
                </div>
            </div>

        </>

    );
};

export default AdminDashboardCard;