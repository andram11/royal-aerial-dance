export type Cb = (a: string) => void;

export interface Course {
    title: string,
    location: string,
    level: string,
    dayOfWeek: string,
    timeslot: string,
    price: number,
    stock: number,
    teacher: string,
    status: string
}