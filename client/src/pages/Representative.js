import React, { useContext, useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { fetchRequestsByUniversityId } from '../http/requestAPI';
import { Context } from "../index";
import AnswerRequest from '../components/modals/AnswerRequest'; 
import { getRepresentativeInfo } from '../http/userAPI';

const RepresentativePage = () => {
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [requests, setRequests] = useState([]); 
  const [universityId, setUniversityId] = useState(null); 
  const { user } = useContext(Context);

  
  const loadRepInfo = async () => {
      
    try {
      
      const repInfoData = await getRepresentativeInfo(user.user.id);
      setUniversityId(repInfoData.UniversityId);
    } catch (error) {
      console.error('Error fetching representative info:', error);
    }
  };
  loadRepInfo();
  
  useEffect(() => {
    fetchRequestsByUniversityId(universityId)
      .then(data => {
        console.log(data)
        setRequests(data); 
      })
      .catch(error => console.error('Error fetching requests:', error));
  }, [universityId]);

  const handleShowAnswerModal = () => setShowAnswerModal(true);
  const handleCloseAnswerModal = () => setShowAnswerModal(false);
  const requestsArray = Object.values(requests);
  
  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <h1>Students Requests</h1>
          <div style={{ display: 'flex'}}>
            {requestsArray.map((request, index) => (
              <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                <h3>{request.name}</h3>
                <p>{request.description}</p>
                <p>{request.status}</p>
                <Button variant="primary" onClick={handleShowAnswerModal}>Answer</Button>
                <AnswerRequest show={showAnswerModal} onHide={handleCloseAnswerModal} request= {request}/>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      
    </Container>
  );
};

export default RepresentativePage;
