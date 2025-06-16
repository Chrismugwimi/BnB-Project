"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";
import {
  Heart,
  Share,
  Star,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Tv,
  Wind,
  Waves,
  ChevronLeft,
  ChevronRight,
  Award,
  MessageCircle,
  Phone,
  ArrowLeft,
  Users,
  Bed,
  Bath,
  Calendar,
  Shield,
  CheckCircle,
  Camera,
} from "lucide-react";

// Mock data - replace with actual data fetching
const propertyData = {
  id: "1",
  title: "Luxury Beachfront Villa in Diani",
  location: "Diani Beach, Kwale County, Kenya",
  rating: 4.89,
  reviewCount: 127,
  hostName: "Sarah Mwangi",
  hostImage:
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  hostJoinDate: "2019",
  superhost: true,
  images: [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
  ],
  price: 15000,
  guests: 8,
  bedrooms: 4,
  bathrooms: 3,
  description:
    "Experience the ultimate luxury getaway at this stunning beachfront villa in Diani. With panoramic ocean views, private beach access, and world-class amenities, this property offers an unforgettable escape on Kenya's beautiful coast.",
  amenities: [
    { icon: Wifi, name: "High-Speed WiFi", category: "Internet" },
    { icon: Car, name: "Free Parking", category: "Parking" },
    { icon: Coffee, name: "Full Kitchen", category: "Kitchen" },
    { icon: Tv, name: "Smart TV", category: "Entertainment" },
    { icon: Wind, name: "Air Conditioning", category: "Climate" },
    { icon: Waves, name: "Private Beach", category: "Outdoor" },
    { icon: Shield, name: "Security System", category: "Safety" },
    { icon: Users, name: "Concierge Service", category: "Service" },
  ],
  highlights: [
    "Beachfront location with private access",
    "Infinity pool overlooking the ocean",
    "Fully equipped modern kitchen",
    "24/7 security and housekeeping",
  ],
  reviews: [
    {
      id: 1,
      name: "John Kamau",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      date: "November 2023",
      comment:
        "Absolutely stunning property! The ocean views are breathtaking and Sarah was an incredible host. The villa exceeded all our expectations.",
    },
    {
      id: 2,
      name: "Emma Thompson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      date: "October 2023",
      comment:
        "Perfect for our family vacation. The kids loved the pool and beach access. Everything was clean and well-maintained.",
    },
    {
      id: 3,
      name: "David Ochieng",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      date: "September 2023",
      comment:
        "Great location and beautiful property. The sunset views from the terrace are unforgettable. Highly recommend!",
    },
  ],
};

