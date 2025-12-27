"use client";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Star, User, ThumbsUp } from "lucide-react";

interface Review {
  id: number;
  userName: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
  verified: boolean;
}

interface PropertyReviewsData {
  propertyName: string;
  propertyLocation: string;
  propertyImage: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviews: Review[];
}

const MOCK_REVIEWS_DATA: PropertyReviewsData = {
  propertyName: "Luxury Beachfront Resort",
  propertyLocation: "Miami, Florida",
  propertyImage: "https://images.unsplash.com/photo-1571896837934-ffe2023ba5da?w=800&h=400&fit=crop",
  averageRating: 4.6,
  totalReviews: 2314,
  ratingDistribution: {
    5: 1200,
    4: 800,
    3: 250,
    2: 50,
    1: 14,
  },
  reviews: [
    {
      id: 1,
      userName: "Sarah M.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5,
      date: "Dec 15, 2024",
      text: "Absolutely wonderful stay! The ocean view from our room was breathtaking, and the staff was incredibly attentive. The breakfast buffet was outstanding with lots of options. Highly recommend for anyone looking for a perfect beach getaway.",
      helpful: 234,
      verified: true,
    },
    {
      id: 2,
      userName: "James L.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      rating: 4,
      date: "Dec 10, 2024",
      text: "Great property with excellent facilities. The room was spacious and clean. Only minor issue was the slow WiFi in the room, but overall a fantastic experience. The pool area is amazing!",
      helpful: 156,
      verified: true,
    },
    {
      id: 3,
      userName: "Maria G.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      rating: 5,
      date: "Dec 5, 2024",
      text: "This is paradise! Everything was perfect. The location is perfect for beach lovers. Staff was friendly and helpful. We'll definitely be back!",
      helpful: 189,
      verified: true,
    },
    {
      id: 4,
      userName: "Robert K.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      rating: 4,
      date: "Nov 28, 2024",
      text: "Nice resort with good value. Rooms are comfortable and the beach is beautiful. Restaurant could use some improvement in variety though.",
      helpful: 78,
      verified: true,
    },
    {
      id: 5,
      userName: "Elena P.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
      rating: 5,
      date: "Nov 20, 2024",
      text: "Perfect honeymoon destination! The romantic dinner setup on the beach was unforgettable. Every detail was thoughtfully planned. Thank you for making our special day even more memorable!",
      helpful: 312,
      verified: true,
    },
  ],
};

export default function PropertyReviewsPage() {
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">("recent");
  const data = MOCK_REVIEWS_DATA;

  const getPercentage = (count: number) => {
    return Math.round((count / data.totalReviews) * 100);
  };

  const sortedReviews = [...data.reviews].sort((a, b) => {
    if (sortBy === "helpful") return b.helpful - a.helpful;
    if (sortBy === "rating") return b.rating - a.rating;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="bg-gray-50 w-full flex flex-col min-h-screen">
      <Header />
      <Navigation />

      {/* Main Content */}
      <div className="flex-1 w-full px-4 md:px-8 lg:px-[203px] py-8 md:py-12">
        {/* Property Header */}
        <div className="mb-10">
          <h1
            className="text-[28px] md:text-[36px] font-bold text-gray-900 mb-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
            data-testid="text-property-name"
          >
            {data.propertyName}
          </h1>
          <p
            className="text-gray-600 text-base"
            style={{ fontFamily: "Inter, sans-serif" }}
            data-testid="text-property-location"
          >
            {data.propertyLocation}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Rating Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              {/* Overall Rating */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-4xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {data.averageRating}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i <= Math.round(data.averageRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {data.totalReviews.toLocaleString()} reviews
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i <= stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 transition-all"
                        style={{
                          width: `${getPercentage(data.ratingDistribution[stars as keyof typeof data.ratingDistribution])}%`,
                        }}
                      />
                    </div>
                    <span
                      className="text-sm text-gray-600 w-12 text-right"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {getPercentage(data.ratingDistribution[stars as keyof typeof data.ratingDistribution])}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Reviews List */}
          <div className="lg:col-span-2">
            {/* Sort Controls */}
            <div className="mb-6 flex items-center gap-3">
              <label
                className="text-sm font-medium text-gray-700"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent"
                data-testid="select-sort-reviews"
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {sortedReviews.map((review) => (
                <Card key={review.id} className="p-6" data-testid={`review-card-${review.id}`}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={review.avatar}
                          alt={review.userName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p
                          className="font-semibold text-gray-900"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                          data-testid="text-reviewer-name"
                        >
                          {review.userName}
                          {review.verified && (
                            <span
                              className="ml-2 inline-text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              Verified
                            </span>
                          )}
                        </p>
                        <p
                          className="text-sm text-gray-600"
                          style={{ fontFamily: "Inter, sans-serif" }}
                          data-testid="text-review-date"
                        >
                          {review.date}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                          data-testid={`star-${i}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p
                    className="text-gray-700 mb-4 leading-relaxed"
                    style={{ fontFamily: "Inter, sans-serif" }}
                    data-testid="text-review-content"
                  >
                    {review.text}
                  </p>

                  {/* Helpful Button */}
                  <button
                    className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    data-testid="button-helpful"
                  >
                    <ThumbsUp className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                      Helpful ({review.helpful})
                    </span>
                  </button>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button
                className="px-6 py-3 border border-[#59A5B2] text-[#59A5B2] rounded-lg hover:bg-blue-50 font-semibold transition-colors"
                style={{ fontFamily: "Poppins, sans-serif" }}
                data-testid="button-load-more-reviews"
              >
                Load More Reviews
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
