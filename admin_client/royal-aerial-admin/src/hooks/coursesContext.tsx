import React, { createContext, useState, useEffect, useContext } from "react";
import { getAllCourses } from "../api/api";
import { Course, GetCoursesResponse } from "../types/types";


interface CoursesContextType {
    courses: GetCoursesResponse | null,
    loading: boolean,
    error: string | null;
    fetchCourses: (limit: number, skip: number)=> Promise<void>
}

const CoursesContext= createContext<CoursesContextType | undefined>(undefined)

//custom hook
export const useCourses= () => {
    const context= useContext(CoursesContext)
    if (!context){
        throw new Error("useCourses must be used within a CoursesProvider")
    }
    return context;
}

//Context Provider to be used within App and make the courses available to components using them

export const CoursesProvider: React.FC<{children: React.ReactNode}>= ({children})=> {
    const [courses, setCourses]= useState<GetCoursesResponse | null>(null)
    const [loading, setLoading]= useState<boolean>(true)
    const [error, setError]= useState<string |null>(null)


    const fetchCourses = async (limit: number, skip: number) => {
        setLoading(true);
        try {
          const response = await getAllCourses(limit, skip);
          setCourses(response);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch courses");
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchCourses(10,0);
      }, []);

      return (
        <CoursesContext.Provider value={{courses, loading, error, fetchCourses}}>
            {children}
        </CoursesContext.Provider>
      )
}