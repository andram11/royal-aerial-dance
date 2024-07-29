// CalendarView.tsx

import { Calendar, momentLocalizer, Event, Views, Formats } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './calendarView.module.css';

const localizer = momentLocalizer(moment);

interface CourseEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  recurrent: boolean;
  recurrenceType?: 'weekly' | 'biMonthly' | 'monthly';
}

interface CalendarViewProps {
  events: CourseEvent[];
  onSelectEvent: (event: CourseEvent) => void;
}

const formats: Formats = {
    timeGutterFormat: 'HH:mm',
    eventTimeRangeFormat: ({ start, end }: { start: Date, end: Date }) =>
      `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
    agendaTimeFormat: 'HH:mm',
    agendaDateFormat: 'MMM DD',
    agendaTimeRangeFormat: ({ start, end }: { start: Date, end: Date }) =>
      `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
  };

const CalendarView: React.FC<CalendarViewProps> = ({ events, onSelectEvent }) => {

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={onSelectEvent}
        defaultView={Views.WEEK}
        //views={['week']}
        toolbar={true}  // Hides the toolbar to remove view options
        formats={formats} // Apply custom formats
      />
    </div>
  );
};

export default CalendarView;
