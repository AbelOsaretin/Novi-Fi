import type { Request, Response } from "express";
import logger from "../config/logger";
import type { documentTypes } from "../utils/types";
import KYC from "../model/kycModel";


export const kyc = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, documentType } = req.body;

    if (!firstName || !lastName || !documentType) {
      res.status(400).json("Please provide all required fields");
      return
    }

    const saveKYCInfo = new KYC(req.body);
    await saveKYCInfo.save();

    res.status(200).json("KYC submitted successfully");
  } catch (error) {
    logger.error("Error submitting KYC:", error);
    res.status(500).send("Error submitting KYC");
  }
}