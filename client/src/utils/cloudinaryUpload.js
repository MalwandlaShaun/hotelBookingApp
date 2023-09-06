import axios from "axios";

const reRenderLocalStorage = () => {
  console.log("hello");
};

const cloudinaryUpload = async (e) => {
  try {
    console.log(e.target.files[0]);
    const imageFile = e.target.files[0];
    const data = new FormData();
    data.append("file", imageFile);
    data.append("api_key", "827175248696299");
    data.append("upload_preset", "ek6xqjmo");
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.REACT_APP_CLOUD_NAME}/upload`,
        data
      )
      .then((res) => {
        console.log(res.data.url);
        localStorage.setItem("image-url", res.data.url);

        reRenderLocalStorage();
      });
  } catch (errors) {
    console.log(errors);
  }
};

export default cloudinaryUpload;
