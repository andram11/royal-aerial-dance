export interface GetCoursesResponse {
    totalItems: number,
    skippedItems: number, 
    pageLimit:number,
    items: Array<Course>
}

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

export interface GetParticipantsByCourseIdResponse {
    totalItems: number,
    skippedItems: number, 
    pageLimit:number,
    items: Array<Transaction>
}

export interface Transaction {
    participantDetails: {},
    _id: string;
    paymentId: string;
    status: string;
    paymentMethod: string;
    historyEndDate: Date ;
    historyStartDate: Date;
    __v: number;

}