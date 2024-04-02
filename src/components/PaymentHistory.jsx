import React, { useEffect, useRef, useState } from "react";
import {
  useGetMoneyReciptQuery,
  useGetSingleTaxReciptQuery,
} from "../features/api/authApi";
import DataTable from "react-data-table-component";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Data from "./Data";
import { useReactToPrint } from "react-to-print";

const PaymentHistory = () => {
  const [id, setId] = useState(null);
  const { data, isFetching } = useGetMoneyReciptQuery();

  const columns = [
    {
      name: "#invoice",
      selector: (row) => row.sn,
      sortable: true,
    },
    {
      name: "নাম",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "হোল্ডিং",
      selector: (row) => row.holding,
      sortable: true,
    },
    {
      name: "ওয়ার্ড",
      selector: (row) => row.ward,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="bg-blue-600 uppercase hover:bg-blue-500 text-white px-2 py-1"
          onClick={() => handleDownload(row._id)}
        >
          Print
        </button>
      ),
    },
  ];

  const {
    data: singleData = "empty-data",
    isLoading,
    refetch,
    isSuccess,
  } = useGetSingleTaxReciptQuery({ id: id });

  const handleDownload = async (id) => {
    await setId(id);
    document.getElementById("my_modal_4").showModal();
  };

  useEffect(() => {
    refetch();
  }, [id]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="mt-5">
      <div className="  mb-3  text-green-600 font-bold   ">
        <h6 className="underline">সকল ইউজার</h6>
      </div>
      <DataTable
        columns={columns}
        data={data?.recipt}
        progressPending={isFetching}
        pagination
        dense
      />

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          {isLoading ? (
            "Loading..."
          ) : (
            <Data componentRef={componentRef} singleData={singleData} />
          )}

          <div className="modal-action px-10">
            {/* if there is a button, it will close the modal */}
            <button
              onClick={() => document.getElementById("my_modal_4").close()}
              className="bg-red-600 hover:bg-red-500 transition-all px-3 py-2 rounded-sm text-white uppercase"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="bg-green-600 hover:bg-green-500 px-3 py-2 rounded-sm text-white uppercase"
            >
              Print now
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PaymentHistory;
