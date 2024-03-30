import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaCheck, FaPrint, FaRegWindowClose, FaSearch } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import convertToBengaliNumber from '../util/convertToBengaliNumber';
import { useGetTaxRegisterQuery } from '../features/api/authApi';
import Pagination from '../components/Pagination';
import TaxRegisterTableData from './TaxRegisterTableData';

const TaxRegister = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const initialPerPage = parseInt(localStorage.getItem('rowsPerPage')) || 5; // Parse the stored value to a number
  const [rowsPerPage, setRowsPerPage] = useState(initialPerPage);
  const { data, isLoading, refetch } = useGetTaxRegisterQuery({ page: currentPage, limit: rowsPerPage });
  const [sn, setSn] = useState(null)
  const [searchResults, setSearchResults] = useState();

  const [searchLoading, setSearchLoading] = useState(false);


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



  const handleSearch = async (event) => {
    event.preventDefault();
    setSearchLoading(true);

    const searchRegex = new RegExp(searchTerm, 'i'); // 'i' flag for case-insensitive search

    const filterData = data?.taxRegister?.filter(item => {
      // Filtering logic based on name, fatherName, holding, and mobile
      return (
        (item.name && (searchRegex.test(item.name) || item.name.includes(searchTerm)))
      );
    });

    setSearchResults(filterData);
    setSearchLoading(false);
  };



  return (
    <div className=" mx-auto p-4">




      <div className="mb-4 flex justify-between items-center">
        <form onSubmit={handleSearch} className="flex items-center gap-2 my-5">
          <input
            type="text"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="name"
            name="search"
            className="flex-grow w-full h-8 px-4  transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline "
            required
          />
          <button
            type="submit"
            className="flex items-center text-white btn btn-sm h-8 shadow-md bg-gradient-to-tr from-blue-600 to-blue-400"
          >
            Search <FaSearch />
          </button>
          {searchResults && <button
            type="reset"
            onClick={() => setSearchResults(null)}
            className="flex items-center text-white btn btn-sm h-8 shadow-md bg-gradient-to-tr from-red-600 to-red-400"
          >
            Close search <FaRegWindowClose />
          </button>}
        </form>


        {
          data?.data?.length > 0 && <div className="print:hidden hidden lg:block">
            <button
              className="flex items-center text-white btn btn-sm h-8 shadow-md bg-gradient-to-tr from-rose-600 to-rose-400 uppercase"
              onClick={handlePrint}
            >
              print now <FaPrint />
            </button>
          </div>
        }
      </div>

      <div ref={printRef} className='overflow-auto' >
        <div className="text-center hidden print:block   print:mb-5 ">
          <h1 className="font-bold text-xl">১৪নং দৌলখাঁড় ইউনিয়ন পরিষদ</h1>
          <p className='text-xs'> ডাকঘরঃদৌলখাঁড় বাজার -৩৫৮০</p>
          <p className='text-xs'> উপজেলাঃনাঙ্গলকোট  জেলাঃকুমিল্লা</p>

          <h1 className='font-semibold text-blue-800'>আদায় রেজিস্টার</h1>
        </div>
        <span>
          {
            searchResults && <p className='bg-yellow-500 text-white font-bold px-2.5'> Search Result</p>
          }
        </span>
        <table className="table table-sm overflow-x-auto   table-zebra p-2 ">


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

          <tbody className=" overflow-hidden">



            {
              searchLoading &&
              <div className="h-[80vh] flex items-center justify-center absolute left-1/2">
                <span className="loading loading-spinner text-red-600 font-bold loading-lg"></span>
              </div>

            }

            {searchResults ?


              searchResults?.map((data, index) =>
                <TaxRegisterTableData key={index} data={data} index={index} />

              ) :
              data?.taxRegister && (

                data?.taxRegister?.map((data, index) => (
                  <TaxRegisterTableData key={index} data={data} index={index} />
                ))
              )



            }

          </tbody>

        </table>
        {
          (searchResults?.length === 0 || data?.taxRegister?.length === 0) && (
            <p className="text-red-600 font-bold">No Data Found</p>
          )
        }

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
