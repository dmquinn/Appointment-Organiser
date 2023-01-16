import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import { WithId, Document } from "mongodb";
import { useEffect } from "react";
import Homepage from "./Homepage";
type Props = {
  posts: [Order];
};

type Order = {
  _id: String | Number;
  orderNo: String | Number;
  customer: {
    name: { type: String };
    email: { type: String };
    phone: { type: String };
  };
  item: {
    title: { type: String };
    category: { type: String };
  };
  status: { type: String };
  targetDate: { type: String | Date };
};
export async function getServerSideProps() {
  try {
    let response = await fetch("http://localhost:3000/api/getOrders");
    let orders = await response.json();

    return {
      props: { orders: JSON.parse(JSON.stringify(orders)) },
    };
  } catch (e) {
    console.error(e);
  }
}

export default function App({
  orders,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
      <Homepage orders={orders} />
    </div>
  );
}
