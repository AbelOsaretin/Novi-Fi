import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import appRoutes from "./src/routes/appRoutes";
import logger from "./src/config/logger";
dotenv.config();

const server = express();

server.use(express.json());
// server.use(cors({ origin: ["http://localhost:3000"] }));

server.use("/api", appRoutes);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  logger.info("Server is running on port:", PORT);
});
