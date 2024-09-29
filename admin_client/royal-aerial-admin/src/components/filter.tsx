type SearchCriteriaKey = 'category' | 'location' | 'teacher' | 'dayOfWeek' | 'level';
// interface SearchCriteria {
//     category: string;
//     location: string;
//     teacher: string;
//     dayOfWeek: string;
//     level: string;
//   }
  

  const Filter: React.FC = () => {

  
    const renderSelect = (name: SearchCriteriaKey, options: string[]) => {
      const displayName =
        name === 'dayOfWeek' ? 'Day Of Week' : name.charAt(0).toUpperCase() + name.slice(1);
  
      return (
        <>
        <div className="flex flex-col py-4">
          <select className="text-secondary-200 border-2 p-2 border-secondary hover:outline-tertiary focus:outline-tertiary active:outline-tertiary" name={name} value="">
            <option value="">{displayName}</option>
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
         
        </div>
      
        </>
      );
    };
  
    return (
      <div>
        
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