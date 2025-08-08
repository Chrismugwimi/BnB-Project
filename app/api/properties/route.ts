// app/api/properties/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract text fields to match your schema
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const county = (formData.get("county") as string) || "Unknown"; // Add county field if needed
    const city = (formData.get("city") as string) || "Unknown"; // Add city field if needed
    const bedrooms = parseInt(formData.get("bedrooms") as string);
    const bathrooms = parseInt(formData.get("bathrooms") as string);
    const maxGuests = parseInt(formData.get("maxGuests") as string);
    const price = parseFloat(formData.get("pricePerNight") as string); // Using 'price' to match schema
    const amenities = JSON.parse((formData.get("amenities") as string) || "[]");
    const hostId = formData.get("hostId") as string; // You'll need to get this from session/auth

    // Handle image files
    const imageFiles = formData.getAll("images") as File[];

    // For demo purposes, we'll store image names
    // In production, you'd upload to cloud storage (AWS S3, Cloudinary, etc.)
    const imageData = imageFiles.map((file, index) => ({
      filename: file.name,
      url: `/uploads/${file.name}`, // This would be your actual image URL
      isCover: index === 0, // First image is cover
      order: index,
    }));

    // Create property with images in database
    const property = await prisma.property.create({
      data: {
        title,
        description,
        price, // Matches your schema field name
        location,
        county,
        city,
        bedrooms,
        bathrooms,
        maxGuests,
        amenities,
        hostId, // Required field in your schema
        images: {
          create: imageData,
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json({
      success: true,
      property,
      message: "Property created successfully!",
    });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create property",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
