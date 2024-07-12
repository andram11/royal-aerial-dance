const baseUrl= import.meta.env.BASE_URL as string 

import { Course } from "../types/types"

export async function getActiveCourses():Promise<{items: Course[]}> {
    try{
        const response= await fetch(`${baseUrl}/courses/search?status=active`)
        const items= await response.json()
        return items 
    } catch (err) {
        return { items: [] }
    }
}