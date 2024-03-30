import { FaCheck } from "react-icons/fa";
import convertToBengaliNumber from "../util/convertToBengaliNumber";


const TaxRegisterTableData = ({index,data}) => {
    return (
       
             <tr key={index}>
                      <td className="border ">
                        {convertToBengaliNumber(index + 1 || 0)}
                      </td>
                      <td className="border ">
                        {convertToBengaliNumber(data?.holding || 0)}
                      </td>
                      <td className="border ">
                        {data?.name}
                      </td>
                      <td className="border ">
                        {data?.villageName ? data.villageName : '-'}
                      </td>
                      <td className="border ">
                        {convertToBengaliNumber(data?.cor || 0)}
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{data?.checkbox?.[0]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{data?.checkbox?.[1]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{data?.checkbox?.[2]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{data?.checkbox?.[3]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{data?.checkbox?.[4]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{data?.checkbox?.[5]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{data?.checkbox?.[6]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{data?.checkbox?.[7]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{data?.checkbox?.[8]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{data?.checkbox?.[9]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className="border ">
                        {convertToBengaliNumber(data?.due || 0)}
                      </td>


                    </tr>
        
    );
};

export default TaxRegisterTableData;