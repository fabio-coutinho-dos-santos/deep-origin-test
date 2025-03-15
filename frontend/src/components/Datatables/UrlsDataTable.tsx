import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { CONSTANTS } from "../../config/constants";

export interface Urls {
  original: string;
  shortened: string;
}

const columns: TableColumn<Urls>[] = [
  {
    name: "Original",
    selector: (row) => row.original,
    sortable: true,
    width: "30rem",
  },
  {
    name: "Shortened",
    selector: (row) => `${CONSTANTS.url.host}/${row.shortened}`,
    sortable: true,
  },
];

const formatUpdatedDate = (updatedAt: string, createdAt: string) => {
  if (!updatedAt) {
    return new Date(createdAt).toLocaleString();
  }
  return new Date(updatedAt).toLocaleString();
}

const formatExpirationDate = (date: string) => {
  if (!date) {
    return "";
  }
  return new Date(date).toLocaleString();
};

interface UrlsDataTableProps {
  urls: Urls[];
}

const customStyles = {
  table: {
    style: {
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#2e4053",
      color: "white",
      fontWeight: "bold",
      fontSize: "16px",
    },
  },
  rows: {
    style: {
      backgroundColor: "#ffffff",
      "&:nth-of-type(odd)": {
        backgroundColor: "#f2f2f2",
      },
    },
  },
  pagination: {
    style: {
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },

  },
};

const UrlsDataTable: React.FC<UrlsDataTableProps> = ({ urls }) => {
  return (
    <DataTable
      title={<h2 style={{ color: "#000", fontWeight: "bold" }}>🚀 Last Generated</h2>}
      columns={columns}
      data={urls}
      pagination
      customStyles={customStyles}
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
    />
  );
};

export default UrlsDataTable;
