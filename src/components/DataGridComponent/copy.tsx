import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef, useState } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  CellPosition,
  NavigateToNextCellParams,
  PaginationNumberFormatterParams,
  RowSelectedEvent
} from "ag-grid-community";
import { dummyData } from "../../dummydata/dummyData";

export type DataGridHandle = {
  refresh(): void;
}

export const DataGridComponent = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [paginationPageSize, setPaginationPageSize] = useState<number>(5);

  // 그리드 더미 데이터
  const [rowData, setRowData] = useState<Array<any>>(dummyData);

  // column 설정
  const [columnDefs] = useState([
    { field: 'soldout', headerCheckboxSelection: true, checkboxSelection: true, showDisabledCheckboxes: true },
    { field: 'make' },
    { field: 'model' },
    { field: 'price', editable: true },
  ]);

  // cell 클릭 event -> row 선택
  const onCellClicked = useCallback((params: RowSelectedEvent) => {
    params.node.setSelected(true)
  }, []);

  // grid 전체 data filter
  const onQuickFilterChanged = useCallback(() => {
    gridRef.current?.api.setQuickFilter(
      (document.getElementById('quickFilter') as HTMLInputElement).value
    );
  }, []);

  // 키보드 화살표 키로 row 선택 이동시 row 표시
  const navigateToNextCell = useCallback(
    (params: NavigateToNextCellParams): CellPosition | null => {
      const suggestedNextCell = params.nextCellPosition;
      const KEY_UP = 'ArrowUp';
      const KEY_DOWN = 'ArrowDown';
      const noUpOrDownKeyPressed = params.key !== KEY_DOWN && params.key !== KEY_UP;

      if (noUpOrDownKeyPressed || !suggestedNextCell) {
        return suggestedNextCell;
      }

      gridRef.current!.api.forEachNode(function (node) {
        if (node.rowIndex === suggestedNextCell!.rowIndex) {
          // true 로 설정하면 checkbox가 같이 선택된다. rowSelection 옵션에 따라 single로 설정 하면 하나의 row만 check되고, multi로 설정 하면 다수의 row가 선택된다.
          node.setSelected(false);
        }
      });
      return suggestedNextCell;
    }, []);

  // 필요한 이벤트를 지정
  const onGridReady = () => {
    //sizeColumnsToFit Grid 전체 column 맞추기
    gridRef.current?.api.sizeColumnsToFit();
  };

  // option value에 따라 page size 변경
  const onPageSizeChanged = useCallback((value: string) => {
    setPaginationPageSize(Number(value))
  }, []);

  // page 보여주는 number에 문자 추가하기 ex) [2]
  const paginationNumberFormatter = useCallback(
    (params: PaginationNumberFormatterParams) => {
      return '[' + params.value.toLocaleString() + ']';
    },
    []);

  // select 된 row data 보여주기
  const getSelectedRowData = useCallback(() => {
    let selectedData = gridRef.current!.api.getSelectedRows();
    alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    return selectedData;
  }, []);

  // select 된 row deselect로 변경하기
  const deselectRowData = useCallback(() => {
    gridRef.current?.api.deselectAll();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="display: flex">
        <div className="px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline" style={{ margin: 10 }}>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Page Size:</label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => onPageSizeChanged(e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="100">100</option>
            <option value="500">500</option>
          </select>
        </div>
        <button
          className="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2.5  duration-500 ease select-none h-11 hover:bg-gray-800 focus:outline-none focus:shadow-outline"
          onClick={deselectRowData}
        >
          All Deselect
        </button>
        <button
          className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2.5 transition duration-500 ease select-none h-11 hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
          onClick={getSelectedRowData}
        >
          Get Selected Data
        </button>
        <div className="mb-5px m-2.5">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            onInput={onQuickFilterChanged}
            id="quickFilter"
            placeholder="검색어를 입력하세요."
          />
        </div>
      </div>

      <div className="ag-theme-alpine" style={{ height: "400px" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ sortingOrder: ['desc', 'asc'], sortable: true, resizable: true, minWidth: 100, cellStyle: { textAlign: 'left' } }}
          overlayNoRowsTemplate={'데이터가 없을 때 보여주는 텍스트입니다.'}
          rowSelection='multiple'
          suppressRowClickSelection={true}
          onCellClicked={onCellClicked}
          navigateToNextCell={navigateToNextCell}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={paginationPageSize}
          overlayLoadingTemplate={'<span class="ag-overlay-loading-center">잠시만 기다려주세요...</span>'}
        ></AgGridReact>
      </div>
    </div>

  )
}