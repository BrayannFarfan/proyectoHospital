// src/components/ResetPasswordDash.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { InputContent } from "../ContainerInput/InputContent";

export const ResetPasswordDash = () => {
  const { user, changePasswordDash } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const result = await changePasswordDash(formData, user.id);
      setSuccessMessage(result.message);
      setFormData({ currentPassword: "", newPassword: "" });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (!user) {
    return <div>Please log in to change your password.</div>;
  }

  return (
    <div className="change-password-form">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Current Password</label>
          <InputContent
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            placeholder="Enter current password"
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <InputContent
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholder="Enter new password"
            required
          />
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="submit-button">
          Change Password
        </button>
      </form>
    </div>
  );
};