import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getActiveCourses } from "./api/api-service";
import { useEffect, useState } from "react";
import { setCourses } from "./state/courses/coursesSlice";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./pages/navigation/navigation.tsx";
import Homepage from "./pages/homepage/homepage.tsx";
import NotFound from "./components/error/notFound.component.tsx";

function App() {
  // const dispatch = useAppDispatch()
  // const courses= useAppSelector(state=> state.courses.allCourses)
  // const [error, setError] = useState<string | null>(null);

  // // Get courses
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const courses = await getActiveCourses();
  //       dispatch(setCourses(courses));
  //     } catch (err) {
  //       setError('Failed to load courses');
  //     }
  //   };

  //   fetchCourses();
  // }, [dispatch]);

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
