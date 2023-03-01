import DataTable from "./components/DataTable";

export default function App() {
  return (
    <div className="container">
      <DataTable isConnected={undefined} loadOrders={undefined} />
    </div>
  );
}
