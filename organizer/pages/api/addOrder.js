import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Anomic");
    const orders = await db.collection("orders").insertOne(req.body.data);
    res.json(orders);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
