"use client";
import React, { useState, useRef } from "react";
import { LucideProps } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header/page";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Home,
  Star,
  Camera,
  DollarSign,
  Shield,
  Users,
  Bed,
  Bath,
  Wifi,
  Car,
  Coffee,
  Tv,
  Wind,
  Utensils,
  Waves,
  TreePine,
  Upload,
  Plus,
  Minus,
  Check,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { Footer } from "@/components/footer";

interface PropertyType {
  value: string;
  label: string;
  icon: React.ComponentType<LucideProps>;
}

interface Amenity {
  id: string;
  label: string;
  icon: React.ComponentType<LucideProps>;
}

interface FormData {
  title: string;
  description: string;
  propertyType: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  pricePerNight: string;
  weeklyDiscount: number;
  monthlyDiscount: number;
  cleaningFee: string;
  amenities: string[];
  houseRules: string;
  checkInTime: string;
  checkOutTime: string;
  images: File[];
}

interface PropertyTypeCardProps {
  type: PropertyType;
  isSelected: boolean;
  onClick: () => void;
}

interface AmenityCardProps {
  amenity: Amenity;
  isSelected: boolean;
  onClick: () => void;
}

const HostListingPage = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    propertyType: "",
    location: "",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    pricePerNight: "",
    weeklyDiscount: 0,
    monthlyDiscount: 0,
    cleaningFee: "",
    amenities: [],
    houseRules: "",
    checkInTime: "",
    checkOutTime: "",
    images: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalSteps = 4;

  const propertyTypes: PropertyType[] = [
    { value: "apartment", label: "Apartment", icon: Home },
    { value: "house", label: "House", icon: Home },
    { value: "villa", label: "Villa", icon: Home },
    { value: "cottage", label: "Cottage", icon: TreePine },
  ];

  const amenitiesList: Amenity[] = [
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "parking", label: "Free Parking", icon: Car },
    { id: "kitchen", label: "Kitchen", icon: Utensils },
    { id: "tv", label: "TV", icon: Tv },
    { id: "ac", label: "Air Conditioning", icon: Wind },
    { id: "pool", label: "Swimming Pool", icon: Waves },
    { id: "breakfast", label: "Breakfast", icon: Coffee },
    { id: "workspace", label: "Dedicated Workspace", icon: Users },
  ];

  const handleInputChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const validFiles = newFiles.filter((file) => {
      // Check file type
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} is not an image file`);
        return false;
      }
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Please choose files under 5MB.`);
        return false;
      }
      return true;
    });

    // Limit total images to 10
    const currentImageCount = formData.images.length;
    const maxNewFiles = Math.max(0, 10 - currentImageCount);
    const filesToAdd = validFiles.slice(0, maxNewFiles);

    if (validFiles.length > maxNewFiles) {
      alert(
        `You can only upload up to 10 images. ${
          validFiles.length - maxNewFiles
        } files were not added.`
      );
    }

    // Update form data
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...filesToAdd],
    }));

    // Create previews for new files
    filesToAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreviews((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    // Create a synthetic event to reuse the existing handleFileChange logic
    const syntheticEvent = {
      target: { files: files },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleFileChange(syntheticEvent);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const adjustGuestCount = (
    field: "bedrooms" | "bathrooms" | "maxGuests",
    delta: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Math.max(1, prev[field] + delta),
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Add this state to your component
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Replace your existing handleSubmit function with this:
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Create FormData object
      const submitFormData = new FormData();

      // Append text fields
      submitFormData.append("title", formData.title);
      submitFormData.append("description", formData.description);
      submitFormData.append("propertyType", formData.propertyType);
      submitFormData.append("location", formData.location);
      submitFormData.append("bedrooms", formData.bedrooms.toString());
      submitFormData.append("bathrooms", formData.bathrooms.toString());
      submitFormData.append("maxGuests", formData.maxGuests.toString());
      submitFormData.append("pricePerNight", formData.pricePerNight);
      submitFormData.append(
        "weeklyDiscount",
        formData.weeklyDiscount.toString()
      );
      submitFormData.append(
        "monthlyDiscount",
        formData.monthlyDiscount.toString()
      );

      if (formData.cleaningFee) {
        submitFormData.append("cleaningFee", formData.cleaningFee);
      }
      if (formData.houseRules) {
        submitFormData.append("houseRules", formData.houseRules);
      }
      if (formData.checkInTime) {
        submitFormData.append("checkInTime", formData.checkInTime);
      }
      if (formData.checkOutTime) {
        submitFormData.append("checkOutTime", formData.checkOutTime);
      }

      // Append amenities as JSON string
      submitFormData.append("amenities", JSON.stringify(formData.amenities));

      // Append image files
      formData.images.forEach((image) => {
        submitFormData.append("images", image);
      });

      // Submit to API
      const response = await fetch("/api/properties", {
        method: "POST",
        body: submitFormData,
      });

      const result = await response.json();

      if (result.success) {
        alert("Listing submitted successfully!");
        console.log("Created property:", result.property);

        // Reset form or redirect to success page
        // router.push('/host/success');
      } else {
        alert(`Error: ${result.message}`);
        console.error("Submission error:", result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Also update your submit button to show loading state:
  <Button
    onClick={handleSubmit}
    disabled={isSubmitting}
    className="bg-orange-500 hover:bg-orange-600 px-8 disabled:bg-gray-300 disabled:cursor-not-allowed"
  >
    {isSubmitting ? "Publishing..." : "Publish Listing"}
  </Button>;

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <React.Fragment key={i}>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              i + 1 <= currentStep
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {i + 1 <= currentStep ? <Check className="w-5 h-5" /> : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div
              className={`w-16 h-1 mx-2 ${
                i + 1 < currentStep ? "bg-orange-500" : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const PropertyTypeCard: React.FC<PropertyTypeCardProps> = ({
    type,
    isSelected,
    onClick,
  }) => {
    const Icon = type.icon;
    return (
      <Card
        className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
          isSelected
            ? "border-orange-500 bg-orange-50 shadow-lg"
            : "border-gray-200 hover:border-orange-300"
        }`}
        onClick={onClick}
      >
        <CardContent className="p-6 text-center">
          <div
            className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
              isSelected
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <Icon className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-gray-900">{type.label}</h3>
        </CardContent>
      </Card>
    );
  };

  const AmenityCard: React.FC<AmenityCardProps> = ({
    amenity,
    isSelected,
    onClick,
  }) => {
    const Icon = amenity.icon;
    return (
      <Card
        className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
          isSelected
            ? "border-orange-500 bg-orange-50"
            : "border-gray-200 hover:border-orange-300"
        }`}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isSelected
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className="font-medium text-gray-900">{amenity.label}</span>
            {isSelected && (
              <Check className="w-5 h-5 text-orange-500 ml-auto" />
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
                <Home className="w-10 h-10 text-orange-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Tell us about your BnB
              </h2>
              <p className="text-gray-600 text-lg">
                Let&apos;s start with the basics
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  What type of property is this?
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {propertyTypes.map((type) => (
                    <PropertyTypeCard
                      key={type.value}
                      type={type}
                      isSelected={formData.propertyType === type.value}
                      onClick={() =>
                        handleInputChange("propertyType", type.value)
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Property Title
                  </label>
                  <Input
                    placeholder="Beautiful apartment in city center"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Nairobi, Kenya"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="h-12 pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all resize-none"
                  rows={4}
                  placeholder="Describe your property and what makes it special..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="w-10 h-10 text-orange-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Property details
              </h2>
              <p className="text-gray-600 text-lg">
                Help guests know what to expect
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border border-gray-200">
                <CardContent className="p-6 text-center">
                  <Bed className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-4">Bedrooms</h3>
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustGuestCount("bedrooms", -1)}
                      className="w-10 h-10 p-0 rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-2xl font-bold text-gray-900 w-8 text-center">
                      {formData.bedrooms}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustGuestCount("bedrooms", 1)}
                      className="w-10 h-10 p-0 rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardContent className="p-6 text-center">
                  <Bath className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Bathrooms
                  </h3>
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustGuestCount("bathrooms", -1)}
                      className="w-10 h-10 p-0 rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-2xl font-bold text-gray-900 w-8 text-center">
                      {formData.bathrooms}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustGuestCount("bathrooms", 1)}
                      className="w-10 h-10 p-0 rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Max Guests
                  </h3>
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustGuestCount("maxGuests", -1)}
                      className="w-10 h-10 p-0 rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-2xl font-bold text-gray-900 w-8 text-center">
                      {formData.maxGuests}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => adjustGuestCount("maxGuests", 1)}
                      className="w-10 h-10 p-0 rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What amenities do you offer?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenitiesList.map((amenity) => (
                  <AmenityCard
                    key={amenity.id}
                    amenity={amenity}
                    isSelected={formData.amenities.includes(amenity.id)}
                    onClick={() => handleAmenityToggle(amenity.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
                <Camera className="w-10 h-10 text-orange-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Add photos of your place
              </h2>
              <p className="text-gray-600 text-lg">
                Great photos help your listing stand out
              </p>
            </div>

            {/* File Input (Hidden) */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Upload Area */}
            <Card
              className={`border-2 border-dashed transition-colors cursor-pointer ${
                formData.images.length === 0
                  ? "border-gray-300 hover:border-orange-500"
                  : "border-orange-200"
              }`}
              onClick={handleFileSelect}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <CardContent className="p-12 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Upload your photos
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Drag and drop your images here, or click to browse
                    </p>
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileSelect();
                      }}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      Choose Photos
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Upload at least 5 high-quality photos (max 10). First photo
                    will be your cover image.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Image Preview Grid */}
            {formData.images.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Photos ({formData.images.length}/10)
                  </h3>
                  <Button
                    variant="outline"
                    onClick={handleFileSelect}
                    disabled={formData.images.length >= 10}
                    className="text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add More
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Cover Image Badge */}
                      {index === 0 && (
                        <Badge className="absolute top-2 left-2 bg-orange-500 text-white text-xs">
                          Cover
                        </Badge>
                      )}

                      {/* Remove Button */}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-8 h-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </Button>

                      {/* Image Info */}
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                          {formData.images[index].name.length > 20
                            ? formData.images[index].name.substring(0, 20) +
                              "..."
                            : formData.images[index].name}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add More Button (when less than 10 images) */}
                  {formData.images.length < 10 && (
                    <div
                      onClick={handleFileSelect}
                      className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-500 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50 hover:bg-orange-50"
                    >
                      <Plus className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Add Photo</span>
                    </div>
                  )}
                </div>

                {formData.images.length < 5 && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center text-amber-800">
                      <ImageIcon className="w-5 h-5 mr-2" />
                      <span className="text-sm">
                        Add at least {5 - formData.images.length} more photo
                        {5 - formData.images.length !== 1 ? "s" : ""} to
                        continue
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                House Rules & Check-in Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Check-in Time
                  </label>
                  <Input
                    type="time"
                    value={formData.checkInTime}
                    onChange={(e) =>
                      handleInputChange("checkInTime", e.target.value)
                    }
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Check-out Time
                  </label>
                  <Input
                    type="time"
                    value={formData.checkOutTime}
                    onChange={(e) =>
                      handleInputChange("checkOutTime", e.target.value)
                    }
                    className="h-12"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  House Rules
                </label>
                <textarea
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all resize-none"
                  rows={4}
                  placeholder="No smoking, No pets, Quiet hours after 10 PM..."
                  value={formData.houseRules}
                  onChange={(e) =>
                    handleInputChange("houseRules", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
                <DollarSign className="w-10 h-10 text-orange-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Set your price
              </h2>
              <p className="text-gray-600 text-lg">
                You can always change it later
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Nightly Rate
                  </h3>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                      KSh
                    </span>
                    <Input
                      type="number"
                      placeholder="5000"
                      value={formData.pricePerNight}
                      onChange={(e) =>
                        handleInputChange("pricePerNight", e.target.value)
                      }
                      className="h-16 text-2xl font-bold pl-16"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Base price per night
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Cleaning Fee
                  </h3>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                      KSh
                    </span>
                    <Input
                      type="number"
                      placeholder="1000"
                      value={formData.cleaningFee}
                      onChange={(e) =>
                        handleInputChange("cleaningFee", e.target.value)
                      }
                      className="h-16 text-2xl font-bold pl-16"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    One-time cleaning fee
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Discounts (Optional)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Weekly Discount (%)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="50"
                    placeholder="10"
                    value={formData.weeklyDiscount}
                    onChange={(e) =>
                      handleInputChange(
                        "weeklyDiscount",
                        Number(e.target.value)
                      )
                    }
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Monthly Discount (%)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="50"
                    placeholder="20"
                    value={formData.monthlyDiscount}
                    onChange={(e) =>
                      handleInputChange(
                        "monthlyDiscount",
                        Number(e.target.value)
                      )
                    }
                    className="h-12"
                  />
                </div>
              </div>
            </div>

            <Card className="bg-orange-50 border border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Host Protection
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Your property is protected with our comprehensive host
                      guarantee program. We verify all guests and provide 24/7
                      support.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-orange-100 text-orange-700 border border-orange-200 px-4 py-2 text-sm font-medium mb-4">
            Become a Host
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            List your space on My <span className="text-orange-400">BnB</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of hosts earning extra income by sharing their space
            with travelers
          </p>
        </div>

        <Card className="border-0 shadow-xl bg-white">
          <CardContent className="p-8 md:p-12">
            <StepIndicator />

            <div>
              {renderStep()}

              <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-8"
                >
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={nextStep}
                    disabled={currentStep === 3 && formData.images.length < 5}
                    className="bg-orange-500 hover:bg-orange-600 px-8 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-orange-500 hover:bg-orange-600 px-8"
                  >
                    Publish Listing
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer CTA */}
        <div className="text-center mt-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900">Get Featured</h3>
              <p className="text-sm text-gray-600">
                Quality listings get promoted
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900">Host Protection</h3>
              <p className="text-sm text-gray-600">
                Comprehensive coverage included
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-semibold text-gray-900">24/7 Support</h3>
              <p className="text-sm text-gray-600">
                We&apos;re here to help anytime
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HostListingPage;
