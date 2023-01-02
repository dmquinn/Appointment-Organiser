import { connect, ConnectionOptions } from "mongoose";
const // Attempts to connect to MongoDB and then tries to connect locally:)
  MONGO_URI = process.env.MONGODB_URI;

console.log(MONGO_URI);

const options: ConnectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export const connectToDatabase = () => connect(MONGO_URI, options);
