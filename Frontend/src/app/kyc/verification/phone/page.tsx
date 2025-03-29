"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function PhoneVerificationPage() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [step, setStep] = useState<"phone" | "code">("phone")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleBack = () => {
    if (step === "code") {
      setStep("phone")
    } else {
      router.push("/verification")
    }
  }

  const handleSubmitPhone = () => {
    if (!phoneNumber || phoneNumber.length < 10) return

    setIsSubmitting(true)

    // Simulate API call to send verification code
    setTimeout(() => {
      setIsSubmitting(false)
      setStep("code")
    }, 1500)
  }

  const handleVerifyCode = () => {
    if (!verificationCode || verificationCode.length < 4) return

    setIsSubmitting(true)

    // Simulate API call to verify code
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/verification?phone=verified")
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[url('/assets/app-background.png')] bg-cover bg-center bg-no-repeat font-(family-name:--font-ibm-plex)">
      {/* Header */}
      <header className="p-4 flex items-center">
        <button onClick={handleBack} className="text-blue-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-medium text-center flex-1">
          {step === "phone" ? "Phone Verification" : "Verify Code"}
        </h1>
        <div className="w-6"></div> {/* Spacer for alignment */}
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col">
        {step === "phone" ? (
          <>
            <div className="mb-8">
              <p className="text-gray-600 mb-6">Please enter your phone number. We&apos;ll send you a verification code.</p>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm text-gray-500">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="+1 (555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <button
              className={`w-full py-4 rounded-md text-white font-medium text-lg mt-auto ${
                phoneNumber.length < 10 ? "bg-gray-300" : "bg-blue-600"
              }`}
              onClick={handleSubmitPhone}
              disabled={phoneNumber.length < 10 || isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Verification Code"}
            </button>
          </>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-gray-600 mb-6">
                We&apos;ve sent a verification code to {phoneNumber}. Please enter it below.
              </p>
              <div className="space-y-2">
                <label htmlFor="code" className="text-sm text-gray-500">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="code"
                  className="w-full p-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest"
                  placeholder="• • • •"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
              <button className="text-blue-600 text-sm mt-2">Resend Code</button>
            </div>

            <button
              className={`w-full py-4 rounded-md text-white font-medium text-lg mt-auto ${
                verificationCode.length < 4 ? "bg-gray-300" : "bg-blue-600"
              }`}
              onClick={handleVerifyCode}
              disabled={verificationCode.length < 4 || isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </button>
          </>
        )}
      </main>
    </div>
  )
}

