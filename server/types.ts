import mongoose from "mongoose";

export type Cb = (a: string) => void;

export interface Course {
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
    status: string
}


export interface TypedRequestBody<T> extends Express.Request {
    body: Course
}

export interface Transaction {
    courseId:Array<{courseId: mongoose.Types.ObjectId}>,
    paymentId: string,
    participantId: mongoose.Types.ObjectId,
    status: string,
    paymentMethod:string
}

