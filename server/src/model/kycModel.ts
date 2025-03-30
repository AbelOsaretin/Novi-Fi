import mongoose from "mongoose";

const kycSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  documentType: {
    type: String,
    required: true,
    enum: ["passport", "driverLicense", "votersCard", "BVN", "NIN", "IDCard"],
  }
});

const KYC = mongoose.model("KYC", kycSchema);

export default KYC;