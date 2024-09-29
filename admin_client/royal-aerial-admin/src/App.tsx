import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/homePage";
import Navigation from "./pages/navigation";
import Courses from "./pages/courses";
import { CoursesProvider } from "./hooks/coursesContext";
import Transactions from "./pages/transactions";
import { TransactionsProvider } from "./hooks/transactionsContext";
import Login from "./pages/login";
import { AuthProvider } from "./hooks/authContext";
import { UsersProvider } from "./hooks/userContext";
import { AnalyticsProvider } from "./hooks/analyticsContext";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <>
    <AuthProvider>
      <CoursesProvider>
        <TransactionsProvider>
          <UsersProvider>
            <AnalyticsProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/admin" element={<ProtectedRoute element={<HomePage/>} />}></Route>
            <Route path="/admin/courses" element={<ProtectedRoute element={<Courses/>} />}></Route>
            <Route
              path="/admin/transactions"
              element={<ProtectedRoute element={<Transactions/>} />}
            ></Route>
          </Routes>
          </AnalyticsProvider>
          </UsersProvider>
        </TransactionsProvider>
      </CoursesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
