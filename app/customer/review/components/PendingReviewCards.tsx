"use client";

import { useState } from "react";
import { ReviewCard } from "./ReviewCard";
import { ReviewModal } from "./ReviewModal";

interface Booking {
  bookingId: number;
  propertyId: number;
  propertyName: string;
  propertyImage: string;
  location?: string;
  checkInDate: string;
  checkOutDate: string;
  status: "confirmed" | "pending";
}

export default function PendingReviewCards() {
const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmitReview = async (data: {
  rating: number;
  text: string;
}) => {
  if (!activeBooking) return;

  setIsSubmitting(true);

  // 🔴 TODO: Backend API call
  // POST /api/reviews
  // payload:
  // {
  //   bookingId: activeBooking.bookingId,
  //   propertyId: activeBooking.propertyId,
  //   rating: data.rating,
  //   reviewText: data.text
  // }

  console.log("Submitting review:", {
    bookingId: activeBooking.bookingId,
    propertyId: activeBooking.propertyId,
    ...data,
  });

  // Simulate success
  setTimeout(() => {
    setIsSubmitting(false);
    setActiveBooking(null); // close modal
  }, 800);
};


  // 🔴 TEMP — backend se aayega
  // TODO: GET /api/bookings/my
  const bookings: Booking[] = [
    {
      bookingId: 11,
      propertyId: 7,
      propertyName: "Skyline Hotel & Waterpark",
      location: "Niagara Falls, ON",
      propertyImage: "/placeholder.svg",
      checkInDate: "2025-09-12",
      checkOutDate: "2025-09-15",
      status: "confirmed",
    },
  ];

  const today = new Date();

  const eligibleBookings = bookings.filter((b) => {
    const checkout = new Date(b.checkOutDate);
    return checkout < today;
  });

  if (eligibleBookings.length === 0) return null;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 mt-10 space-y-4">
        <h2 className="text-lg font-semibold">
          Share your experience
        </h2>

        {eligibleBookings.map((booking) => (
          <ReviewCard
            key={booking.bookingId}
            propertyName={booking.propertyName}
            propertyImage={booking.propertyImage}
            location={booking.location}
            checkInDate={booking.checkInDate}
            checkOutDate={booking.checkOutDate}
            status={booking.status}
            onLeaveReview={() => setActiveBooking(booking)}
          />
        ))}
      </div>

  {activeBooking && (
  <ReviewModal
    isOpen={true}
    propertyName={activeBooking.propertyName}
    isSubmitting={isSubmitting}
    onClose={() => setActiveBooking(null)}
    onSubmit={handleSubmitReview}
  />
)}

    
    </>
  );
}
