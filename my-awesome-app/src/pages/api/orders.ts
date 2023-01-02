import { connectToDatabase } from "../../lib/mongodb";
import { Order } from "../../models/OrderModel";

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();
    const orders = await Order.find({});
    console.log(orders);
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
