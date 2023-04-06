import React, { useState, useEffect } from "react";
import axios from "axios";

interface Photo {
  id: number;
  url: string;
}

const photosTest: Photo[] = [
  {
    id: 1,
    url: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    url: "https://picsum.photos/100/300",
  },
  {
    id: 3,
    url: "https://picsum.photos/400/300",
  },
  {
    id: 4,
    url: "https://picsum.photos/300/300",
  },
  {
    id: 5,
    url: "https://picsum.photos/250/300",
  },
];

const SponsoredProducts: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>(photosTest);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextPhoto();
    }, 2000);

    return () => clearInterval(interval);
  }, [currentPhotoIndex]);

  // const fetchPhotos = async () => {
  //   const response = await axios.get(apiUrl);
  //   setPhotos(response.data);
  // };

  // useEffect(() => {
  //   fetchPhotos();
  // }, []);

  const goToNextPhoto = () => {
    if (currentPhotoIndex === photos.length - 1) {
      setCurrentPhotoIndex(0);
    } else {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentPhotoIndex(index);
  };

  return (
    <div className="image-slider">
      {photos.length > 0 && (
        <>
          <img
            src={photos[currentPhotoIndex].url}
            alt={`Photo ${photos[currentPhotoIndex].id}`}
          />
          <div className="dots">
            {photos.map((photo, index) => (
              <span
                key={photo.id}
                className={`dot ${index === currentPhotoIndex ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SponsoredProducts;
