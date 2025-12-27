"use client";
import React, { useState } from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewModalProps {
  isOpen: boolean;
  propertyName: string;
  onClose: () => void;
  onSubmit: (data: { rating: number; text: string }) => void;
  isSubmitting?: boolean;
}

export function ReviewModal({
  isOpen,
  propertyName,
  onClose,
  onSubmit,
  isSubmitting = false,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [errors, setErrors] = useState<{ rating?: string; text?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (rating === 0) {
      newErrors.rating = "Please select a rating";
    }

    if (!reviewText.trim()) {
      newErrors.text = "Please enter your review";
    } else if (reviewText.trim().length < 10) {
      newErrors.text = "Review must be at least 10 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({ rating, text: reviewText });
      // Reset form after submission
      setRating(0);
      setReviewText("");
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
        data-testid="modal-review"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <h2
            className="text-xl font-bold text-gray-900"
            style={{ fontFamily: "Poppins, sans-serif" }}
            data-testid="text-modal-title"
          >
            Leave a review
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
            data-testid="button-close-modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Property Name */}
          <div>
            <p
              className="text-sm text-gray-600 mb-1"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Reviewing:
            </p>
            <p
              className="text-base font-semibold text-[#59A5B2]"
              style={{ fontFamily: "Poppins, sans-serif" }}
              data-testid="text-property-being-reviewed"
            >
              {propertyName}
            </p>
          </div>

          {/* Star Rating */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-900 mb-3"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              How would you rate your stay?
            </label>
            <div
              className="flex gap-3 mb-2"
              data-testid="rating-selector"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setRating(star);
                    setErrors({ ...errors, rating: undefined });
                  }}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                  data-testid={`button-star-${star}`}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
            )}
            {rating > 0 && (
              <p
                className="text-sm text-gray-600 mt-2"
                style={{ fontFamily: "Inter, sans-serif" }}
                data-testid="text-rating-display"
              >
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            )}
          </div>

          {/* Review Text */}
          <div>
            <label
              htmlFor="reviewText"
              className="block text-sm font-semibold text-gray-900 mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Tell us about your experience
            </label>
            <textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value);
                setErrors({ ...errors, text: undefined });
              }}
              placeholder="What did you love? What could be improved?"
              className={`w-full px-4 py-3 rounded-lg border text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent transition-all resize-none ${
                errors.text ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              rows={5}
              data-testid="textarea-review"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            {errors.text && (
              <p className="text-red-500 text-xs mt-1">{errors.text}</p>
            )}
            <p
              className="text-xs text-gray-500 mt-1"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {reviewText.length} / 500 characters
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-white rounded-lg hover:bg-gray-50 transition-colors font-medium"
              data-testid="button-cancel-review"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-[#59A5B2] hover:bg-[#4a8f9a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
              data-testid="button-submit-review"
            >
              {isSubmitting ? "Submitting..." : "Submit review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
