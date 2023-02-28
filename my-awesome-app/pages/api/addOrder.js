import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Anomic");
    const { customer, item, targetDate, repairs, orderNo, status } = req.body;
    const orders = await db
      .collection("orders")
      .insertOne({ customer, item, targetDate, repairs, orderNo, status });

    res.json(orders);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
