import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/homePage";
import Navigation from "./pages/navigation";
import Courses from "./pages/courses";
import { CoursesProvider } from "./hooks/coursesContext";

function App() {
  return (
    <>
      <CoursesProvider>
        <Navigation />
        <Routes>
          <Route path="/admin" element={<HomePage />}></Route>
          <Route path="/admin/courses" element={<Courses />}></Route>
        </Routes>
      </CoursesProvider>
    </>
  );
}

export default App;
