// src/components/ProfileForm.jsx
import { useEffect, useState } from "react";
import "./ProfileForm.css";
import { useAuth } from "../../context/AuthProvider";
import { InputContent } from "../ContainerInput/InputContent";

export const ProfileForm = () => {

    const { user, updateProfile } = useAuth();

    const localUser = JSON.parse(localStorage.getItem('user')) || {};
    const userData = localUser || {};

  const [formData, setFormData] = useState({
    name:userData.name || "",
    lastName: userData.lastName || "",
    email: userData.email ||"",
    greenCard: userData.greenCard ||"",
    address: userData.address || "",
    phone: userData.phone ||"",
    profilePic: null,
  });

  const [profilePic, setProfilePic] = useState(userData.profilePic);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (userData.profilePic) {
      const imageUrl = `http://localhost:3000${userData.profilePic}`;
      setImagePreview(imageUrl);
    }
  }, [user]);


  // if (!user) {
  //   return null
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/gif", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setImageError("Por favor, sube una imagen en formato JPG, JPEG ,GIF o PNG.");
        setProfilePic(null);
        setImagePreview(null);
        return;
      }

      const maxSize = 5 * 1024 * 1024; 
      if (file.size > maxSize) {
        setImageError("La imagen no debe superar los 5MB.");
        setProfilePic(null);
        setImagePreview(null);
        return;
      }

      setImageError("");
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const result = await updateProfile(formData, profilePic);
      setSuccessMessage(result.message);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="profile-form-container">
      <form onSubmit={handleSubmit}>
        <div className="image-upload-section">
          <div className="image-preview">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile Preview" />
            ) : (
              <img
                src={userData.profilePic}
                alt="Default Profile"
              />
            )}
          </div>
          <label htmlFor="profilePic" className="upload-button">
            Upload Photo
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/jpeg,image/gif,image/png"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
          <p className="image-restrictions">
            Allowed JPG, GIF or PNG. Max size of 2MB
          </p>
          {imageError && <p className="error-message">{imageError}</p>}
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <InputContent
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter first name"
              required
            />
          </div>
          <div className="form-group">
            <label>Last name</label>
            <InputContent
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter last name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <InputContent
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Green Card</label>
            <InputContent
              type="text"
              name="greenCard"
              value={formData.greenCard}
              onChange={handleInputChange}
              placeholder="Enter your GreenCard"
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile number</label>
            <InputContent
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Your Phone"
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <InputContent
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              required
            />
          </div>
        </div>
        {/* {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>} */}
        <button type="submit" className="submit-button">
          Save Profile
        </button>
      </form>
    </div>
  );
};