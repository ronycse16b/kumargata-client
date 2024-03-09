import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import convertToBengaliNumber from '../util/convertToBengaliNumber';
// import convertToBengaliNumber from "../hook/convertToBengaliNumber";
import Swal from "sweetalert2";
import {
  FaEdit,
  FaQrcode,
  FaRegCheckCircle,
  FaTrashAlt,
  FaUserEdit,
} from "react-icons/fa";
import { useSingleDataDeleteMutation } from "../features/api/authApi";
import { useState } from "react";
import QRCode from "qrcode";
import { useSelector } from "react-redux";



const DataDetails = ({ data, index, refetch,refetchCalculateData }) => {

  const [loading, setLoading] = useState(false);
  // const { currentUser } = useSelector((state) => state.user);

  const GenerateQRCode = async (data) => {
    setLoading(true);
    const url = `https://doulkhaup.web.app/view/${data?._id}`;

    await QRCode.toDataURL(
      url,
      {
        width: 400,
        margin: 0.5,
      },
      (err, url) => {
        if (url) {
          const a = document.createElement("a");
          a.href = url;
          a.download = `${data?.name}.png`;
          a.click();
          setLoading(false);
        } else {
          console.log(err.message);
          setLoading(false);
        }
      }
    );
  };



  // const [loading, setLoading] = useState(false);
  const [deleteMutation] = useSingleDataDeleteMutation(); // Move the hook call here

  const handelDelete = async (data) => {
    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert! (${data?.name})`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });
  
      if (confirmResult.isConfirmed) {
        const res = await deleteMutation({ id: data?._id });
        Swal.fire({
          title: "Deleted!",
          text: `${res?.data?.message}`,
          icon: "success"
        });
        // Refetch data after deletion
        refetch();
        refetchCalculateData()
      }
    } catch (error) {
      console.error("Failed to delete data:", error);
      // Handle error
    } finally {
      // setLoading(false);
    }
  };
  
  if(loading){
    return <div>QR Downloading...</div>
  }

  return (
    <>
       
      <tr className="border-b border-gray-400   ">
        <td className="border-b border-gray-400 ">{convertToBengaliNumber(index + 1 || 0)}</td>
        <td className="border-b border-gray-400 ">
          {data?.holding }
        </td>
        <td className="border-b border-gray-400 ">{convertToBengaliNumber(data?.ward || 0)}</td>
        <td className="border-b border-gray-400 ">{data?.name}</td>
        <td className="border-b border-gray-400 ">{data?.fatherName ? data?.fatherName : "-"}</td>
        <td className="border-b border-gray-400 ">{convertToBengaliNumber(data?.mobile ? '0' + data?.mobile : '-' || 0)}</td>
        <td className="border-b border-gray-400 ">{data?.villageName}</td>
        <td className="border-b border-gray-400 ">{convertToBengaliNumber(data?.male ? data?.male : '-' || 0)}</td>
        <td className="border-b border-gray-400 ">{convertToBengaliNumber(data?.female ? data?.female : '-' || 0)}</td>

        <td className="border-b border-gray-400 ">{data?.house ? data?.house : '-'}</td>
        <td className="border-b border-gray-400 ">{data?.profession ? data?.profession : '-'}</td>
        <td className="border-b border-gray-400 ">{data?.houseName ? data?.houseName : '-'}</td>
        <td className="border-b border-gray-400 ">{convertToBengaliNumber(data?.yearMullayon ? data?.yearMullayon : '-' || 0)}</td>
        <td className="border-b border-gray-400 ">{convertToBengaliNumber(data?.due || 0)}</td>
        <td className="border-b border-gray-400 ">{convertToBengaliNumber(data?.cor ? data?.cor : '-' || 0)}</td>

        <td className="  flex items-center print:hidden">
          <Link
            to={`/details/${data._id}`}
            className=" bg-cyan-700 btn btn-xs  text-white hover:shadow-lg text-xs font-thin"
          >
            Details
          </Link>

          <>
            <Link
              to={`/update/${data._id}`}
              className=" bg-blue-500  btn btn-xs  text-white hover:shadow-lg text-xs font-thin"
            >
              <FaEdit />
            </Link>
            <a
              href="#"
              onClick={() => handelDelete(data)}
              className=" bg-red-500  btn btn-xs  text-white hover:shadow-lg text-xs font-thin"
            >
              <FaTrashAlt />
            </a>
            <a
              onClick={() => {
                GenerateQRCode(data);
              }}
              href="#"
              className=" bg-yellow-500   btn btn-xs text-white hover:shadow-lg text-xs font-thin"
            >
              <FaQrcode />
            </a>
            {/* {currentUser?.email === "rtpress6164@gmail.com" && (
                <Link
                  to={`/holding-plate/${data._id}`}
                  href="#"
                  className=" bg-green-500   btn btn-xs text-white hover:shadow-lg text-xs font-thin"
                >
                  Plate
                </Link>
              )} */}
          </>

        </td>
      </tr>
    </>
  );
};

export default DataDetails;
