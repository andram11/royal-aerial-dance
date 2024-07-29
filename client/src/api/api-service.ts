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

interface SignUpResponse {
    userId: string;
    message: string }
    
const today= new Date()
const startDate = today.toISOString().split('T')[0];



export async function getActiveCourses():Promise<Course[]> {
    try{

        const response= await fetch(`${baseUrl}/courses/search?status=active&startDate=${startDate}`)
        const items: Course[]= await response.json()
        return items 
    } catch (err) {
        throw err;
         }
    }
   

export interface LoginResponse {
    data: {
        userId: string;
        username: string 
    };
    message: string 
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
        query = query.replace(/\+/g, '%20');
        let searchUrl=`/courses/search?startDate=${startDate}&`
        // if (query.length > 0) {
        //      searchUrl= ``
        // } else {
        //     searchUrl= "/courses/search"
        // }
        const response= await fetch(`${baseUrl}${searchUrl}${query}`)
        const items: CourseSearchResult= await response.json()

        return items 
    } catch(err){
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
      credentials: 'include'
    });

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function registerUser(user: User):Promise<SignUpResponse>{
    try{
        const response = await fetch(`${baseUrl}/auth/signUp`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
        const data= await response.json()
        return data.userId
    }catch (err){
        throw err
    }
};


export async function loginUser(user: User):Promise<LoginResponse>{
    try{
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
        const data= await response.json()
        return (data.data.userId, data.data.username)
    }catch (err){
        throw err
    }
};