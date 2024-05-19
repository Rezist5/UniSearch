import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { fetchImagesByUniversity } from '../http/universityAPI';

const UniImage = ({ universityId }) => {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await fetchImagesByUniversity(universityId);
        console.log(fetchedImages)
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching university images:', error);
      }
    };

    fetchImages();
  }, [universityId]);

  return (
    <Carousel>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={`${process.env.REACT_APP_API_URL}${image.image}`}
            alt={`Slide ${index + 1}`}
            style={{ maxWidth: '500px', maxHeight: '500px', margin: '0 auto' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default UniImage;
