// app/page.tsx
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Heart,
  Star,
  MapPin,
  Search,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  Globe,
  Menu,
} from "lucide-react";

// You'll replace this with your actual data fetching
async function getFeaturedProperties() {
  // This is where you'll call your API or database
  // Example: const properties = await prisma.property.findMany({ take: 12, orderBy: { rating: 'desc' } });
  return []; // Remove this when you add real data
}

async function getPopularInMombasa() {
  // Fetch properties in Mombasa
  return []; // Remove this when you add real data
}

async function getAvailableInNakuru() {
  // Fetch properties available in Nakuru this weekend
  return []; // Remove this when you add real data
}

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();
  const mombasaProperties = await getPopularInMombasa();
  const nakuruProperties = await getAvailableInNakuru();

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-2xl font-bold text-red-500">anybnb</span>
            </Link>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-2 text-gray-900 border-b-2 border-gray-900 pb-4">
                <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-xs">🏠</span>
                </div>
                <span className="font-medium">Homes</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 cursor-pointer pb-4">
                <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-xs">🎯</span>
                </div>
                <span className="font-medium">Experiences</span>
                <Badge
                  variant="secondary"
                  className="bg-red-100 text-red-800 text-xs"
                >
                  NEW
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 cursor-pointer pb-4">
                <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-xs">🍽️</span>
                </div>
                <span className="font-medium">Services</span>
                <Badge
                  variant="secondary"
                  className="bg-red-100 text-red-800 text-xs"
                >
                  NEW
                </Badge>
              </div>
            </nav>

            {/* Right Menu */}
            <div className="flex items-center space-x-4">
              <Link
                href="/host"
                className="text-sm font-medium text-gray-900 hover:text-gray-600 hidden sm:block"
              >
                Become a host
              </Link>
              <Button variant="ghost" size="sm" className="p-2">
                <Globe className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-0 border border-gray-300 rounded-full p-1 hover:shadow-md transition-shadow">
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="w-4 h-4" />
                </Button>
                <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-gray-300 rounded-full shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center divide-x divide-gray-300">
            {/* Where */}
            <div className="flex-1 px-6 py-4">
              <label className="block text-xs font-semibold text-gray-900 mb-1">
                Where
              </label>
              <Input
                placeholder="Search destinations"
                className="border-none p-0 text-sm placeholder-gray-500 focus:ring-0"
              />
            </div>

            {/* Check in */}
            <div className="flex-1 px-6 py-4">
              <label className="block text-xs font-semibold text-gray-900 mb-1">
                Check in
              </label>
              <div className="text-sm text-gray-500 cursor-pointer">
                Add dates
              </div>
            </div>

            {/* Check out */}
            <div className="flex-1 px-6 py-4">
              <label className="block text-xs font-semibold text-gray-900 mb-1">
                Check out
              </label>
              <div className="text-sm text-gray-500 cursor-pointer">
                Add dates
              </div>
            </div>

            {/* Who */}
            <div className="flex-1 px-6 py-4">
              <label className="block text-xs font-semibold text-gray-900 mb-1">
                Who
              </label>
              <div className="text-sm text-gray-500 cursor-pointer">
                Add guests
              </div>
            </div>

            {/* Search Button */}
            <div className="px-2">
              <Button className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular homes in Mombasa */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Popular homes in Mombasa
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 rounded-full border border-gray-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 rounded-full border border-gray-300"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {mombasaProperties.length > 0
            ? mombasaProperties.map((property: any) => (
                <PropertyCard key={property.id} property={property} />
              ))
            : // Placeholder cards
              Array.from({ length: 7 }, (_, i) => (
                <PlaceholderPropertyCard key={i} location="Mombasa" />
              ))}
        </div>
      </section>

      {/* Available in Nakuru County this weekend */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Available in Nakuru County this weekend
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 rounded-full border border-gray-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 rounded-full border border-gray-300"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {nakuruProperties.length > 0
            ? nakuruProperties.map((property: any) => (
                <PropertyCard key={property.id} property={property} />
              ))
            : // Placeholder cards
              Array.from({ length: 7 }, (_, i) => (
                <PlaceholderPropertyCard key={i} location="Nakuru" />
              ))}
        </div>
      </section>
    </main>
  );
}

// Property Card Component
function PropertyCard({ property }: { property: any }) {
  return (
    <div className="flex-none w-80 group cursor-pointer">
      <div className="relative">
        <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3">
          <img
            src={property.images?.[0] || "/images/placeholder.jpg"}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Guest favorite badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white text-gray-900 shadow-sm border-0">
            Guest favorite
          </Badge>
        </div>

        {/* Heart button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 line-clamp-1">
            {property.title || `${property.type} in ${property.location}`}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-current text-gray-900" />
            <span className="text-sm text-gray-900">{property.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          KSh {property.price?.toLocaleString()} for 2 nights
        </p>
      </div>
    </div>
  );
}

// Placeholder Property Card
function PlaceholderPropertyCard({ location }: { location: string }) {
  const types = ["Apartment", "Home", "Condo", "Villa"];
  const prices = [5905, 10334, 3543, 17569, 3248, 20080];
  const ratings = [4.83, 4.86, 4.81, 4.92, 4.97, 4.8, 5.0];

  const randomType = types[Math.floor(Math.random() * types.length)];
  const randomPrice = prices[Math.floor(Math.random() * prices.length)];
  const randomRating = ratings[Math.floor(Math.random() * ratings.length)];

  return (
    <div className="flex-none w-80 group cursor-pointer">
      <div className="relative">
        <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Property Image
          </div>
        </div>

        {/* Guest favorite badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white text-gray-900 shadow-sm border-0">
            Guest favorite
          </Badge>
        </div>

        {/* Heart button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">
            {randomType} in {location}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-current text-gray-900" />
            <span className="text-sm text-gray-900">{randomRating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          KSh {randomPrice.toLocaleString()} for 2 nights
        </p>
      </div>
    </div>
  );
}
