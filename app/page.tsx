// app/page.tsx
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "lucide-react";
import { Heart, Star, MapPin, Wifi, Car, Coffee } from "lucide-react";

// You'll replace this with your actual data fetching
async function getFeaturedProperties() {
  // This is where you'll call your API or database
  // Example: const properties = await prisma.property.findMany({ take: 9, orderBy: { rating: 'desc' } });
  return []; // Remove this when you add real data
}

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <main className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AnyBnB
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 transition-colors hover:text-purple-600"
            href="/properties"
          >
            Explore
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 transition-colors hover:text-purple-600"
            href="/login"
          >
            Sign In
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Discover Amazing Places to Stay in Kenya
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Book unique homes, experiences, and places around Kenya. Find
                  adventures nearby or in faraway places.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Link href="/properties">Find a Place</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-purple-200 hover:bg-purple-50"
                >
                  <Link href="/host">Become a Host</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last shadow-2xl">
              <img
                alt="Kenya Landscape"
                className="aspect-video object-cover w-full hover:scale-105 transition-transform duration-300"
                src="/images/hero.jpg"
                width={550}
                height={310}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Properties
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our handpicked selection of the most amazing places to
                stay across Kenya
              </p>
            </div>
          </div>

          {/* Property Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* You'll map over your actual data here */}
            {featuredProperties.length > 0
              ? featuredProperties.map((property: any) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              : // Placeholder cards - remove when you have real data
                Array.from({ length: 9 }, (_, i) => (
                  <PlaceholderPropertyCard key={i} />
                ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Explore by Category
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Find the perfect stay for your next adventure
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {/* You'll populate these with your actual categories */}
            <CategoryCard title="Beach Houses" count="24 properties" />
            <CategoryCard title="Mountain Lodges" count="18 properties" />
            <CategoryCard title="City Apartments" count="45 properties" />
            <CategoryCard title="Safari Camps" count="12 properties" />
          </div>
        </div>
      </section>
    </main>
  );
}

// Property Card Component
function PropertyCard({ property }: { property: any }) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images?.[0] || "/images/placeholder.jpg"}
          alt={property.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
        {property.featured && (
          <Badge className="absolute top-2 left-2 bg-purple-600">
            Featured
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{property.rating}</span>
            </div>
          </div>

          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            {property.amenities?.includes("wifi") && (
              <Wifi className="h-4 w-4" />
            )}
            {property.amenities?.includes("parking") && (
              <Car className="h-4 w-4" />
            )}
            {property.amenities?.includes("breakfast") && (
              <Coffee className="h-4 w-4" />
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-lg font-bold">KSh {property.price}</span>
              <span className="text-muted-foreground text-sm"> / night</span>
            </div>
            <Button size="sm" asChild>
              <Link href={`/properties/${property.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Placeholder Card (remove when you have real data)
function PlaceholderPropertyCard() {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
          <span className="text-muted-foreground">Property Image</span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Sample Property Title</h3>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">4.8</span>
            </div>
          </div>

          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Nairobi, Kenya</span>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            <Wifi className="h-4 w-4" />
            <Car className="h-4 w-4" />
            <Coffee className="h-4 w-4" />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-lg font-bold">KSh 5,000</span>
              <span className="text-muted-foreground text-sm"> / night</span>
            </div>
            <Button size="sm">View Details</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Category Card Component
function CategoryCard({ title, count }: { title: string; count: string }) {
  return (
    <Card className="group cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6 text-center">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg group-hover:text-purple-600 transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm">{count}</p>
        </div>
      </CardContent>
    </Card>
  );
}
