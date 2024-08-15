const baseUrl = import.meta.env.VITE_BASE_URL as string;

import { loadStripe } from "@stripe/stripe-js";

import {
  Course,
  Category,
  FilterCriteria,
  CourseSearchResult,
  Payment,
  User,
} from "../types/types";

interface PaymentResponse {
  payment: string;
  transaction: {
    message: string;
  };
}

interface ForgotPasswordResult {
  success: boolean;
  data?: any;
  error?: string;
}

export interface SignUpResponse extends Response {
  data: {
    userId: string;
    username: string;
  };
  message: string;
}

const today = new Date();
const startDate = today.toISOString().split("T")[0];
const endDate = new Date();
endDate.setFullYear(today.getFullYear() + 1); // Add one year to the current date

// Convert the end date to an ISO string and extract only the date part
const endDateString = endDate.toISOString().split("T")[0];

export async function getActiveCourses(): Promise<Course[]> {
  try {
    const response = await fetch(
      `${baseUrl}/courses/search?status=active&startDate=${startDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      }
    );
    const items: Course[] = await response.json();
    return items;
  } catch (err) {
    throw err;
  }
}

export interface LoginResponse {
  data: {
    userId: string;
    username: string;
  };
  message: string;
}

export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_KEY as string
);

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${baseUrl}/categories`);
    const items = await response.json();
    return items;
  } catch (err) {
    throw err;
  }
}

export async function getFilteredCourses(
  criteria: FilterCriteria
): Promise<CourseSearchResult> {
  try {
    // Filter out criteria that have no value
    const filteredCriteria = Object.fromEntries(
      Object.entries(criteria).filter(([_, value]) => value)
    );
    let query = new URLSearchParams(filteredCriteria as any).toString();
    query = query.replace(/\+/g, "%20");
    let searchUrl = `/courses/search?endDate=${endDateString}&`;
    // if (query.length > 0) {
    //      searchUrl= ``
    // } else {
    //     searchUrl= "/courses/search"
    // }
    const response = await fetch(`${baseUrl}${searchUrl}${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    });
    const items: CourseSearchResult = await response.json();

    return items;
  } catch (err) {
    throw err;
  }
}

export async function createPaymentRequest(
  paymentDetails: Payment
): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${baseUrl}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentDetails),
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function registerUser(user: User): Promise<SignUpResponse> {
  try {
    const response = await fetch(`${baseUrl}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error.errors || "Failed to register.");
    }
    console.log(data)
    return data;

  } catch (err) {
    throw err;
  }
}

export async function loginUser(user: User): Promise<LoginResponse> {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to login");
    }

    return data;
  } catch (err) {
    throw err;
  }
}

export async function logoutUser(): Promise<Response> {
  try {
    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to logout");
    }
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
}

export function loginWithGoogle(redirectPath: string) {
  const redirectUrl = `${baseUrl}/auth/google?redirect=${encodeURIComponent(
    redirectPath
  )}`;
  window.location.href = redirectUrl;
}

export async function forgotPassword(email: string): Promise<ForgotPasswordResult> {
  try {
    const response = await fetch(`${baseUrl}/auth/forgotPassword/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok && data.error) {
      return { success: false, error: data.error.error || "An error occurred" };
    }

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred" }
  }
}

export async function resetPassword(email: string, password: string, resetToken: string): Promise<Response> {
  try {
    const response = await fetch(`${baseUrl}/auth/resetPassword/?username=${email}&token=${resetToken}&password=${password}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to reset password.");
    }
    return data;
  } catch (err) {
    throw err;
  }
}
