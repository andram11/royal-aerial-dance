import "./App.css";

import {Routes, Route } from "react-router-dom";
import Navigation from "./pages/navigation/navigation.tsx";
import Homepage from "./pages/homepage/homepage.tsx";
import NotFound from "./components/error/notFound.component.tsx";
import CoursesPage from "./pages/courses/courses.tsx";

function App() {


  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Homepage />} />
        <Route path="/courses" element= {<CoursesPage/>} />
        <Route path="/courses/:category" element={<CoursesPage/>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
