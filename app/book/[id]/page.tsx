"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/footer";
import {
  ArrowLeft,
  Calendar,
  Users,
  Star,
  MapPin,
  Shield,
  CreditCard,
  Smartphone,
  CheckCircle,
  Loader2,
  Plus,
  Minus,
  Info,
} from "lucide-react";

// Mock property data - replace with actual data fetching
const propertyData = {
  id: "1",
  title: "Luxury Beachfront Villa in Diani",
  location: "Diani Beach, Kwale County, Kenya",
  rating: 4.89,
  reviewCount: 127,
  images: [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop",
  ],
  price: 15000,
  maxGuests: 8,
  hostName: "Sarah Mwangi",
  instantBook: true,
};

export default function BookingPage({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    infants: 0,
    guestInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
    paymentMethod: "mpesa",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate nights and total price
  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const subtotal = propertyData.price * nights;
  const cleaningFee = 2500;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + cleaningFee + serviceFee;

  const totalGuests = bookingData.adults + bookingData.children;

  const updateGuestCount = (
    type: "adults" | "children" | "infants",
    increment: boolean
  ) => {
    setBookingData((prev) => ({
      ...prev,
      [type]: increment
        ? Math.min(prev[type] + 1, type === "adults" ? 8 : 5)
        : Math.max(prev[type] - 1, type === "adults" ? 1 : 0),
    }));
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!bookingData.checkIn) newErrors.checkIn = "Check-in date is required";
      if (!bookingData.checkOut)
        newErrors.checkOut = "Check-out date is required";
      if (bookingData.checkIn && bookingData.checkOut) {
        const checkIn = new Date(bookingData.checkIn);
        const checkOut = new Date(bookingData.checkOut);
        if (checkOut <= checkIn) {
          newErrors.checkOut = "Check-out must be after check-in";
        }
        if (checkIn < new Date()) {
          newErrors.checkIn = "Check-in date cannot be in the past";
        }
      }
      if (totalGuests > propertyData.maxGuests) {
        newErrors.guests = `Maximum ${propertyData.maxGuests} guests allowed`;
      }
    }

    if (step === 2) {
      if (!bookingData.guestInfo.firstName)
        newErrors.firstName = "First name is required";
      if (!bookingData.guestInfo.lastName)
        newErrors.lastName = "Last name is required";
      if (!bookingData.guestInfo.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(bookingData.guestInfo.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!bookingData.guestInfo.phone)
        newErrors.phone = "Phone number is required";
      else if (
        !/^(\+254|0)[17]\d{8}$/.test(
          bookingData.guestInfo.phone.replace(/\s/g, "")
        )
      ) {
        newErrors.phone = "Please enter a valid Kenyan phone number";
      }
    }

    if (step === 3) {
      if (!bookingData.agreeToTerms)
        newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleBooking = async () => {
    if (!validateStep(3)) return;

    setIsLoading(true);
    try {
      // TODO: Implement actual booking logic
      console.log("Booking data:", bookingData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Redirect to confirmation page
      // router.push(`/booking-confirmation/${params.id}`)
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href={`/property/${params.id}`}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to property</span>
            </Link>

            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">
                Secure Booking
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: "Dates & Guests", icon: Calendar },
              { step: 2, title: "Guest Info", icon: Users },
              { step: 3, title: "Payment", icon: CreditCard },
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep > step ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    currentStep >= step ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Dates & Guests */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Select dates and guests
                </h2>

                {/* Date Selection */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-in
                      </label>
                      <Input
                        type="date"
                        value={bookingData.checkIn}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            checkIn: e.target.value,
                          }))
                        }
                        className={`${
                          errors.checkIn ? "border-red-500" : "border-blue-200"
                        } focus:border-blue-500`}
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {errors.checkIn && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.checkIn}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-out
                      </label>
                      <Input
                        type="date"
                        value={bookingData.checkOut}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            checkOut: e.target.value,
                          }))
                        }
                        className={`${
                          errors.checkOut ? "border-red-500" : "border-blue-200"
                        } focus:border-blue-500`}
                        min={
                          bookingData.checkIn ||
                          new Date().toISOString().split("T")[0]
                        }
                      />
                      {errors.checkOut && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.checkOut}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Guest Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Guests
                    </h3>
                    <div className="space-y-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between p-4 border border-blue-200 rounded-xl">
                        <div>
                          <div className="font-medium text-gray-900">
                            Adults
                          </div>
                          <div className="text-sm text-gray-600">
                            Ages 13 or above
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuestCount("adults", false)}
                            disabled={bookingData.adults <= 1}
                            className="w-8 h-8 p-0 rounded-full"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {bookingData.adults}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuestCount("adults", true)}
                            disabled={bookingData.adults >= 8}
                            className="w-8 h-8 p-0 rounded-full"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between p-4 border border-blue-200 rounded-xl">
                        <div>
                          <div className="font-medium text-gray-900">
                            Children
                          </div>
                          <div className="text-sm text-gray-600">Ages 2-12</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuestCount("children", false)}
                            disabled={bookingData.children <= 0}
                            className="w-8 h-8 p-0 rounded-full"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {bookingData.children}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuestCount("children", true)}
                            disabled={bookingData.children >= 5}
                            className="w-8 h-8 p-0 rounded-full"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className="flex items-center justify-between p-4 border border-blue-200 rounded-xl">
                        <div>
                          <div className="font-medium text-gray-900">
                            Infants
                          </div>
                          <div className="text-sm text-gray-600">Under 2</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuestCount("infants", false)}
                            disabled={bookingData.infants <= 0}
                            className="w-8 h-8 p-0 rounded-full"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {bookingData.infants}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateGuestCount("infants", true)}
                            disabled={bookingData.infants >= 5}
                            className="w-8 h-8 p-0 rounded-full"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {errors.guests && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.guests}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Guest Information */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Guest information
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <Input
                        value={bookingData.guestInfo.firstName}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            guestInfo: {
                              ...prev.guestInfo,
                              firstName: e.target.value,
                            },
                          }))
                        }
                        className={`${
                          errors.firstName
                            ? "border-red-500"
                            : "border-blue-200"
                        } focus:border-blue-500`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <Input
                        value={bookingData.guestInfo.lastName}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            guestInfo: {
                              ...prev.guestInfo,
                              lastName: e.target.value,
                            },
                          }))
                        }
                        className={`${
                          errors.lastName ? "border-red-500" : "border-blue-200"
                        } focus:border-blue-500`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={bookingData.guestInfo.email}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          guestInfo: {
                            ...prev.guestInfo,
                            email: e.target.value,
                          },
                        }))
                      }
                      className={`${
                        errors.email ? "border-red-500" : "border-blue-200"
                      } focus:border-blue-500`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={bookingData.guestInfo.phone}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          guestInfo: {
                            ...prev.guestInfo,
                            phone: e.target.value,
                          },
                        }))
                      }
                      className={`${
                        errors.phone ? "border-red-500" : "border-blue-200"
                      } focus:border-blue-500`}
                      placeholder="+254 7XX XXX XXX or 07XX XXX XXX"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={bookingData.guestInfo.specialRequests}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          guestInfo: {
                            ...prev.guestInfo,
                            specialRequests: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                      rows={4}
                      placeholder="Any special requests or requirements..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Payment method
                </h2>

                <div className="space-y-6">
                  {/* Payment Methods */}
                  <div className="space-y-3">
                    <div
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                        bookingData.paymentMethod === "mpesa"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() =>
                        setBookingData((prev) => ({
                          ...prev,
                          paymentMethod: "mpesa",
                        }))
                      }
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            M-Pesa
                          </div>
                          <div className="text-sm text-gray-600">
                            Pay with your mobile money
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                        bookingData.paymentMethod === "card"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() =>
                        setBookingData((prev) => ({
                          ...prev,
                          paymentMethod: "card",
                        }))
                      }
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Credit/Debit Card
                          </div>
                          <div className="text-sm text-gray-600">
                            Visa, Mastercard accepted
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={bookingData.agreeToTerms}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            agreeToTerms: e.target.checked,
                          }))
                        }
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-blue-600 hover:text-blue-700 underline"
                        >
                          Terms of Service
                        </Link>
                        ,{" "}
                        <Link
                          href="/privacy"
                          className="text-blue-600 hover:text-blue-700 underline"
                        >
                          Privacy Policy
                        </Link>
                        , and{" "}
                        <Link
                          href="/cancellation"
                          className="text-blue-600 hover:text-blue-700 underline"
                        >
                          Cancellation Policy
                        </Link>
                      </label>
                    </div>
                    {errors.terms && (
                      <p className="text-sm text-red-600">{errors.terms}</p>
                    )}
                  </div>

                  {/* Important Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <div className="font-semibold mb-1">
                          Important information
                        </div>
                        <ul className="space-y-1 text-blue-700">
                          <li>
                            • You'll be charged immediately upon booking
                            confirmation
                          </li>
                          <li>
                            • Free cancellation up to 48 hours before check-in
                          </li>
                          <li>
                            • Host will be notified of your booking within 24
                            hours
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Back
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleBooking}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                {/* Property Summary */}
                <div className="p-6 border-b border-blue-100">
                  <div className="flex space-x-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={propertyData.images[0] || "/placeholder.svg"}
                        alt={propertyData.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                        {propertyData.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">
                          {propertyData.location}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-current text-yellow-500" />
                          <span className="text-sm font-medium text-gray-900 ml-1">
                            {propertyData.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({propertyData.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="p-6 space-y-4">
                  {bookingData.checkIn && bookingData.checkOut && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Check-in</span>
                        <span className="font-medium text-gray-900">
                          {new Date(bookingData.checkIn).toLocaleDateString(
                            "en-GB"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Check-out</span>
                        <span className="font-medium text-gray-900">
                          {new Date(bookingData.checkOut).toLocaleDateString(
                            "en-GB"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Guests</span>
                        <span className="font-medium text-gray-900">
                          {totalGuests} guest{totalGuests !== 1 ? "s" : ""}
                          {bookingData.infants > 0 &&
                            `, ${bookingData.infants} infant${
                              bookingData.infants !== 1 ? "s" : ""
                            }`}
                        </span>
                      </div>
                    </div>
                  )}

                  {nights > 0 && (
                    <>
                      <hr className="border-blue-100" />

                      {/* Price Breakdown */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            KSh {propertyData.price.toLocaleString()} × {nights}{" "}
                            night{nights !== 1 ? "s" : ""}
                          </span>
                          <span className="font-medium text-gray-900">
                            KSh {subtotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Cleaning fee</span>
                          <span className="font-medium text-gray-900">
                            KSh {cleaningFee.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Service fee</span>
                          <span className="font-medium text-gray-900">
                            KSh {serviceFee.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <hr className="border-blue-100" />

                      <div className="flex items-center justify-between font-bold text-lg">
                        <span className="text-gray-900">Total</span>
                        <span className="text-blue-600">
                          KSh {total.toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Instant Book Badge */}
                {propertyData.instantBook && (
                  <div className="px-6 pb-6">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          Instant Book Available
                        </span>
                      </div>
                      <p className="text-xs text-green-700 mt-1">
                        Your booking will be confirmed immediately
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
