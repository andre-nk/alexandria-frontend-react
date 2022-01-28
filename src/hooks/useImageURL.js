import { useState, useEffect } from "react";

export const useImageURL = () => {
  const [isValidImage, setIsValidImage] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  //profile picture methods
  useEffect(() => {
    if (!profilePicture) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setProfilePictureUrl(fileReader.result);
    };
    fileReader.readAsDataURL(profilePicture);
  }, [profilePicture]);

  const imageToURL = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setProfilePicture(pickedFile);
      setIsValidImage(true);
    } else {
      setIsValidImage(false);
    }
  };

  return {
      isValidImage,
      profilePicture,
      profilePictureUrl,
      imageToURL
  }
};
