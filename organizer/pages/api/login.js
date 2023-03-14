import { ObjectID } from "bson";
import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  const { email, password } = req.body;
  const { key } = req.body;
  try {
    const client = await clientPromise;
    const db = client.db("Anomic");
    const userFromDB = await db.collection("orders").findOne({ email: email });

    if (!userFromDB) {
      res
        .status(400)
        .json({ message: "An account exists with the email provided." });
      return;
    }
    if (password === userFromDB.password) {
      const { _id, email, name } = userFromDB;

      const payload = { _id, email, name };

      res.status(200).json({ payload });
    } else {
      res.status(401).json({ message: "Unable to authenticate the user" });
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
