import React from "react";
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash } from "react-icons/fa";

const Table = ({ columns, data, handleEdit, handleDelete }) => {
    return (
        <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            striped
            responsive
            noHeader // Disable table header for printing
            paginationPerPage={data?.length} // Show all rows in a single page for printing
            paginationRowsPerPageOptions={[data?.length]} // Show only one option in pagination dropdown for printing
            paginationComponentOptions={{ rowsPerPageText: 'Rows per page: All' }} // Customize pagination text for printing
            customStyles={{
                headRow: {
                    style: {
                        display: 'none', // Hide header row for printing
                    }
                },
                rows: {
                    style: {
                        borderBottomWidth: 0, // Hide row borders for printing
                    }
                }
            }}
        />
    );
};

export default Table;
