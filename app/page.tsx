// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold text-2xl">KenyaBnB</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/properties"
          >
            Explore
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/login"
          >
            Sign In
          </Link>
        </nav>
      </header>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover Amazing Places to Stay in Kenya
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Book unique homes, experiences, and places around Kenya. Find
                  adventures nearby or in faraway places.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/properties">Find a Place</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/host">Become a Host</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
              <img
                alt="Kenya Landscape"
                className="aspect-video object-cover w-full"
                src="/images/hero.jpg"
                width={550}
                height={310}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
