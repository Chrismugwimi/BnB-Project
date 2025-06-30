"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [formData, setFormData] = useState({
    mpesaNumber: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    bankAccount: "",
    bankCode: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingDetails] = useState({
    propertyName: "Modern Beachfront Villa",
    location: "Mombasa, Kenya",
    checkinDate: "2025-07-01",
    checkoutDate: "2025-07-03",
    guests: 2,
    nights: 2,
    subtotal: 24000,
    serviceFee: 2400,
    total: 26400,
    guestName: "John Doe",
    guestEmail: "john.doe@example.com",
    guestPhone: "+254 700 000 000",
  });

  const paymentMethods = [
    {
      id: "mpesa",
      name: "M-Pesa",
      icon: "📱",
      description: "Pay securely with M-Pesa",
      popular: true,
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: "💳",
      description: "Visa, Mastercard accepted",
      popular: false,
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: "🏦",
      description: "Direct bank transfer",
      popular: false,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      cardNumber: formatted,
    }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setFormData((prev) => ({
      ...prev,
      expiryDate: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Show success message
      alert(`🎉 Payment successful! Your booking is confirmed. 
      
Booking Details:
Property: ${bookingDetails.propertyName}
Dates: ${bookingDetails.checkinDate} to ${bookingDetails.checkoutDate}
Total: KSh ${bookingDetails.total.toLocaleString()}

You will receive a confirmation email shortly.`);
    } catch (error) {
      alert("Payment failed. Please try again or contact support.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 py-5 mb-10">
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          <Link href="/" className="flex items-center text-white no-underline">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center mr-3 text-white text-xl">
              🏠
            </div>
            <span className="text-2xl font-bold">
              My<span className="text-orange-500"> Bnb</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-white/80">
              <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs">
                ✓
              </span>
              <span className="text-sm">Booking Details</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs">
                2
              </span>
              <span className="text-sm font-semibold">Payment</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
          {/* Payment Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm animate-[slideUp_0.5s_ease-out]">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Complete Your Payment
              </h1>
              <p className="text-gray-600">
                Choose your preferred payment method to confirm your booking
              </p>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Method
              </h3>
              <div className="grid gap-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                      paymentMethod === method.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                              {method.name}
                            </span>
                            {method.popular && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                Most Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {method.description}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === method.id
                            ? "border-orange-500 bg-orange-500"
                            : "border-gray-300"
                        }`}
                      >
                        {paymentMethod === method.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            <div onSubmit={handleSubmit}>
              {paymentMethod === "mpesa" && (
                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold text-gray-900">
                    M-Pesa Details
                  </h4>
                  <div>
                    <label
                      htmlFor="mpesaNumber"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      M-Pesa Phone Number
                    </label>
                    <input
                      type="tel"
                      id="mpesaNumber"
                      name="mpesaNumber"
                      value={formData.mpesaNumber}
                      onChange={handleInputChange}
                      placeholder="+254 700 000 000"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      required
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-blue-500 text-xl">ℹ️</span>
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">
                          How M-Pesa payment works:
                        </p>
                        <ol className="list-decimal list-inside space-y-1 text-blue-700">
                          <li>Enter your M-Pesa registered phone number</li>
                          <li>Click &quot;Pay Now&quot; to initiate payment</li>
                          <li>You&apos;ll receive an STK push notification</li>
                          <li>Enter your M-Pesa PIN to complete payment</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold text-gray-900">Card Details</h4>
                  <div>
                    <label
                      htmlFor="cardholderName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      id="cardholderName"
                      name="cardholderName"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="4"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold text-gray-900">
                    Bank Transfer Details
                  </h4>
                  <div>
                    <label
                      htmlFor="bankCode"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Bank
                    </label>
                    <select
                      id="bankCode"
                      name="bankCode"
                      value={formData.bankCode}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      required
                    >
                      <option value="">Select your bank</option>
                      <option value="KCB">KCB Bank</option>
                      <option value="EQUITY">Equity Bank</option>
                      <option value="COOP">Co-operative Bank</option>
                      <option value="ABSA">Absa Bank</option>
                      <option value="DTBK">Diamond Trust Bank</option>
                      <option value="STANBIC">Stanbic Bank</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="bankAccount"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Account Number
                    </label>
                    <input
                      type="text"
                      id="bankAccount"
                      name="bankAccount"
                      value={formData.bankAccount}
                      onChange={handleInputChange}
                      placeholder="1234567890"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      required
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-orange-500 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-orange-600 hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Pay KSh ${bookingDetails.total.toLocaleString()}`
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                <span>🔒</span>
                <span>Your payment information is secure and encrypted</span>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-5 animate-[slideUp_0.6s_ease-out]">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Booking Summary
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg flex items-center justify-center text-2xl">
                  🏖️
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {bookingDetails.propertyName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {bookingDetails.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Check-in</span>
                <span className="font-medium">
                  {formatDate(bookingDetails.checkinDate)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Check-out</span>
                <span className="font-medium">
                  {formatDate(bookingDetails.checkoutDate)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Guests</span>
                <span className="font-medium">
                  {bookingDetails.guests} guests
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  KSh 12,000 × {bookingDetails.nights} nights
                </span>
                <span>KSh {bookingDetails.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service fee</span>
                <span>KSh {bookingDetails.serviceFee.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-200">
              <span>Total</span>
              <span>KSh {bookingDetails.total.toLocaleString()}</span>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">
                Guest Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name</span>
                  <span className="font-medium">
                    {bookingDetails.guestName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium">
                    {bookingDetails.guestEmail}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-medium">
                    {bookingDetails.guestPhone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
