import { useMemo, useState } from "react";
import { dummyData } from "../dummydata/dummyData";
import { useDataGrid } from "../hooks/useDataGrid"
import { getColumnDefs } from "./getColumnDefs";

export const TestPage = () => {
  const { DataGrid, refresh, selected } = useDataGrid();

  // 그리드 더미 데이터
  const [rowData, setRowData] = useState<Array<any>>(dummyData);

  const columnDefs = useMemo(() => {
    console.log(selected);
    return getColumnDefs();
  }, [selected]);


  return (
    <DataGrid rowData={rowData} columnDefs={columnDefs} suppressRowClickSelection sizeColumnsToFit />
  )
}