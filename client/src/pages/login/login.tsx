import { loginWithGoogle, forgotPassword } from "../../api/api-service";
import UserForm from "../../components/userForm/userForm.component";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logUser, selectError} from "../../state/user/userSlice";
import { useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const loginError = useAppSelector(selectError);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  //Password reset
  const [passwordReset, setPasswordReset]= useState<boolean>()
  const [resetEmail, setResetEmail] = useState("")

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
    if (!logUser.rejected.match(resultAction)) {
        // Clear the error and navigate to checkout
        navigate("/checkout");
      }
  };

  const handleGoogleLogin= ()=> {
    loginWithGoogle(from);
  }

  const handlePasswordReset= ()=> {
    setPasswordReset(true)
  }
  

  const handleResetEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetEmail(e.target.value);
  };

  const handlePasswordResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      const response=await forgotPassword(resetEmail);
      if (response.success) {
        alert("Password reset email sent. Please check your inbox.");
        setPasswordReset(false);
      } else {
        alert(response.error);
      }
     
   
  };

  return (
    <>
      <h2>
        Already have an account or want to register using a Google account?
      </h2>
      <h3>Don't have an account yet? Then register <a href="/register">here.</a></h3>
      <span>Forgot your password? Reset it <a onClick={handlePasswordReset}>here</a> . </span>
      {passwordReset && ( <form onSubmit={handlePasswordResetSubmit}>
          <span>
            Please provide the email you used for registering your account:
          </span>
          <input
            type="email"
            name="resetEmail"
            value={resetEmail}
            onChange={handleResetEmailChange}
            required
          />
          <button type="submit">Send Password Reset Email</button>
        </form>) 
     }
      {loginError && <div style={{ color: "red" }}>{loginError}</div>}
      <UserForm
        handleSubmit={handleLogin}
        handleChange={handleChange}
        buttonText="Login"
      />
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </>
  );
};

export default Login;
