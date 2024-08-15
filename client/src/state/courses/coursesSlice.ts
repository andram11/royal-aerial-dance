import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import { Course, CourseSearchResult } from '../../types/types'
import { getFilteredCourses } from '../../api/api-service'

export interface CourseState {
    allCourses: Course[],
    filteredCourses: Course[],
    totalItems: number;
    skippedItems?: number;
    pageLimit: number;
    page?: number;
    loading: boolean,
    error: string|null
}

interface FilterCriteria {
    category?: string,
    location?: string,
    teacher?: string,
    dayOfWeek?: string,
    level?: string 
}



// Async thunk for fetching filtered courses
export const fetchCoursesWithCriteria = createAsyncThunk<CourseSearchResult, FilterCriteria>(
    'courses/fetchCoursesWithCriteria',
    async (criteria: FilterCriteria) => {
        const data: CourseSearchResult = await getFilteredCourses(criteria);
        return data;
    }
);

const initialState: CourseState= {
    allCourses:[],
    filteredCourses:[],
    totalItems: 0,
    pageLimit: 50,
    loading: false,
    error: null
}

const courseSlice= createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourses: (state, action: PayloadAction<Course[]>)=> {
            state.allCourses= action.payload
            //state.filteredCourses= action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoursesWithCriteria.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCoursesWithCriteria.fulfilled, (state, action: PayloadAction<CourseSearchResult>) => {
                state.loading = false;
                state.filteredCourses = action.payload.items || [];
                state.totalItems = action.payload.totalItems;
                state.skippedItems = action.payload.skippedItems;
                state.pageLimit = action.payload.pageLimit;
                state.page = action.payload.page;
            })
            .addCase(fetchCoursesWithCriteria.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch courses';
            });
    }
})

export const {setCourses}= courseSlice.actions
export default courseSlice.reducer