import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/homePage";
import Navigation from "./pages/navigation";
import Courses from "./pages/courses";
import { CoursesProvider } from "./hooks/coursesContext";
import Transactions from "./pages/transactions";
import { TransactionsProvider } from "./hooks/transactionsContext";
import Login from "./pages/login";
import { AuthProvider } from "./hooks/authContext";

function App() {
  return (
    <>
    <AuthProvider>
      <CoursesProvider>
        <TransactionsProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/admin" element={<HomePage />}></Route>
            <Route path="/admin/courses" element={<Courses />}></Route>
            <Route
              path="/admin/transactions"
              element={<Transactions />}
            ></Route>
          </Routes>
        </TransactionsProvider>
      </CoursesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
