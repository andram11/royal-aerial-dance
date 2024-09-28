import "./App.css";

import {Routes, Route } from "react-router-dom";
import Navigation from "./pages/navigation/navigation.tsx";
import Homepage from "./pages/homepage/homepage.tsx";
import NotFound from "./components/error/notFound.component.tsx";
import CoursesPage from "./pages/courses/courses.tsx";
import Checkout from "./pages/checkout/checkout.component.tsx";
import ParticipantForm from "./components/participantForm/participantForm.component.tsx";
import PaymentForm from "./components/paymentForm/paymentForm.component.tsx";
import OrderConfirmation from "./pages/orderConfirmation/orderConfirmation.component.tsx";
import Register from './pages/register/register.tsx'
import Login from "./pages/login/login.tsx";
import ProtectedRoute from "./components/protectedRoute/protectedRoute.component.tsx";
import Callback from "./pages/authCallback/authCallback.tsx";
import ResetPassword from "./pages/resetPassword/resetPassword.tsx";
import Footer from "./components/footer/footer.component.tsx";

function App() {


  return (
    <>
   <Navigation/>
    <Routes>
    
        <Route index element={<Homepage />} />
        <Route path="/courses" element= {<CoursesPage/>} />
        <Route path="/courses/:category" element={<CoursesPage/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/registration" element={<ProtectedRoute element={<ParticipantForm />} />} />
        <Route path="/payment" element={<ProtectedRoute element={<PaymentForm />} />} />
        <Route path="/confirmationStatus" element={<ProtectedRoute element={<OrderConfirmation />} />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/auth/callback" element={<Callback />} />
        <Route path="/callback/resetPassword" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
     
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
