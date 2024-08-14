import express from "express";
import sensorRoutes from "./routes/sensorRoutes";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use("/api/sensors", sensorRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export { prisma };
