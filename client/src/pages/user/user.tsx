import UserForm from "../../components/userForm/userForm.component";
import { useAppDispatch } from "../../hooks";
import { logUser } from "../../state/user/userSlice";
import { useState } from "react";

const User = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logUser(formData));
  };

  return (
    <>
      <h2>Already have an account or want to login using a Google account?</h2>
      <UserForm
        handleSubmit={handleLogin}
        handleChange={handleChange}
        buttonText="Login"
      />
      <button>Login with Google</button>
    </>
  );
};


export default User