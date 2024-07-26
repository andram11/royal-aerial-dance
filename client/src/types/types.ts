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

export interface FilterCriteria {
        category?: string,
        location?: string,
        teacher?: string,
        dayOfWeek?: string,
        level?: string 
    }

    export interface CourseSearchResult {
        totalItems: number,
        skippedItems?: number,
        pageLimit: number,
        page?: number,
        items: Course[]
    }


export interface CourseEvent {
        id: string;
        title: string;
        start: Date;
        end: Date;
        description: string;
        recurrent: boolean;
        recurrenceType?: 'weekly' | 'biMonthly' | 'monthly';
      }

export interface CartItem {
        id: string;
        url: string;
        title: string;
        price: number;
        quantity: number;
        location: string;
        dayOfTheWeek: string;
        timeslot: string;
}

export interface ParticipantDetails {
        firstName: string;
        lastName: string;
        birthDate: string;
        email: string;
        phoneNumber: string
}

export interface CourseDetails {
        courseId: string;
        quantity: number
}

export interface PaymentDetails {
        paymentMethod: string;
        status: string;
        amount: number;
        currency: string;
}

export interface Payment {
        courseDetails: CourseDetails[];
        paymentDetails: PaymentDetails;
        participantDetails: ParticipantDetails;
}