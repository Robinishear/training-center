import axios from "axios";


const uploadPhoto = async (file) => {
   
  if (!file) {
    throw new Error("No file selected for upload.");
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      "http://localhost:5000/upload-to-imgbb", 
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.imageUrl;
  } catch (error) {
    console.error(
      "Client upload error:",
      error.response?.data || error.message
    );
    throw new Error("Failed to upload image. Please try again.");
  }
};

export default uploadPhoto;
