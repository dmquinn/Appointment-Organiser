import Homepage from "./Homepage";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";

export async function getServerSideProps(context) {
  try {
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

const App = ({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Homepage />
      {isConnected ? (
        <h2 className="subtitle">You are connected to MongoDB</h2>
      ) : (
        <h2 className="subtitle">
          You are NOT connected to MongoDB. Check the <code>README.md</code> for
          instructions.
        </h2>
      )}
    </>
  );
};

export default App;
