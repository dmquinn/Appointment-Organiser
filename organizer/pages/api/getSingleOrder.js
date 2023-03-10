import clientPromise from "../../lib/mongodb";

export const getSingleOrder = async (_id) => {
  console.log("REQ", _id);
  //   try {
  //     const client = await clientPromise;
  //     const db = client.db("Anomic");
  //     const orders = await db.collection("orders").findById({ _id });
  //     res.json(orders);
  //   } catch (e) {
  //     console.error(e);
  //     throw new Error(e).message;
  //   }
};
