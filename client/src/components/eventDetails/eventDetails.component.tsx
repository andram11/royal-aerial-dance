import styles from "./eventDetails.module.css";
import Button from "../button/button.component";
import { capitalizeFirstLetter } from "../../utils";

interface EventDetailsProps {
  event: {
    id: string;
    title: string;
    start: Date;
    end: Date;
    level: string;
    teacher: string;
    price: number;
    location: string;
    dayOfWeek: string;
    timeslot: string;
    recurrent: boolean;
    recurrenceType: string;
  };
  onAddToCart: (courseId: string) => void;
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  onAddToCart,
  onClose,
}) => {
  const handleAddToCart = (courseId: string) => {
    onAddToCart(courseId);
    onClose();
  };

  return (
    <div className={styles.eventDetailsContainer}>
      <div className={styles.eventDetailsHeader}>
        <h2 className={styles.eventDetailsTitle}>{event.title}</h2>
      </div>
      <p className={styles.eventDetailsDescription}>
        Teacher : {capitalizeFirstLetter(event.teacher)}
      </p>
      <p className={styles.eventDetailsDescription}>
        Level: {capitalizeFirstLetter(event.level)}
      </p>
      <p className={styles.eventDetailsDescription}>
        Where: {capitalizeFirstLetter(event.location)}
      </p>
      <p className={styles.eventDetailsDescription}>
        When: {capitalizeFirstLetter(event.dayOfWeek)}{" "}
        {event.start.toLocaleString().split(",")[0]} between {event.timeslot}
      </p>
      {event.recurrent && (
        <p>
          This course has a {event.recurrenceType} recurrence and it ends after
          10 sessions. The price reflects the price of a subscribtion for the 10
          sessions. It is not possible for this type of course to participate
          only for one session.
        </p>
      )}

      <p className={styles.eventDetailsDescription}>Price: {event.price} EUR</p>
      <div className={styles.eventDetailsActions}>
        <Button text="Add to cart" onClick={() => handleAddToCart(event.id)} />
        <Button text="Close" onClick={onClose} />
      </div>
    </div>
  );
};

export default EventDetails;
