export interface Course {
        _id: string,
        category: string,
        title: string,
        location: string,
        startDate: Date,
        endDate: Date,
        recurrent: boolean,
        recurrenceType: string,
        level: string,
        dayOfWeek: string,
        timeslot: string,
        price: number,
        stock: number,
        teacher: string,
        status: string,
        __v: number
    
}

export interface Category {
        id: number,
        title: string,
        imageUrl: string,
        route: string
}