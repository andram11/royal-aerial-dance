import { registerUser } from "../../api/api-service";
import UserForm from "../../components/userForm/userForm.component";
import styles from "./register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setRegistrationError(null);
      // Handle successful registration (e.g., redirect to another page)
      navigate("/login");
    } catch (error: any) {
      if (error.message) {
        setRegistrationError(error.message);
      } else {
        setRegistrationError(
          "An error occurred during registration. Please try again."
        );
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <h2>
          New here or don't have a Google account? Create a new account here.{" "}
        </h2>
        <h4>
          You already have an account? Then sign in <a href="/login">here.</a>{" "}
        </h4>
        {registrationError && (
          <div style={{ color: "red" }}>{registrationError}</div>
        )}
        <UserForm
          handleSubmit={handleRegistration}
          handleChange={handleChange}
          buttonText="Register"
          formData={formData}
        />
      </div>
    </div>
  );
};

export default Register;
