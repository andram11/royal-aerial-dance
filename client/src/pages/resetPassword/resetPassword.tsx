import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/api-service"; // You will create this API function
import PasswordInput from "../../components/passwordInput/passwordInput.component";
import styles from './resetPassword.module.css'
import Button from "../../components/button/button.component";

const ResetPassword: React.FC = () => {
  const resetParams = new URLSearchParams(location.search);
  const resetToken = resetParams.get("token");
  const username = resetParams.get("username");

  const [email, setEmail] = useState<string | null>(username);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!resetToken || !username) {
      setError("Invalid or expired reset link.");
    }
  }, [resetToken, username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !resetToken) {
      setError("Invalid or expired reset link.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await resetPassword(email, newPassword, resetToken);
      alert("Password has been reset successfully.");
      navigate("/login");
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className={styles.container} >
      <h2>Reset Password</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.formCenteredButton}>
        <div>
          <label>Email</label>
          <input type="email" value={email || ""} required />
        </div>
        <PasswordInput
          label="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
     
        <Button type="submit" text="Reset password"/>
        
        
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default ResetPassword;
