import React, { useState, useEffect } from 'react';
import { Col, Card, Image } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom'; 
import star from '../assets/star.png';
import { fetchOneCity } from '../http/universityAPI';
import { UNIVERSITY_ROUTE } from '../utils/consts';

const UniversityItem = ({ university }) => {
    const navigate = useNavigate();
    const [cityName, setCityName] = useState('');

    useEffect(() => {
      fetchOneCity(university.cityId)
        .then(cityData => {
          setCityName(cityData.name);
        })
        .catch(error => {
          console.error('Ошибка:', error);
        });
    }, [university.cityId]);

    return (
      <Col md={3} className="mt-3" onClick={() => navigate(UNIVERSITY_ROUTE + '/' + university.id)}>
        <Card style={{ width: 150, cursor: 'pointer' }} border="light">
          <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
            <div>{university.name}</div>
            <div className="d-flex align-items-center">
              <div>{university.rating}</div>
              <Image width={18} height={18} src={star} alt="Star" /> 
            </div>
          </div>
          <div>Year of Foundation: {university.YearOfFoundation}</div> 
          <div>Number of Students: {university.NumberOfStudents}</div> 
          <div>City: {cityName}</div>
          <div>Price: {university.price}</div> 
        </Card>
      </Col>
    );
  };
export default UniversityItem;
