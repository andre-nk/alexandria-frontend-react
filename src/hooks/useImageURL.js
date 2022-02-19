import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";

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

  const imageToURL = async (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];

      const options = {
        maxSizeMB: 0.25,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(pickedFile, options);
        setProfilePicture(compressedFile);
        setIsValidImage(true);
      } catch (error) {
        setIsValidImage(false);
      }
    } else {
      setIsValidImage(false);
    }
  };

  return {
    isValidImage,
    profilePicture,
    profilePictureUrl,
    imageToURL,
  };
};
