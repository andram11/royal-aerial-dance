const baseUrl = import.meta.env.VITE_BASE_URL as string;
import {Course, GetCoursesResponse } from "../types/types";

//GET all courses
export async function getAllCourses(limit?:number, skip?: number ): Promise<GetCoursesResponse> {
    try {
        //Check if any input parameters
        if (limit || skip){
            const response = await fetch(
                //Fetch the next parameters
                `${baseUrl}/courses/search?limit=${limit}&skip=${skip}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
          
                  credentials: "include",
                }
              );
              const items: GetCoursesResponse = await response.json();
              return items;
        }
        else {
            const response = await fetch(
                //We fetch only the first 10 items since this is the page limit for the components
                `${baseUrl}/courses/search?limit=10`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
          
                  credentials: "include",
                }
              );
              const items: GetCoursesResponse = await response.json();
              return items;
        }
      
     
    
      
    } catch (err) {
      throw err;
    }
  }

//Search courses 

//Edit course by id

//Create new course