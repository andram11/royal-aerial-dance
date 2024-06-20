export type Cb = (a: string) => void;

export interface Course {
    category: string,
    title: string,
    location: string,
    startDate: string,
    endDate: string,
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