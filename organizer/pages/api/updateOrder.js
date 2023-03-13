import { ObjectID } from "bson";
import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  const { customer, status, item, targetDate, comment } = req.body.row;
  const { key } = req.body;
  try {
    const client = await clientPromise;
    const db = client.db("Anomic");
    const orders = await db.collection("orders").updateOne(
      { _id: ObjectID(key) },
      {
        $set: {
          customer: customer,
          status: status,
          item: item,
          targetDate: targetDate,
          comment: comment,
        },
      }
    );
    res.json(orders);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
