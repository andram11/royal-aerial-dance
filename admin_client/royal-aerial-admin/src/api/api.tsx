const baseUrl = import.meta.env.VITE_BASE_URL as string;
import {Course, GetCoursesResponse, GetParticipantsByCourseIdResponse } from "../types/types";

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

//Get course by id
export async function getCourseById(courseId: string): Promise<Course> {
    try {
        const response = await fetch(
            //Fetch the next parameters
            `${baseUrl}/courses/${courseId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
      
              credentials: "include",
            }
          );
          const course: Course = await response.json();
          return course;

    } catch(err){
        throw err
    }
    
} 

//Get participants by courseId
export async function getParticipantsByCourseId(courseId: string): Promise<GetParticipantsByCourseIdResponse> {
    try {
        const response = await fetch(
            //Fetch the next parameters
            `${baseUrl}/transactions/${courseId}/search`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
      
              credentials: "include",
            }
          );
          const items: GetParticipantsByCourseIdResponse = await response.json();
   
          return items;

    } catch(err){
        throw err
    }
    
}

//Edit course by id
export async function updateCourse(courseId:string, courseDetails: Course): Promise<Course>{
    try {
        const response = await fetch(
            //Fetch the next parameters
            `${baseUrl}/courses/${courseId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(courseDetails),
              credentials: "include",
            },

          );
          const data: Course = await response.json();
   
          return data;

    } catch(err){
        throw err
    }
}

//Delete course by id
export async function deleteCourse(courseId: string): Promise<any>{
  try {
    const response = await fetch(
        //Fetch the next parameters
        `${baseUrl}/courses/${courseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
         
          credentials: "include",
        },

      );
      const result = await response.json();
      return result;

} catch(err){
    throw err
}
}
//Create new course function

export async function createNewCourse(courseDetails: Course): Promise<Course> {
  try {
    const response = await fetch(
        //Fetch the next parameters
        `${baseUrl}/courses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseDetails),
          credentials: "include",
        },

      );
      const result = await response.json();
      return result;

} catch(err){
    throw err
}
}