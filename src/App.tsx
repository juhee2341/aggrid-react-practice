import { useDataGrid } from "./hooks/useDataGrid";


function App() {
  const { DataGrid } = useDataGrid();
  return (
    <div className="App">
      <DataGrid />
    </div>
  );
}

export default App;
