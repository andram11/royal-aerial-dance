
import styles from './eventDetails.module.css';

interface EventDetailsProps {
  event: {
    id: string;
    title: string;
    start: Date;
    end: Date;
    description: string;
  };
  onAddToCart: (courseId: string) => void;
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onAddToCart, onClose }) => {
  const handleAddToCart = (courseId: string) => {
    onAddToCart(courseId);
    onClose();
  };

  return (
    <div className={styles.eventDetailsContainer}>
      <div className={styles.eventDetailsHeader}>
        <h2 className={styles.eventDetailsTitle}>{event.title}</h2>
        <button className={styles.eventDetailsCloseButton} onClick={onClose}>
          &times;
        </button>
      </div>
      <p className={styles.eventDetailsDescription}>{event.description}</p>
      <p className={styles.eventDetailsTime}>
        {event.start.toLocaleString()} - {event.end.toLocaleString()}
      </p>
      <div className={styles.eventDetailsActions}>
        <button className={styles.eventDetailsButton}  onClick={() => handleAddToCart(event.id)}>
        Add to cart
        </button>
        <button className={styles.eventDetailsButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
