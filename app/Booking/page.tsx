"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header/page";

export default function BookingPage() {
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [pricing, setPricing] = useState({
    nights: 1,
    subtotal: 12000,
    serviceFee: 1200,
    total: 13200,
  });

  // Initialize dates on component mount
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setCheckinDate(today.toISOString().split("T")[0]);
    setCheckoutDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  // Calculate pricing whenever dates or guests change
  useEffect(() => {
    if (checkinDate && checkoutDate) {
      const checkin = new Date(checkinDate);
      const checkout = new Date(checkoutDate);

      if (checkout > checkin) {
        const nights = Math.ceil(
          (checkout.getTime() - checkin.getTime()) / (1000 * 60 * 60 * 24)
        );
        const basePrice = 12000;
        const extraGuestFee = guests > 4 ? (guests - 4) * 1000 : 0;
        const subtotal = (basePrice + extraGuestFee) * nights;
        const serviceFee = Math.round(subtotal * 0.1);
        const total = subtotal + serviceFee;

        setPricing({
          nights,
          subtotal,
          serviceFee,
          total,
        });
      }
    }
  }, [checkinDate, checkoutDate, guests]);

  const handleCheckinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckin = e.target.value;
    setCheckinDate(newCheckin);

    // Update checkout minimum date
    const checkin = new Date(newCheckin);
    const nextDay = new Date(checkin);
    nextDay.setDate(nextDay.getDate() + 1);

    if (new Date(checkoutDate) <= checkin) {
      setCheckoutDate(nextDay.toISOString().split("T")[0]);
    }
  };

  const handleGuestChange = (increment: number) => {
    setGuests((prev) => {
      const newGuests = prev + increment;
      return Math.max(1, Math.min(8, newGuests));
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Simulate booking process
    const submitBtn = e.currentTarget.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    if (submitBtn) {
      submitBtn.textContent = "Processing...";
      submitBtn.disabled = true;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(
        "🎉 Booking confirmed! You will receive confirmation details via email."
      );
    } catch {
      alert("Booking failed. Please try again.");
    } finally {
      submitBtn.textContent = "Reserve Now";
      submitBtn.disabled = false;
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
          {/* Property Information */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-[fadeIn_0.6s_ease-out]">
            <div className="w-full h-75 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-lg">
              Beautiful Property Image
            </div>
            <div className="p-8 lg:p-7">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Modern Beachfront Villa
              </h1>
              <div className="text-gray-500 mb-5 flex items-center gap-2">
                <span>📍</span>
                <span>Mombasa, Kenya</span>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  "🏊‍♂️ Pool",
                  "🌊 Ocean View",
                  "📶 WiFi",
                  "🅿️ Parking",
                  "🍳 Kitchen",
                  "❄️ AC",
                ].map((feature) => (
                  <span
                    key={feature}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <p className="text-gray-500 leading-relaxed">
                Experience luxury and comfort in this stunning beachfront villa.
                Wake up to breathtaking ocean views, enjoy your morning coffee
                by the private pool, and spend your days lounging on the
                pristine beach just steps from your door. This modern property
                features spacious bedrooms, a fully equipped kitchen, and
                premium amenities throughout.
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl p-8 lg:p-7 shadow-md border border-gray-200 sticky top-5 animate-[slideUp_0.5s_ease-out]">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Reserve Your Stay
              </h2>
              <div className="text-blue-800 text-lg font-semibold">
                KSh 12,000 / night
              </div>
            </div>

            <div onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 mb-5">
                <div className="space-y-2">
                  <label
                    htmlFor="checkin"
                    className="block text-gray-700 font-semibold text-sm"
                  >
                    Check-in
                  </label>
                  <input
                    type="date"
                    id="checkin"
                    value={checkinDate}
                    onChange={handleCheckinChange}
                    min={today}
                    className="w-full p-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-orange-500 focus:ring-3 focus:ring-orange-100"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="checkout"
                    className="block text-gray-700 font-semibold text-sm"
                  >
                    Check-out
                  </label>
                  <input
                    type="date"
                    id="checkout"
                    value={checkoutDate}
                    onChange={(e) => setCheckoutDate(e.target.value)}
                    min={
                      checkinDate
                        ? new Date(new Date(checkinDate).getTime() + 86400000)
                            .toISOString()
                            .split("T")[0]
                        : tomorrowStr
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-orange-500 focus:ring-3 focus:ring-orange-100"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <label className="block text-gray-700 font-semibold text-sm">
                  Guests
                </label>
                <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white transition-all duration-200 focus-within:border-orange-500 focus-within:ring-3 focus-within:ring-orange-100">
                  <span>Number of guests</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleGuestChange(-1)}
                      disabled={guests <= 1}
                      className="w-8 h-8 border border-gray-300 rounded-md bg-white text-gray-700 text-base cursor-pointer transition-all duration-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                    <span className="font-semibold text-gray-900 min-w-6 text-center">
                      {guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleGuestChange(1)}
                      disabled={guests >= 8}
                      className="w-8 h-8 border border-gray-300 rounded-md bg-white text-gray-700 text-base cursor-pointer transition-all duration-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold text-sm"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full p-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-orange-500 focus:ring-3 focus:ring-orange-100"
                  required
                />
              </div>

              <div className="space-y-2 mb-5">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold text-sm"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full p-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-orange-500 focus:ring-3 focus:ring-orange-100"
                  required
                />
              </div>

              <div className="space-y-2 mb-5">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-semibold text-sm"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+254 700 000 000"
                  className="w-full p-3 border border-gray-300 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-orange-500 focus:ring-3 focus:ring-orange-100"
                  required
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-5 my-6">
                <div className="flex justify-between mb-3 text-gray-700">
                  <span>KSh 12,000 × {pricing.nights} night(s)</span>
                  <span>KSh {pricing.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-3 text-gray-700">
                  <span>Service fee</span>
                  <span>KSh {pricing.serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 pt-3 border-t border-gray-200 text-lg">
                  <span>Total</span>
                  <span>KSh {pricing.total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white border-none p-4 rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:bg-orange-600 hover:-translate-y-0.5"
              >
                Reserve Now
              </button>

              <div className="text-center mt-5 pt-5 border-t border-gray-200">
                <div className="text-gray-500 text-sm flex items-center justify-center gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Free cancellation • Instant confirmation</span>
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
