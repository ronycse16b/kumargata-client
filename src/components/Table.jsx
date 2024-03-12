import React, { useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useReactToPrint } from 'react-to-print';



const columns = [
  {
    name: 'ক্রমিক',
    selector: row => row.index ,
    sortable: true,
  },
  {
    name: 'হোল্ডিং',
    selector: row => row.holding,
    sortable: true,
  },
  {
    name: 'মালিকের নাম',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'গ্রাম',
    selector: row => row.villageName,
    sortable: true,
  },
  {
    name:"ধার্য",
    selector: row => row.cor,
    sortable: true,
  },
  {
    name: '২০২২-২৩',
    selector: row => row.year,
    sortable: true,
  },
  {
    name: '২০২৩-২৪',
    selector: row => row.title,
    sortable: true,
  },
  {
    name: '২০২৪-২৫',
    selector: row => row.year,
    sortable: true,
  },
  {
    name: '২০২৫-২৬',
    selector: row => row.title,
    sortable: true,
  },
  {
    name: '২০২৬-২৭',
    selector: row => row.year,
    sortable: true,
  },
  {
    name: '২০২৭-২৮',
    selector: row => row.title,
    sortable: true,
  },
 
];

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
  },
];

const Table = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const printRef = useRef();

  const filteredData = data.filter(row =>
    Object.values(row).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search"
          className="appearance-none border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
      <div ref={printRef}>
        <DataTable 
          
          columns={columns}
          data={filteredData}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 20]}
          noHeader
        />
      </div>
    </div>
  );
};

export default Table;
