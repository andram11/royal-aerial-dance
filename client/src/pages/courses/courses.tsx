
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCourses } from '../../state/courses/coursesSlice';
import { getActiveCourses } from '../../api/api-service';
import Filter from '../../components/filter/filter.component';
import { RootState } from '../../state/store';

import CalendarView from '../../components/calendarView/calendarView.component';
import EventDetails from '../../components/eventDetails/eventDetails.component';

import styles from './courses.module.css'

import { CourseEvent } from '../../types/types';

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
    const dispatch = useAppDispatch();
    const { filteredCourses, loading, error } = useAppSelector((state: RootState) => state.courses);
  
    const [events, setEvents] = useState<CourseEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<CourseEvent | null>(null);
  
    useEffect(() => {
      const fetchCourses = async () => {
        const coursesData = await getActiveCourses();
        dispatch(setCourses(coursesData));
      };
  
      fetchCourses();
    }, [dispatch]);
  
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
  
    const handleSelectEvent = (event: CourseEvent) => {
      setSelectedEvent(event);
    };
  
    const handleAddToCart = (courseId: string) => {
      console.log(`Course ${courseId} added to cart.`);
    };
  
    return (
      <div className={styles.coursesPage}>
        <Filter />
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