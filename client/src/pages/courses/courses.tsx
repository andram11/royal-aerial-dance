
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCourses } from '../../state/courses/coursesSlice';
import { getActiveCourses } from '../../api/api-service';
import Filter from '../../components/filter/filter.component';
import { RootState } from '../../state/store';

const CoursesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const {filteredCourses, loading, error, totalItems, page, pageLimit} = useAppSelector((state: RootState)=> state.courses);

    useEffect(() => {
        const fetchCourses = async () => {
            const coursesData = await getActiveCourses();
            dispatch(setCourses(coursesData));
        };

        fetchCourses();
    }, [dispatch]);

    return (
        <div>
            <h1>Courses</h1>
            <Filter />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div>
                {filteredCourses && filteredCourses.map(course => (
                    <div key={course._id}>
                        <h2>{course.title}</h2>
                        <p>{course.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursesPage;