import express from "express";
import { kyc } from "../controllers/app";

const router = express.Router();

router
  .post("/kyc", kyc)
  .post("/")

export default router;