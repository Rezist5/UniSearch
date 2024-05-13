import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { fetchScholarshipsByUniversity } from '../http/universityAPI';

const ScholarshipList = ({ university }) => {
  const [scholarships, setScholarships] = useState([]);
  const universityId = university.id;
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const fetchedScholarships = await fetchScholarshipsByUniversity(universityId);
        setScholarships(fetchedScholarships);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      }
    };

    fetchScholarships();
  }, [universityId]);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
         Scholarship
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {scholarships.map((scholarship, index) => (
          <Dropdown.Item key={index}>{scholarship.name}  {scholarship.requerments}  {scholarship.value}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ScholarshipList;
