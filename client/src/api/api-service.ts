const baseUrl= import.meta.env.VITE_BASE_URL as string 


import { Course, Category} from "../types/types"


export async function getActiveCourses():Promise<Course[]> {
    try{
        const response= await fetch(`${baseUrl}/courses/search?status=active`)
        const items: Course[]= await response.json()
        return items 
    } catch (err) {
        throw err;
         }
    }
   

export async function getCategories():Promise<Category[]> {
    try{
        const response= await fetch(`${baseUrl}/categories`)
        const items= await response.json()
        return items 
    } catch (err) {
        throw err;
    }
}