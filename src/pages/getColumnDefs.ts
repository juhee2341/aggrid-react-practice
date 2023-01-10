export type colDef = {
  field: string;
  headerCheckboxSelection?: boolean;
  checkboxSelection?: boolean;
  showDisabledCheckboxes?: boolean;
  editable?: boolean;
}

export const getColumnDefs = () => {
  return [
    { field: 'soldout', headerCheckboxSelection: true, checkboxSelection: true, showDisabledCheckboxes: true },
    { field: 'make' },
    { field: 'model' },
    { field: 'price', editable: true },
  ];
};