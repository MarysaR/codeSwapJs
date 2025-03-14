import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", testRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
