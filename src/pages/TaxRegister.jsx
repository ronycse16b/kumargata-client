import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaCheck, FaPrint } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import convertToBengaliNumber from '../util/convertToBengaliNumber';
import { useGetTaxReciptQuery, useGetTaxRegisterQuery } from '../features/api/authApi';
import Pagination from '../components/Pagination';

const TaxRegister = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const initialPerPage = parseInt(localStorage.getItem('rowsPerPage')) || 5; // Parse the stored value to a number
  const [rowsPerPage, setRowsPerPage] = useState(initialPerPage);
  const { data, isLoading, refetch } = useGetTaxRegisterQuery({ page: currentPage, limit: rowsPerPage });
  const [sn, setSn] = useState(null)



  useEffect(() => {
    refetch();
  }, [currentPage, rowsPerPage, refetch]);

  useEffect(() => {
    localStorage.setItem('rowsPerPage', rowsPerPage.toString()); // Convert rowsPerPage to string when storing it
  }, [rowsPerPage]);

  const printRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    refetch();
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    refetch();

  };


  // const filteredData = data?.taxRegister?.filter((row) =>
  //   Object.values(row).some(
  //     (value) =>
  //       typeof value === 'string' &&
  //       value.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // );

  const { data: receptData, isFetching, refetch: snRefetch } = useGetTaxReciptQuery({ sn: sn })

  const handleDownload = async (sn) => {
    await setSn(sn)

  }

  useEffect(() => {
    snRefetch()
  }, [sn, snRefetch])

  console.log(receptData);

  return (
    <div className="container mx-auto p-4">




      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search"
          className="appearance-none border border-gray-300 rounded py-2 h-8 px-4 focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="print:hidden hidden lg:block">
          <button
            className="flex items-center text-white btn btn-sm h-8 shadow-md bg-gradient-to-tr from-rose-600 to-rose-400 uppercase"
            onClick={handlePrint}
          >
            print now <FaPrint />
          </button>
        </div>
      </div>

      <div ref={printRef}>
        <div className="text-center hidden print:block   print:mb-5 ">
          <h1 className="font-bold text-xl">১৪নং দৌলখাঁড় ইউনিয়ন পরিষদ</h1>
          <p className='text-xs'> ডাকঘরঃদৌলখাঁড় বাজার -৩৫৮০</p>
          <p className='text-xs'> উপজেলাঃনাঙ্গলকোট  জেলাঃকুমিল্লা</p>

          <h1 className='font-semibold text-blue-800'>আদায় রেজিস্টার</h1>
        </div>
        <table className="table table-sm  table-zebra p-2 ">
          <thead className="shadow-md bg-slate-500  text-white print:text-white   ">
            <tr className="">
              <th className="border ">ক্রমিক</th>
              <th className="border ">হোল্ডিং</th>
              <th className="border min-w-32">মালিকের নাম</th>
              <th className="border min-w-32">গ্রাম</th>
              <th className="border ">করঃ</th>
              <th className="border ">২০২২-২৩</th>
              <th className="border ">২০২৩-২৪</th>
              <th className="border ">২০২৪-২৫</th>
              <th className="border ">২০২৫-২৬</th>
              <th className="border ">২০২৬-২৭</th>
              <th className="border ">২০২৭-২৮</th>
              <th className="border ">২০২৮-২৯</th>
              <th className="border ">২০২৯-৩০</th>
              <th className="border ">২০৩০-৩১</th>
              <th className="border ">২০৩১-৩২</th>

              <th className="">বকেয়াঃ</th>

            </tr>

          </thead>

          <tbody className="">
            {data?.taxRegister ? (
              <>
                {isLoading ? (
                  <div className="h-[80vh] flex items-center justify-center absolute left-1/2">
                    <span className="loading loading-spinner text-red-600 font-bold loading-lg"></span>
                  </div>
                ) : data?.taxRegister?.length > 0 ? (
                  data?.taxRegister?.map((row, index) => (
                    <tr key={index}>
                      <td className="border ">
                        {convertToBengaliNumber(index + 1 || 0)}
                      </td>
                      <td className="border ">
                        {convertToBengaliNumber(row?.holding || 0)}
                      </td>
                      <td className="border ">
                        {row?.name}
                      </td>
                      <td className="border ">
                        {row?.villageName ? row.villageName : '-'}
                      </td>
                      <td className="border ">
                        {convertToBengaliNumber(row?.cor || 0)}
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{row?.checkbox?.[0]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{row?.checkbox?.[1]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{row?.checkbox?.[2]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{row?.checkbox?.[3]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{row?.checkbox?.[4]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{row?.checkbox?.[5]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{row?.checkbox?.[6]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{row?.checkbox?.[7]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{row?.checkbox?.[8]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className='border'>
                        <span className='text-green-700 font-bold'>{row?.checkbox?.[9]?.year ? <FaCheck /> : "-"}</span>
                      </td>
                      <td className="border ">
                        {convertToBengaliNumber(row?.due || 0)}
                      </td>
                      

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="number of columns">No data found</td>
                  </tr>
                )}
              </>
            ) : (
              <tr>
                <td colSpan="number of columns">Loading...</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
      <div className="items-center space-y-2 text-xs sm:space-y-0 sm:space-x-3 flex pb-12 lg:pb-0 mt-4 ">
        <span className="block ">
          Page {currentPage} of {data?.totalPages}
        </span>
        <div className="space-x-1 ml-2 flex items-center gap-2">
          <button
            disabled={currentPage <= 1}
            onClick={handlePreviousPage}
            title="previous"
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 py-0 border border-base-100 rounded-md shadow"
          >
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            disabled={currentPage >= data?.totalPages}
            onClick={handleNextPage}
            title="next"
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 py-0 border border-base-100 rounded-md shadow"
          >
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          <select
            defaultValue={currentPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
            className="select  select-xs w-full max-w-[80px] border border-gray-400"
          >

            <option value={5}>05</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={18}>18</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={300}>300</option>
            <option value={400}>400</option>
            <option value={500}>500</option>
          </select>
        </div>
      </div>





    </div>
  );
};

export default TaxRegister;
