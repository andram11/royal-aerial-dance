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

function App() {


  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Homepage />} />
        <Route path="/courses" element= {<CoursesPage/>} />
        <Route path="/courses/:category" element={<CoursesPage/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/registration" element={<ParticipantForm/>} />
        <Route path="/payment" element={<PaymentForm/>} />
        <Route path="/confirmationStatus" element={<OrderConfirmation/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
