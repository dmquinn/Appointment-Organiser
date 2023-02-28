import { InferGetServerSidePropsType } from "next";
import DataTable from "./components/DataTable";
import { setOrders } from "../redux/ordersSlice";
import { wrapper } from "../redux/store";
import { useEffect } from "react";

// export const getServerSideProps = wrapper.getServerSideProps(
//   // @ts-ignore
//   (store) => async () => {
//     const response = await fetch(`http://localhost:3000/api/getOrders`);
//     const data = await response.json();
//     console.log("DATADATA", data);
//     store.dispatch(setOrders(data));
//   }
// );



export default function App() {
  const handleDeletePost = async (postId: string) => {
    try {
      let response = await fetch(
        "http://localhost:3000/api/deletePost?id=" + postId,
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      window.location.reload();
    } catch (error) {
      console.log("An error occurred while deleting ", error);
    }
  };

  return (
    <div className="container">
      <DataTable
        isConnected={undefined}
        loadOrders={undefined}
      />
    </div>
  );
}
