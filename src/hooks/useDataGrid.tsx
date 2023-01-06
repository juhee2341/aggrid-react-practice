import { useCallback } from "react"
import { DataGridComponent } from "../components/DataGridComponent/index";

export const useDataGrid = () => {

  const DataGrid = useCallback(
    () => {
      return <DataGridComponent />;
    }, []);

  return {
    DataGrid,
  };
};