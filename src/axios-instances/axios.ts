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
    console.log("axios", response);
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
  productHandle: string;
  author: string;
  rating: number;
  review: string;
  title: string;
  createdAt: string;
  id: string;
}

export interface ReviewsProps {
  reviews: ReviewProps[];
}

export interface ReviewDataProps {
  data: ReviewsProps
}

export const fetchReviews = async (itemHandle: string) => {
  try {
    const response = await axios.get<ReviewDataProps>(`/api/reviews`);
    return response.data.data.reviews.filter(
      (review: ReviewProps) => review.productHandle === itemHandle
    );
  } catch (error) {
    console.log(error);
  }
};

// export const fetchReviews = async () => {
//   try {
//     return await axios.get(`/api/reviews`);
//   } catch (error) {
//     console.log(error);
//   }
// };
