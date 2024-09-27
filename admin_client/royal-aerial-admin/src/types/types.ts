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
    __v?: number

}

export interface GetParticipantsByCourseIdResponse {
    totalItems: number,
    skippedItems: number, 
    pageLimit:number,
    items: Array<Transaction>
}

export interface GetTransactionsResponse {
    totalItems: number,
    skippedItems: number, 
    pageLimit:number,
    items: Array<Transaction>
}


export interface Transaction {
    participantDetails: ParticipantDetails,
    _id: string;
    paymentId: string;
    status: string;
    courseDetails: [{
        courseId: string;
        quantity: number;
        _id: string
    }];
    paymentMethod: string;
    historyEndDate: Date ;
    historyStartDate: Date;
    __v: number;

}

export interface CreateTransaction {
    participantDetails: ParticipantDetails,
  
    paymentId: string;
    status: string;
    courseDetails: [{
        courseId: string;
        quantity: number;
       
    }];
    paymentMethod: string;
  
}

export interface ParticipantDetails{
    lastName: string;
  firstName: string;
  birthDate: Date;
  phoneNumber: string;
  email: string;
}

//export type GetAnalyticsResult= AnalyticsRevenue[]
//OR
export interface GetAnalyticsResult extends Array<AnalyticsRevenue> {}

export interface AnalyticsRevenue {
    _id: string;
    totalRevenue: number;
}

export interface User {
    _id: string;
    username: string;
    type: string
}

export interface GetUsersResponse {
    totalItems: number,
    skippedItems: number, 
    pageLimit:number,
    items: Array<User>
}