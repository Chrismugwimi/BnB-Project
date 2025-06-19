"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Home,
  LogOut,
  Plus,
  Settings,
  Star,
  MessageSquare,
  Bell,
  //MapPin,  User, Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function HostDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/Login");
    } else if (session?.user?.role !== "HOST") {
      router.push("/dashboard/guest"); // Redirect if not a host
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full" />
      </div>
    );
  }

  if (!session) return null;

  const userInitials =
    session.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "H";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">KenyaBnB</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={session.user?.image || ""} />
                  <AvatarFallback className="bg-blue-600 text-white text-sm">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {session.user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{session.user?.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/Login" })}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome, {session.user.name?.split(" ")[0]} (Host)
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Properties */}
          <Card>
            <CardHeader>
              <CardTitle>Your Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You have 5 active properties listed.</p>
              <Button className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add New Property
              </Button>
            </CardContent>
          </Card>

          {/* Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You have 8 upcoming guest stays.</p>
              <Button className="mt-4" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Manage Bookings
              </Button>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Average Rating: 4.7</p>
              <Button className="mt-4" variant="outline">
                <Star className="w-4 h-4 mr-2" />
                View Reviews
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Messages */}
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p>2 unread messages from guests.</p>
              <Button className="mt-4" variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                View Messages
              </Button>
            </CardContent>
          </Card>

          {/* Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Account Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Member since</span>
                <span>Dec 2024</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Verification</span>
                <Badge className="bg-green-100 text-green-800">Verified</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Role</span>
                <Badge variant="secondary">HOST</Badge>
              </div>
              <Button className="mt-4" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
