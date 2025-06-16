import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Globe,
  Heart,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-2xl font-bold text-white">KenyaBnB</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover and book unique accommodations across Kenya. From the
              bustling streets of Nairobi to the pristine beaches of the coast,
              find your perfect stay.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/destinations/nairobi"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Nairobi Stays
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/mombasa"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Mombasa Beach Houses
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/nakuru"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Nakuru Getaways
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations/kisumu"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Kisumu Lakefront
                </Link>
              </li>
              <li>
                <Link
                  href="/experiences"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Safari Experiences
                </Link>
              </li>
              <li>
                <Link
                  href="/gift-cards"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/host"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Become a Host
                </Link>
              </li>
              <li>
                <Link
                  href="/safety"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Safety Information
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Cancellation Options
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Community Forum
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-4">
              Get the latest deals and travel inspiration delivered to your
              inbox.
            </p>
            <div className="space-y-3">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-r-none focus:border-blue-500"
                />
                <Button className="bg-blue-500 hover:bg-blue-600 rounded-l-none px-4">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-400">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates from our company.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-medium">24/7 Support</div>
                <div className="text-sm text-gray-400">+254 700 123 456</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-medium">Email Us</div>
                <div className="text-sm text-gray-400">hello@kenyabnb.com</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-medium">Headquarters</div>
                <div className="text-sm text-gray-400">Nairobi, Kenya</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© 2024 KenyaBnB. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-blue-500 fill-current" />
                <span>in Kenya</span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
              <div className="flex items-center space-x-2 text-gray-400">
                <Globe className="w-4 h-4" />
                <span>English (KE)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
