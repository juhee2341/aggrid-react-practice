import { useState } from "react";
import { dummyData } from "../dummydata/dummyData";
import { useDataGrid } from "../hooks/useDataGrid"
import { getColumnDefs } from "./getColumnDefs";

export const TestPage = () => {
  const { DataGrid, refresh } = useDataGrid();
  const [rowData, setRowData] = useState<Array<any>>(dummyData);

  const [columnDefs] = useState([
    { field: 'soldout', headerCheckboxSelection: true, checkboxSelection: true, showDisabledCheckboxes: true },
    { field: 'make' },
    { field: 'model' },
    { field: 'price', editable: true },
  ]);

  return (
    <DataGrid rowData={rowData} columnDefs={columnDefs} suppressRowClickSelection sizeColumnsToFit />
  )
}