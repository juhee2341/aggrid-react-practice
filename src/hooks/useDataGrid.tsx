import { SelectionChangedEvent } from "ag-grid-community";
import { useCallback, useRef, useState } from "react"
import { DataGridComponent, DataGridHandle, DataGridPropsType } from "../components/DataGridComponent/index";

export const useDataGrid = () => {
  const DataGridRef = useRef<DataGridHandle>(null);

  const [selected, setSelected] = useState<any>([]);

  const onSelectionChanged = useCallback((e: SelectionChangedEvent) => {
    setSelected(e.api.getSelectedRows());
  }, [])

  const DataGrid = useCallback(
    (props: Omit<DataGridPropsType, 'onSelectionChanged'>) => {
      return <DataGridComponent {...props} onSelectionChanged={onSelectionChanged} ref={DataGridRef} />;
    }, [onSelectionChanged]);

  const refresh = () => {
    DataGridRef.current?.refresh();
  }

  return {
    DataGrid,
    refresh,
    selected,
  };
};