import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useRef, useState } from "react";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { CellPosition, NavigateToNextCellParams, ICellEditorParams } from "ag-grid-community";

export const DataGridComponent = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);

  // 그리드 더미 데이터
  const [rowData] = useState([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 22000 },
    { make: 'Porsche', model: 'Boxter', price: 71000 },
    { make: 'Toyota', model: 'Celica', price: 36000 },
    { make: 'Ford', model: 'Mondeo', price: 92000 },
    { make: 'Porsche', model: 'Boxter', price: 62000 },
    { make: 'Toyota', model: 'Celica', price: 25000 },
    { make: 'Ford', model: 'Mondeo', price: 52000 },
    { make: 'Porsche', model: 'Boxter', price: 9900 },
  ]);

  const cellEditorSelector = useCallback((params: ICellEditorParams) => {
    console.log(params);
  }, []);

  // column 설정
  const [columnDefs] = useState([
    { field: 'soldout', headerCheckboxSelection: true, checkboxSelection: true, showDisabledCheckboxes: true },
    { field: 'make' },
    { field: 'model' },
    { field: 'price', editable: true },
  ]);

  // cell 클릭 event
  const onCellClicked = useCallback(() => {
    console.log('cell clicked')!
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



  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <input
            type="text"
            onInput={onQuickFilterChanged}
            id="quickFilter"
            placeholder="검색어를 입력하세요."
          />
        </div>
      </div>

      <div className="ag-theme-alpine" style={{ height: 400, width: 1200 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ sortingOrder: ['desc', 'asc'], sortable: true, resizable: true, minWidth: 100, cellStyle: { textAlign: 'left' } }}
          overlayNoRowsTemplate={'데이터가 없을 때 보여주는 텍스트입니다.'}
          rowSelection='multiple' // 클릭하고 ctrl, shift 누르면 다중 선택가능
          suppressRowClickSelection={true}
          onCellClicked={onCellClicked}
          navigateToNextCell={navigateToNextCell}

        ></AgGridReact>
      </div>
    </div>

  )
}