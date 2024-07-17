import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Course } from '../../types/types'

export interface CourseState {
    allCourses: Course[],
    filteredCourses: Course[]
}

interface FilterCriteria {
    category?: string,
    location?: string,
    teacher?: string,
    dayOfWeek: string,
    level: string 
}

const initialState: CourseState= {
    allCourses: [],
    filteredCourses: []
}

const courseSlice= createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourses: (state, action: PayloadAction<Course[]>)=> {
            state.allCourses= action.payload
            state.filteredCourses= action.payload
        },
        filterCourses: (state, action:PayloadAction<FilterCriteria>)=> {
            const {category, location, teacher, dayOfWeek, level}= action.payload
            state.filteredCourses= state.allCourses.filter( course => {
                return(
                    (category ? course.category===category: true )&&
                    (location ? course.location === location : true) &&
                    (teacher ? course.teacher === teacher : true) &&
                    (dayOfWeek ? course.dayOfWeek === dayOfWeek : true) &&
                    (level ? course.level === level : true)
                )
            })
        }
    }
})

export const {setCourses, filterCourses}= courseSlice.actions
export default courseSlice.reducer