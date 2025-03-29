"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";

export default function KYCStep2() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [docType, setDocType] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Do KYC submit logic here
    router.push("/dashboard");
  };

  return (
    <MainLayout>
        <div className="flex flex-col min-h-screen px-4 py-6 relative">
      <button onClick={() => router.back()} className="absolute top-4 left-4 mb-10">
        <X className="text-black" />
      </button>

      <h2 className="text-center font-mono text-sm mb-2 font-bold">Complete KYC</h2>

      <div className="flex mb-4">
        <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
          2 of 2
        </span>
      </div>

      <h1 className="text-xl font-bold text-blue-600 mb-2">
        Verify your ID
      </h1>
      <p className="text-gray-700 text-sm mb-6">
        We require a photo of a government issued ID to verify your identity.
      </p>

      <input
        type="text"
        placeholder="John"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="bg-blue-100 p-3 rounded-md mb-3 text-black placeholder-gray-600"
      />
      <input
        type="text"
        placeholder="Doe"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="bg-blue-100 p-3 rounded-md mb-3 text-black placeholder-gray-600"
      />
      <select
        value={docType}
        onChange={(e) => setDocType(e.target.value)}
        className="bg-blue-100 p-3 rounded-md mb-3 text-black"
      >
        <option value="">Select document type</option>
        <option value="passport">Passport</option>
        <option value="license">Driver License</option>
        <option value="national">National ID</option>
      </select>

      <label className="flex items-center gap-2 bg-blue-100 p-3 rounded-md mb-6 cursor-pointer">
        <Upload className="w-4 h-4 text-black" />
        <span className="text-gray-700 text-sm">
          {file ? file.name : "Upload image here"}
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 font-bold text-white py-3 rounded-full font-mono text-sm"
      >
        Verify
      </button>
    </div>
    </MainLayout>
  );
}
