import { loginWithGoogle } from "../../api/api-service";
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
    // if (!googleLogin.rejected.match(resultAction)) {
    //     // Clear the error and navigate to checkout
    //     navigate("/checkout");
    //   }
  }


  return (
    <>
      <h2>
        Already have an account or want to register using a Google account?
      </h2>
      <h3>Don't have an account yet? Then register <a href="/register">here.</a></h3>
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
