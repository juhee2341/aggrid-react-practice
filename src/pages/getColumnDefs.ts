export type colDef = {
  field: string;
  headerCheckboxSelection?: boolean;
  checkboxSelection?: boolean;
  showDisabledCheckboxes?: boolean;
  editable?: boolean;
}

export const getColumnDefs = () => {
  return [
    { headerName: 'Soldout', field: 'soldout', headerCheckboxSelection: true, checkboxSelection: true, showDisabledCheckboxes: true, minWidth: 150, maxWidth: 150, },
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price', editable: true },
  ];
};