import mongoose from "mongoose";

mongoose
  .connect(String(process.env.MONGO_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"));
