import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import DBConnect from "./config/db.js";
import adminRoutes from "./routes/admin.routes.js"
import resultRoutes from "./routes/result.routes.js"
import testRoutes from "./routes/test.routes.js"
import userRoutes from "./routes/user.routes.js"

dotenv.config();
DBConnect();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/result", resultRoutes)
app.use("/test", testRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}/`);
});