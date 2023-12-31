import axios from "axios";

export interface AdminValues {
  announcementText?: string;
  announcementColor?: string;
  heroHeading?: string;
  heroSubHeading?: string;
  heroButtonText?: string;
  heroButtonColor?: string;
  heroImage?: string | File;
  logo?: string;
  footerBackgroundColor?: string;
}

export interface DashboardValues {
  dashboardValues: AdminValues[];
}

// ADMIN

export const fetchAdminValues = async () => {
  try {
    const response = await axios.get<DashboardValues>(
      "/api/auth/admin-dashboard"
    );
    return response.data.dashboardValues[0];
  } catch (error) {
    console.log(error);
  }
};

export const updateAdminValues = async (data: AdminValues) => {
  try {
    return await axios.patch<AdminValues>("/api/auth/admin-dashboard", data);
  } catch (error) {
    console.log(error);
  }
};

// REVIEWS

export interface ReviewProps {
  _id: string;
  productHandle: string;
  author: string;
  rating: number;
  review: string;
  title: string;
  isVerified: boolean;
  createdAt: string;
  id: string;
}

export interface ReviewsProps {
  reviews: ReviewProps[];
}

export interface ReviewDataProps {
  data: ReviewsProps;
}

export interface AverageRatingProps {
  productHandle: string;
  averageRating: number;
  totalReviews: number;
  _id: string;
}

export interface ReviewsStatsProps {
  reviewStats: AverageRatingProps[];
}

export interface StatsDataProps {
  data: ReviewsStatsProps;
}

export interface CreateReviewProps {
  rating: 0;
  review: string;
  title: string;
  author: string;
  productHandle: string;
}

export const fetchAllReviews = async () => {
  try {
    const response = await axios.get<ReviewDataProps>("/api/reviews");
    return response.data.data.reviews;
  } catch (error) {
    console.log(error);
  }
};

export const fetchReviews = async (handle: string) => {
  try {
    const response = await axios.get<ReviewDataProps>(`/api/reviews`);
    return response.data.data.reviews.filter(
      (review: ReviewProps) => review.productHandle === handle
    );
  } catch (error) {
    console.log(error);
  }
};

export const postReview = async (data: CreateReviewProps) => {
  try {
    await axios.post<CreateReviewProps>(" /api/reviews", data);
  } catch (error) {
    console.log(error);
  }
};

export const updateSingleReview = async (id: string, isVerified: boolean) => {
  try {
    const res = await axios.patch(`/api/reviews`, { data: { id, isVerified } });
    console.log("verifying", res);
    return res;
  } catch (error) {
    console.error("Error deleting review:", error);
  }
};

export const deleteSingleReview = async (id: string) => {
  try {
    const res = await axios.delete("/api/reviews", { data: { id } });
    console.log("did work", res);
  } catch (error) {
    console.error("Error deleting review:", error);
  }
};

export const fetchReviewStats = async (handle: string) => {
  try {
    const response = await axios.get(`/api/reviews`);
    return response.data.data.reviewStats.filter(
      (review: AverageRatingProps) => review.productHandle === handle
    );
  } catch (error) {
    console.log(error);
  }
};
