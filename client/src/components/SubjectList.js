import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { fetchSubjectsByUniversity } from '../http/universityAPI';

const SubjectList = ({ universityId }) => {
  const [subjects, setSubjects] = useState([]);
  
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const fetchedSubjects = await fetchSubjectsByUniversity(universityId);
        setSubjects(fetchedSubjects);
      } catch (error) {
        setSubjects(null);
      }
    };

    fetchSubjects();
  }, [universityId]);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
         Предмет
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {subjects?.map((subject, index) => (
          <Dropdown.Item key={index}>{subject.name}  {subject.description}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SubjectList;
