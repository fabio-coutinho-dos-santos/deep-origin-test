import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";

export interface Products {
  id: number;
  name: string;
  expirationDate: string;
  price: number;
  eur: number;
  brl: number;
  btc: number;
  jpy: number;
  eth: number;
  updatedAt: string;
  createdAt: string;
}

const columns: TableColumn<Products>[] = [
  {
    name: "Product name",
    selector: (row) => row.name,
    sortable: true,
    width: "30rem",
  },
  {
    name: "USD",
    selector: (row) => row.price,
    sortable: true,
  },
  {
    name: "EUR",
    selector: (row) => row.eur,
    sortable: false,
  },
  {
    name: "BRL",
    selector: (row) => row.brl,
    sortable: false,
  },
  {
    name: "BTC",
    selector: (row) => row.btc,
    sortable: false,
  },
  {
    name: "JPY",
    selector: (row) => row.jpy,
    sortable: false,
  },
  {
    name: "ETH",
    selector: (row) => row.eth,
    sortable: false,
  },
  {
    name: "Last Update",
    selector: (row) => formatUpdatedDate(row.updatedAt, row.createdAt),
    sortable: false,
    width: "12rem",
  },
  {
    name: "Expiration Date",
    selector: (row) => formatExpirationDate(row.expirationDate),
    sortable: false,
    width: "12rem",
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

interface ProductsDataTableProps {
  products: Products[];
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
      backgroundColor: "#f1c40f",
      color: "black",
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

const ProductsDataTable: React.FC<ProductsDataTableProps> = ({ products }) => {
  return (
    <DataTable
      columns={columns}
      data={products}
      pagination
      customStyles={customStyles}
    />
  );
};

export default ProductsDataTable;
