// Updated page component with proper TypeScript types
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header/page";
import { Footer } from "@/components/footer";
import {
  Heart,
  Star,
  Search,
  MapPin,
  Calendar,
  Users,
  Shield,
  Award,
  Zap,
  ChevronRight,
  Play,
} from "lucide-react";

// Define the Property interface
interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  rating: number;
  images: string[];
  features?: string[];
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  maxGuests?: number;
}

export default async function Page() {
  // Explicitly type the arrays
  const featuredProperties: Property[] = [];
  const mombasaProperties: Property[] = [];
  const nakuruProperties: Property[] = [];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-12">
            {/* Enhanced Search Bar */}
            <div className="max-w-5xl mx-auto">
              <Card className="border border-gray-200 shadow-xl bg-gray-200">
                <CardContent className="p-3">
                  <div className="flex flex-col lg:flex-row items-center divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
                    {/* Where */}
                    <div className="flex-1 p-6 w-full">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-orange-500" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-semibold text-gray-900 mb-1">
                            Search
                          </label>
                          <Input
                            placeholder="Search Bnbs or destinations"
                            className="border-none p-0 text-base placeholder-gray-500 focus:ring-0 bg-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Check in */}
                    <div className="flex-1 p-6 w-full">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-950" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-semibold text-gray-900 mb-1">
                            Check in
                          </label>
                          <div className="text-base text-gray-500 cursor-pointer">
                            Add dates
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Check out */}
                    <div className="flex-1 p-6 w-full">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-orange-500" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-semibold text-gray-900 mb-1">
                            Check out
                          </label>
                          <div className="text-base text-gray-500 cursor-pointer">
                            Add dates
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Who */}
                    <div className="flex-1 p-6 w-full">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-950" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-semibold text-gray-900 mb-1">
                            Guests
                          </label>
                          <div className="text-base text-gray-500 cursor-pointer">
                            Add guests
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Search Button */}
                    <div className="p-4">
                      <Button className="w-16 h-16 rounded-xl bg-orange-500 hover:bg-orange-600 shadow-lg">
                        <Search className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Badge className="bg-orange-50 text-orange-700 border border-orange-200 px-4 py-2 text-sm font-medium">
                Trusted by 1000+ travelers
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto">
                Find your perfect Bnb
                <span className="text-orange-500"> anywhere, anytime.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                At My Bnb, we are focused on providing quality Bnb accomodation
                to our customers. We have Bnbs in various towns and we can make
                suggestions on the best Bnbs to book.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-12 pt-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600 font-medium">
                  Properties
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">100+</div>
                <div className="text-sm text-gray-600 font-medium">Towns</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">4.8★</div>
                <div className="text-sm text-gray-600 font-medium">
                  Guest Rating
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600 font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why travelers choose My Bnb
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We&apos;re committed to providing exceptional experiences with
              every booking.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white group hover:shadow-xl transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Shield className="w-8 h-8 text-orange-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Verified Properties
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Every property is well inspected and verified by our team to
                  ensure quality and safety standards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white group hover:shadow-xl transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Award className="w-8 h-8 text-orange-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Best Price Guarantee
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Find the same property for less elsewhere? We&apos;ll match
                  the price and give you an additional 5% off.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white group hover:shadow-xl transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Zap className="w-8 h-8 text-orange-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Instant Confirmation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Get immediate booking confirmation with our smart system. No
                  waiting, no uncertainty.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular homes in Mombasa */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Coastal escapes in Mombasa
              </h2>
              <p className="text-gray-600">
                Beachfront properties with stunning ocean views
              </p>
            </div>
            <Button
              variant="outline"
              className="group border-gray-300 hover:border-orange-500 hover:text-orange-500"
            >
              View all properties
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mombasaProperties.length > 0
              ? mombasaProperties.map((property, i) => (
                  <PropertyCard key={i} property={property} />
                ))
              : Array.from({ length: 4 }, (_, i) => (
                  <EnhancedPropertyCard key={i} location="Mombasa" />
                ))}
          </div>
        </div>
      </section>

      {/* Available in Nakuru County this weekend */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Weekend getaways in Nakuru
              </h2>
              <p className="text-gray-600">
                Perfect retreats available for this weekend
              </p>
            </div>
            <Button
              variant="outline"
              className="group border-blue-950 text-white hover:border-orange-500 hover:text-orange-500"
            >
              View all properties
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nakuruProperties.length > 0
              ? nakuruProperties.map((property, i) => (
                  <PropertyCard key={i} property={property} />
                ))
              : Array.from({ length: 4 }, (_, i) => (
                  <EnhancedPropertyCard key={i} location="Nakuru" />
                ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900">
                Start your next adventure
              </h2>
              <p className="text-xl text-black max-w-2xl mx-auto">
                Join millions of travelers who trust My Bnb for their perfect
                accommodations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white hover:bg-orange-500 hover:text-white text-orange-500 font-semibold px-8 py-4 text-lg"
              >
                Explore Properties
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-orange-500 text-white hover:bg-white hover:text-orange-500 font-semibold px-8 py-4 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                How it works
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

// Enhanced Property Card Component with proper TypeScript types
interface EnhancedPropertyCardProps {
  location: string;
}

function EnhancedPropertyCard({ location }: EnhancedPropertyCardProps) {
  const types: string[] = [
    "Modern Apartment",
    "Luxury Villa",
    "Cozy Cottage",
    "Beachfront House",
  ];
  const prices: number[] = [8500, 12000, 6500, 15000, 4500, 18000];
  const ratings: number[] = [4.9, 4.8, 4.95, 4.85, 4.92, 4.88];
  const features: string[] = [
    "Ocean View",
    "Pool",
    "WiFi",
    "Kitchen",
    "Parking",
    "Garden",
  ];

  const randomType: string = types[Math.floor(Math.random() * types.length)];
  const randomPrice: number = prices[Math.floor(Math.random() * prices.length)];
  const randomRating: number =
    ratings[Math.floor(Math.random() * ratings.length)];
  const randomFeature: string =
    features[Math.floor(Math.random() * features.length)];

  return (
    <Card className="group cursor-pointer border border-gray-200 hover:border-orange-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-white">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src="/placeholder.svg?height=240&width=320"
            alt={`${randomType} in ${location}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Superhost badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-white text-gray-700 border-0 shadow-sm font-medium">
            Superhost
          </Badge>
        </div>

        {/* Heart button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 shadow-sm transition-all"
        >
          <Heart className="w-4 h-4" />
        </Button>

        {/* Feature badge */}
        <div className="absolute bottom-4 left-4">
          <Badge
            variant="secondary"
            className="bg-orange-500 text-white border-0 font-medium"
          >
            {randomFeature}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors leading-tight">
              {randomType}
            </h3>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="w-3 h-3 mr-1 text-gray-400" />
              {location}, Kenya
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">
              {randomRating}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-lg font-bold text-gray-900">
              KSh {randomPrice.toLocaleString()}
            </span>
            <span className="text-sm text-gray-600"> / night</span>
          </div>
          <Button
            size="sm"
            className="bg-blue-900 hover:bg-blue-800 text-white"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Original Property Card Component with proper TypeScript types
interface PropertyCardProps {
  property: Property;
}

function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="group cursor-pointer border border-gray-200 hover:border-orange-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-white">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={
              property.images?.[0] || "/placeholder.svg?height=240&width=320"
            }
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="absolute top-4 left-4">
          <Badge className="bg-white text-gray-700 border-0 shadow-sm font-medium">
            Superhost
          </Badge>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 shadow-sm transition-all"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors leading-tight">
              {property.title || `${property.type} in ${property.location}`}
            </h3>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="w-3 h-3 mr-1 text-gray-400" />
              {property.location}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-current text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">
              {property.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-lg font-bold text-gray-900">
              KSh {property.price?.toLocaleString()}
            </span>
            <span className="text-sm text-gray-600"> / night</span>
          </div>
          <Button
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
