import {
  Calendar,
  momentLocalizer,
  Event,
  Views,
  Formats,
} from "react-big-calendar";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./calendarView.module.css";

moment.updateLocale("fr", {
  week: {
    dow: 1, // Monday is the first day of the week
  },
});

const localizer = momentLocalizer(moment);

interface CourseEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  teacher: string;
  location: string;
  price: number;
  dayOfWeek: string;
  recurrent: boolean;
  level: string;
  timeslot: string;
  recurrenceType: "weekly" | "biMonthly" | "monthly";
}

interface CalendarViewProps {
  events: CourseEvent[];
  onSelectEvent: (event: CourseEvent) => void;
}

const formats: Formats = {
  timeGutterFormat: "HH:mm",
  eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
  agendaTimeFormat: "HH:mm",
  agendaDateFormat: "MMM DD",
  agendaTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
    `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
};

const minTime = new Date();
minTime.setHours(10, 0, 0, 0); // Set the time to 10:00 AM

const maxTime = new Date();
maxTime.setHours(22, 0, 0, 0); // Set the maximum visible time to 10:00 PM

const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onSelectEvent,
}) => {


 
  return (
    <div className={styles.calendarContainer } >
      <Calendar 
      step={30} // Each slot represents 30 minutes
      timeslots={2} // Show 2 slots per hour (e.g., 10:00, 10:30)
      
        localizer={localizer}
        events={events.map((event) => ({
          ...event,
          start: moment(event.start).toDate(), // Ensure consistency
          end: moment(event.end).toDate(), // Ensure consistency
        }))}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={onSelectEvent}
        defaultView={Views.WEEK}
        views={['week', 'day', 'month']}
        min={minTime} // Set the minimum visible time to 10:00 AM
        max={maxTime}
        toolbar={true} // Hides the toolbar to remove view options
        formats={formats} // Apply custom formats
      />
    </div>
  );
};

export default CalendarView;