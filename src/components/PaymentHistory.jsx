import React from 'react';
import { useGetMoneyReciptQuery } from '../features/api/authApi';
import DataTable from 'react-data-table-component';

const PaymentHistory = () => {

    const { data, isFetching, isSuccess } = useGetMoneyReciptQuery();

    const columns = [
        {
            name: '#invoice',
            selector: row => row.sn,
            sortable: true,
        },
        {
            name: 'নাম',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'হোল্ডিং',
            selector: row => row.holding,
            sortable: true,
        },
        {
            name: 'ওয়ার্ড',
            selector: row => row.ward,
            sortable: true,
        },
        {
            name: 'Download',
            cell: row => <button>Download</button>
           
        }
        
    ];
    const customStyles = {
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                backgroundColor: 'gray',
                color: 'white',
                
            },
        },
        headCells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                   
                },
            },
        },
        cells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                   
                },
            },
        },
    };
    

    return (
        <div>

            <DataTable title="Payments history" columns={columns} data={data?.recipt} progressPending={isFetching} customStyles={customStyles} pagination  dense  />

        </div>
    );
};

export default PaymentHistory;