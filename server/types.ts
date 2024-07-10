import mongoose from "mongoose";
import Stripe from "stripe";

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
    courseDetails:Array<CourseDetails>,
    paymentId: string | undefined,
    participantId: mongoose.Types.ObjectId,
    status: string,
    paymentMethod:string
}

export interface PaymentDetails {
    amount: number,
    currency: string,
    paymentMethod:string,
    status: string
}

export interface Participant {
    firstName: string,
    lastName: string,
    birthDate: Date,
    phoneNumber: string,
    email: string
}

export interface CourseDetails {
    courseId: mongoose.Types.ObjectId,
    quantity: number
}
export interface Payment {
    courseDetails:Array<CourseDetails>,
    participantDetails: Participant,
    paymentDetails: PaymentDetails

}
