const baseUrl= import.meta.env.VITE_BASE_URL as string 


import { Course, Category, FilterCriteria, CourseSearchResult} from "../types/types"


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

export async function getFilteredCourses(criteria: FilterCriteria):Promise<CourseSearchResult> {
    try{
        // Filter out criteria that have no value
    const filteredCriteria = Object.fromEntries(
        Object.entries(criteria).filter(([_, value]) => value)
    );
        let query = new URLSearchParams(filteredCriteria as any).toString();
        query = query.replace(/\+/g, '%20');
        let searchUrl=""
        if (query.length > 0) {
             searchUrl= "/courses/search?"
        } else {
            searchUrl= "/courses/search"
        }
        const response= await fetch(`${baseUrl}${searchUrl}${query}`)
        const items: CourseSearchResult= await response.json()

        return items 
    } catch(err){
        throw err;
    }
}