export default function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // TODO: Use params.id to fetch actual property data
  const propertyId = params.id;
  console.log("Property ID:", propertyId); // For debugging
  // const propertyData = await getPropertyById(params.id)

  // Mock data - replace with actual data fetching
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + propertyData.images.length) % propertyData.images.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section with Image */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src={propertyData.images[currentImageIndex] || "/placeholder.svg"}
          alt="Property hero image"
          fill
          className="object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link
                href="/"
                className="flex items-center text-white hover:text-blue-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="font-medium">Back to search</span>
              </Link>

              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`backdrop-blur-sm ${
                    isLiked
                      ? "text-red-400 hover:bg-red-500/20"
                      : "text-white hover:bg-white/20"
                  }`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart
                    className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`}
                  />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Image Navigation */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {propertyData.images.length}
        </div>

        {/* Property Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {propertyData.title}
                </h1>
                <div className="flex items-center space-x-4 text-lg">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{propertyData.location}</span>
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-current text-yellow-400 mr-1" />
                    <span className="font-semibold">{propertyData.rating}</span>
                    <span className="ml-1">({propertyData.reviewCount})</span>
                  </div>
                </div>
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
                <Camera className="w-4 h-4 mr-2" />
                View Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 -mt-16 relative z-10">
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {propertyData.guests}
                </div>
                <div className="text-sm text-gray-600">Guests</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Bed className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {propertyData.bedrooms}
                </div>
                <div className="text-sm text-gray-600">Bedrooms</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Bath className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {propertyData.bathrooms}
                </div>
                <div className="text-sm text-gray-600">Bathrooms</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">Verified</div>
                <div className="text-sm text-gray-600">Property</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 mb-8">
          <div className="flex overflow-x-auto">
            {[
              { id: "overview", label: "Overview" },
              { id: "amenities", label: "Amenities" },
              { id: "reviews", label: "Reviews" },
              { id: "host", label: "Host" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Description Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    About This Place
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {propertyData.description}
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {propertyData.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl"
                      >
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Location
                  </h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">
                      {propertyData.location}
                    </span>
                  </div>
                  <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center">
                    <span className="text-gray-500">
                      Interactive Map Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Amenities Tab */}
            {activeTab === "amenities" && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  What This Place Offers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {propertyData.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <amenity.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {amenity.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {amenity.category}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Guest Reviews
                  </h3>
                  <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-xl">
                    <Star className="w-5 h-5 fill-current text-yellow-500" />
                    <span className="font-bold text-gray-900">
                      {propertyData.rating}
                    </span>
                    <span className="text-gray-600">
                      ({propertyData.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {propertyData.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 pb-6 last:border-b-0"
                    >
                      <div className="flex items-start space-x-4">
                        <Image
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-semibold text-gray-900">
                                {review.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {review.date}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "fill-current text-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Host Tab */}
            {activeTab === "host" && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                <div className="flex items-center space-x-6 mb-6">
                  <Image
                    src={propertyData.hostImage || "/placeholder.svg"}
                    alt={propertyData.hostName}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {propertyData.hostName}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Host since {propertyData.hostJoinDate}
                    </p>
                    {propertyData.superhost && (
                      <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">
                        <Award className="w-3 h-3 mr-1" />
                        Superhost
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">100%</div>
                    <div className="text-sm text-gray-600">Response Rate</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">1hr</div>
                    <div className="text-sm text-gray-600">Response Time</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Host
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl py-3"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Host
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
                {/* Price Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">
                      KSh {propertyData.price.toLocaleString()}
                    </div>
                    <div className="text-blue-100">per night</div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Date Selection */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="border-2 border-blue-200 rounded-xl p-3 hover:border-blue-400 transition-colors cursor-pointer">
                        <div className="text-xs font-semibold text-blue-600 uppercase mb-1">
                          Check-in
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Add date
                        </div>
                      </div>
                      <div className="border-2 border-blue-200 rounded-xl p-3 hover:border-blue-400 transition-colors cursor-pointer">
                        <div className="text-xs font-semibold text-blue-600 uppercase mb-1">
                          Check-out
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Add date
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-blue-200 rounded-xl p-3 hover:border-blue-400 transition-colors cursor-pointer">
                      <div className="text-xs font-semibold text-blue-600 uppercase mb-1">
                        Guests
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Users className="w-4 h-4 mr-2" />1 guest
                      </div>
                    </div>
                  </div>

                  {/* Reserve Button */}
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg">
                    Reserve Now
                  </Button>

                  <p className="text-center text-sm text-gray-500">
                    You won&apos;t be charged yet
                  </p>

                  {/* Price Breakdown */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        KSh {propertyData.price.toLocaleString()} × 5 nights
                      </span>
                      <span className="text-gray-900 font-medium">
                        KSh {(propertyData.price * 5).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cleaning fee</span>
                      <span className="text-gray-900 font-medium">
                        KSh 2,500
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service fee</span>
                      <span className="text-gray-900 font-medium">
                        KSh 5,000
                      </span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-blue-600">
                        KSh{" "}
                        {(
                          propertyData.price * 5 +
                          2500 +
                          5000
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust & Safety */}
              <div className="mt-6 bg-white rounded-2xl p-4 shadow-lg border border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Verified & Secure
                    </div>
                    <div className="text-sm text-gray-600">
                      Protected by KenyaBnB
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Book Now Button (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-100 p-4 lg:hidden z-50 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-gray-900">
              KSh {propertyData.price.toLocaleString()}
              <span className="text-sm font-normal text-gray-600 ml-1">
                / night
              </span>
            </div>
            <div className="flex items-center text-sm">
              <Star className="w-4 h-4 fill-current text-yellow-500 mr-1" />
              <span className="font-semibold">{propertyData.rating}</span>
              <span className="text-gray-500 ml-1">
                ({propertyData.reviewCount})
              </span>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg">
            Book Now
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
