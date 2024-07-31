import { SignUpResponse, registerUser } from "../../api/api-service";
import UserForm from "../../components/userForm/userForm.component";
import { useAppDispatch, useAppSelector} from "../../hooks";
import { logUser, selectError } from "../../state/user/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [registrationError, setRegistrationError]= useState<string | null>(null);
  const loginError = useAppSelector(selectError);
  const navigate= useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(logUser(formData));
    if (logUser.rejected.match(resultAction)) {
      // If the action is rejected, show the error message
      setRegistrationError(resultAction.payload as string);
    } else {
      // Clear the error and navigate to checkout
      setRegistrationError(null);
      navigate('/checkout');
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       await registerUser(formData);
        setRegistrationError(null);
        // Handle successful registration (e.g., redirect to another page)
        navigate('/login')
      
    } catch (error:any) {
        if (error.message) {
            setRegistrationError(error.message);
          } else {
            setRegistrationError('An error occurred during registration. Please try again.');
          }
    }
  };

  return (
    <>
  
      <h2>New here or don't have a Google account? Create a new account here. </h2>
      <h3>You already have an account? Then sign in <a href="/login">here.</a> </h3>
      {registrationError && <div style={{ color: 'red' }}>{registrationError}</div>}
      <UserForm
        handleSubmit={handleRegistration}
        handleChange={handleChange}
        buttonText="Register"
      />
    </>
  );
};


export default Register