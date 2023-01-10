import { useCallback, useRef } from "react"
import { DataGridComponent, DataGridHandle, DataGridPropsType } from "../components/DataGridComponent/index";

export const useDataGrid = () => {
  const DataGridRef = useRef<DataGridHandle>(null);

  const DataGrid = useCallback(
    (props: DataGridPropsType) => {
      return <DataGridComponent {...props} ref={DataGridRef} />;
    }, []);

  const refresh = () => {
    DataGridRef.current?.refresh();
  }

  return {
    DataGrid,
    refresh,
  };
};