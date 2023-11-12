import { connect } from "mongoose";

// xUsBzl9OsxLwkhYC

const uri =
  "mongodb+srv://joelnicolass:xUsBzl9OsxLwkhYC@cluster0.sldoitv.mongodb.net/?retryWrites=true&w=majority";

export const connectDB = async () => {
  const connection = await connect(uri);
  console.log("> DB is connected");

  return connection;
};
