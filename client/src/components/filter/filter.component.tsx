import { useAppDispatch } from "../../hooks";
import {useState, useEffect }from "react";
import { fetchCoursesWithCriteria } from "../../state/courses/coursesSlice";
import styles from './filter.module.css'
import { capitalizeFirstLetter } from "../../utils";

type SearchCriteriaKey = 'category' | 'location' | 'teacher' | 'dayOfWeek' | 'level';

interface SearchCriteria {
  category: string;
  location: string;
  teacher: string;
  dayOfWeek: string;
  level: string;
}

interface FilterProps {
  initialCriteria?: Partial<SearchCriteria>;
}

const Filter: React.FC<FilterProps> = ({ initialCriteria = {} }) => {
  const dispatch = useAppDispatch();
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    category: '',
    location: '',
    teacher: '',
    dayOfWeek: '',
    level: '',
    ...initialCriteria
  });

  useEffect(() => {
    dispatch(fetchCoursesWithCriteria(searchCriteria));
  }, [searchCriteria, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const key = name as SearchCriteriaKey;

    setSearchCriteria(prevCriteria => ({
      ...prevCriteria,
      [key]: prevCriteria[key]
        ? `${prevCriteria[key]},${value}`
        : value.toLowerCase()
    }));
  };

  const handleRemoveItem = (name: SearchCriteriaKey, value: string) => {
    setSearchCriteria(prevCriteria => {
      const newValue = prevCriteria[name]
        .split(',')
        .filter((v: string) => v !== value)
        .join(',');
      return {
        ...prevCriteria,
        [name]: newValue
      };
    });
  };

  const getSelectedItems = (criteria: SearchCriteriaKey) =>
    searchCriteria[criteria].split(',').filter((item: string) => item);

  const renderSelect = (name: SearchCriteriaKey, options: string[]) => {
    const displayName =
      name === 'dayOfWeek' ? 'Day Of Week' : name.charAt(0).toUpperCase() + name.slice(1);

    return (
      <div className={styles.selectContainer}>
        <select  name={name} value="" onChange={handleChange}>
          <option value="">{displayName}</option>
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className={styles.pillsContainer}>
          {getSelectedItems(name).map(item => (
            <div key={item} className={styles.pill}>
              {capitalizeFirstLetter(item)}
              <button onClick={() => handleRemoveItem(name, item)}>
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.filterSidebar}>
      
        {renderSelect('category', [
          'Pole Dance',
          'Aerial Hoop',
          'Yoga',
          'Heels dance',
          'Contemporary dance'
        ])}
        {renderSelect('location', [
          'Gent',
          'Leuven',
          'Mons',
          'Brussels',
          'Namur'
        ])}
        {renderSelect('teacher', [
          'Emma',
          'Natalia',
          'Marlo',
          'Gaby',
          'Elena'
        ])}
        {renderSelect('dayOfWeek', [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ])}
        {renderSelect('level', [
          'Beginner',
          'Intermediate',
          'Advanced',
          'Elite',
          'All levels'
        ])}
      </div>

  );
};

export default Filter;