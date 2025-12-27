"use client";
import React from "react";
import { Calendar, MapPin, SignalZero } from "lucide-react";

interface ReviewCardProps {
  propertyName: string;
  propertyImage: string;
  checkInDate: string;
  checkOutDate: string;
  status: "confirmed" | "pending";
  onLeaveReview: () => void;
  location?: string;
}

export function ReviewCard({
  propertyName,
  propertyImage,
  checkInDate,
  checkOutDate,
  status,
  onLeaveReview,
  location,
}: ReviewCardProps) {
  const isPastCheckout = new Date(checkOutDate) < new Date();

  return (
          <div className="max-w-2xl mx-auto">

    <div
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      data-testid="card-review"
    >

      <div className="flex flex-col sm:flex-row items-stretch">
        {/* Left Content */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-center">
          <h3
            className="text-base sm:text-lg font-semibold text-gray-900 mb-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
            data-testid="text-property-name"
          >
            {propertyName}
          </h3>

          {location && (
            <p
              className="text-sm text-gray-600 flex items-center gap-1 mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
              data-testid="text-property-location"
            >
              <MapPin className="w-4 h-4 text-[#59A5B2] flex-shrink-0" />
              {location}
            </p>
          )}

          <div className="flex items-center gap-4 mb-3">
            <span
              className="text-sm text-gray-700 flex items-center gap-1"
              style={{ fontFamily: "Inter, sans-serif" }}
              data-testid="text-dates"
            >
              <Calendar className="w-4 h-4 text-[#59A5B2] flex-shrink-0" />
              {checkInDate} - {checkOutDate}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
              style={{ fontFamily: "Poppins, sans-serif" }}
              data-testid={`status-${status}`}
            >
              {status === "confirmed" ? "Confirmed" : "Pending"}
            </span>
          </div>
        </div>

        {/* Right Image & CTA */}
        <div className="flex sm:flex-col items-stretch sm:w-40 gap-3 p-4 sm:p-5 border-t sm:border-t-0 sm:border-l border-gray-200">
          {/* Image */}
          <div className="w-24 sm:w-full h-20 sm:h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={propertyImage}
              alt={propertyName}
              className="w-full h-full object-cover"
              data-testid="img-property"
            />
          </div>

          {/* CTA Button */}
          {isPastCheckout && (
            <button
              onClick={onLeaveReview}
              className="px-4 py-2 bg-[#FEC328] hover:bg-[#f0b700] text-gray-900 font-semibold rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: '12px' }}
              data-testid="button-leave-review"
            >
              Leave a review
            </button>
          )}
          {!isPastCheckout && (
            <div className="flex items-center justify-center">
              <p
                className="text-xs sm:text-sm text-gray-500 text-center"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Review available after checkout
              </p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
