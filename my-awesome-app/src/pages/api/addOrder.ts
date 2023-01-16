import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("Anomic");

    const post = await db.collection("orders").insertOne(req.body);

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
