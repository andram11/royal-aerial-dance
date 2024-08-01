
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCourses } from '../../state/courses/coursesSlice';
import { getActiveCourses } from '../../api/api-service';
import Filter from '../../components/filter/filter.component';
import { RootState } from '../../state/store';

import { fetchCoursesWithCriteria } from '../../state/courses/coursesSlice';
import CalendarView from '../../components/calendarView/calendarView.component';
import EventDetails from '../../components/eventDetails/eventDetails.component';
import { addItemToCart } from '../../state/cart/cartSlice';

import styles from './courses.module.css'

import { CourseEvent, CartItem} from '../../types/types';

const parseTimeslot = (
    startDate: Date,
    endDate: Date,
    timeslot: string,
    recurrenceType?: 'weekly' | 'biMonthly' | 'monthly'
  ): { start: Date[], end: Date[] } => {
    const [startTime, endTime] = timeslot.split('-');
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
  
    const occurrences = [];
    let currentStartDate = new Date(startDate);
  
    while (currentStartDate <= endDate) {
      const startOccurrence = new Date(currentStartDate);
      startOccurrence.setHours(startHour, startMinute);
  
      const endOccurrence = new Date(currentStartDate); // Correct endOccurrence calculation
      endOccurrence.setHours(endHour, endMinute);
  
      occurrences.push({ start: startOccurrence, end: endOccurrence });
  
      if (recurrenceType === 'weekly') {
        currentStartDate.setDate(currentStartDate.getDate() + 7);
      } else if (recurrenceType === 'biMonthly') {
        currentStartDate.setMonth(currentStartDate.getMonth() + 2);
      } else if (recurrenceType === 'monthly') {
        currentStartDate.setMonth(currentStartDate.getMonth() + 1);
      } else {
        break;
      }
    }
  
    return {
      start: occurrences.map(o => o.start),
      end: occurrences.map(o => o.end),
    };
  };
  
  const CoursesPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const dispatch = useAppDispatch();
    const { filteredCourses, loading, error } = useAppSelector((state: RootState) => state.courses);


  
    const [events, setEvents] = useState<CourseEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<CourseEvent | null>(null);
    const initialCriteria = { category: category ? category.toLowerCase() : '' };
  
    //Get active courses available
    useEffect(() => {
      const fetchCourses = async () => {
        const coursesData = await getActiveCourses();
        dispatch(setCourses(coursesData));
      };
  
      fetchCourses();
    }, [dispatch]);
  
    //reformat course details data to fit the react big calendar
    useEffect(() => {
      const courseEvents = filteredCourses.flatMap((course) => {
        const recurrenceType = ['weekly', 'biMonthly', 'monthly'].includes(course.recurrenceType) ? course.recurrenceType as 'weekly' | 'biMonthly' | 'monthly' : undefined;
        const { start, end } = parseTimeslot(new Date(course.startDate), new Date(course.endDate), course.timeslot, recurrenceType);
  
        return start.map((startOccurrence, index) => ({
          id: `${course._id}-${index}`,
          title: course.title,
          start: startOccurrence,
          end: end[index],
          description: course.teacher,
          recurrent: course.recurrent,
          recurrenceType: recurrenceType,
        }));
      });
  
      setEvents(courseEvents);
    }, [filteredCourses]);
  
    // Apply courses filter based on the category selected in the previous route
    useEffect(() => {
        
        if (category) {
            const criteria = { category: category.toLowerCase() }
            dispatch(fetchCoursesWithCriteria(criteria))
        }
      }, [category, dispatch]);

    const handleSelectEvent = (event: CourseEvent) => {
      setSelectedEvent(event);
    };
  

    const handleAddToCart = (courseId: string) => {
      const course= filteredCourses.find(course => course._id=== courseId.split('-')[0])
      if (course) {
        const cartItem: CartItem= {
          id: course._id,
          title: course.title,
          price: course.price,
          quantity: 1,
          url: "https://images.unsplash.com/photo-1514500656691-01c2918eb76e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          location: course.location,
          timeslot: course.timeslot,
          dayOfTheWeek: course.dayOfWeek

        }
        dispatch(addItemToCart(cartItem))
      }
      //console.log(`Course ${courseId.split('-')[0]} added to cart.`);
    };
  
    return (
      <div className={styles.coursesPage}>
        <Filter initialCriteria={initialCriteria}/>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className={styles.calendarContainer}>
          <h2>Courses</h2>
          <CalendarView events={events} onSelectEvent={handleSelectEvent} />
          {selectedEvent && (
            <EventDetails
              event={selectedEvent}
              onAddToCart={handleAddToCart}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </div>
      </div>
    );
  };
  
  export default CoursesPage;