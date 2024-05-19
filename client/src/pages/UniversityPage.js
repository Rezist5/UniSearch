import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewList from '../components/ReviewList';
import CreateScholarship from '../components/modals/CreateScholarship';
import CreateSubject from '../components/modals/CreateSubject';
import AddImageToUniversityModal from '../components/modals/AddImageToUniversityModal';
import AddDirectionToUniversity  from '../components/modals/AddDirectionToUniversity';
import AddLanguageToUniversity  from '../components/modals/AddLanguageToUniversity';
import SendRequest from '../components/modals/SendRequest';
import UpdateUniversity from '../components/modals/UpdateUniversity';
import { fetchOneUniversity, fetchOneCity } from '../http/universityAPI';
import { getRepresentativeInfo } from '../http/userAPI';
import { Context } from "../index";
import UniImage from '../components/UniImages';
import ScholarshipList from '../components/ScholarshipList';
import SubjectList from '../components/SubjectList';
import ReviewForm from '../components/ReviewForm';
import CreateRepresentative from '../components/modals/CreateRepresentative';
import { Button, Container, Row, Col } from 'react-bootstrap';

const UniversityPage = () => {
  
  const [university, setUniversity] = useState({ info: [] });
  const [showScholarshipModal, setShowScholarshipModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showDirectionModal, setShowDirectionModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateRepresentativeModal, setShowCreateRepresentativeModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);


  const { id } = useParams();
  const { user } = useContext(Context);
  const universityId = id;
  const [repInfo, setRepInfo] = useState(null);
  
  const [cityName, setCityName] = useState('');
  useEffect(() => {
    // Загрузка информации об университете
    fetchOneUniversity(universityId)
      .then(data =>     setUniversity(data))      
      .catch(error => console.error('Error fetching university:', error));

    const loadRepInfo = async () => {
      
      try {
        
        const repInfoData = await getRepresentativeInfo(user.user.id);
        setRepInfo(repInfoData);
      } catch (error) {
        console.error('Error fetching representative info:', error);
      }
    };

    if (user.user.role === 'REPRESENTATIVE') {
      
      loadRepInfo();
    }
  }, [universityId, user.user.id, user.user.role]);

  console.log(university)
  useEffect(() => {
    if (university.cityId) {
      fetchOneCity(university.cityId)
        .then(cityData => {
          setCityName(cityData.name);
        })
        .catch(error => {
          console.error('Ошибка:', error);
        });
    }
  }, [university.cityId]);
  
  const handleShowScholarshipModal = () => setShowScholarshipModal(true);
  const handleCloseScholarshipModal = () => setShowScholarshipModal(false);
  const handleShowSubjectModal = () => setShowSubjectModal(true);
  const handleCloseSubjectModal = () => setShowSubjectModal(false);
  const handleShowImageModal = () => setShowImageModal(true);
  const handleCloseImageModal = () => setShowImageModal(false);
  const handleShowDirectionModal = () => setShowDirectionModal(true);
  const handleCloseDirectionModal = () => setShowDirectionModal(false);
  const handleShowLanguageModal = () => setShowLanguageModal(true);
  const handleCloseLanguageModal = () => setShowLanguageModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleShowRepresentativeModal = () => setShowCreateRepresentativeModal(true);
  const handleCloseRepresentativeModal = () => setShowCreateRepresentativeModal(false);

  const handleShowSendModal = () => setShowSendModal(true);
  const handleCloseSendModal = () => setShowSendModal(false);
  
  
  let date = new Date(university.YearOfFoundation);
  let year = date.getFullYear();
  return (   
<Container fluid>
      <Row>
        {/* University Information Section */}
        <Col md={6}>
          <h1>{university.name}</h1>
          <p>City: {cityName}</p>
          <p>Rating: {university.rating}</p>
          <p>Year of Foundation: {year}</p>
          <p>Number of Students: {university.NumberOfStudents}</p>

          {/* Action Buttons */}
          {(user.user.role === "ADMIN" || (repInfo && repInfo.UniversityId === university.id)) && (
            <>
              <Button variant="primary" onClick={handleShowScholarshipModal}>Create Scholarship</Button>
              <Button variant="primary" onClick={handleShowSubjectModal}>Create Subject</Button>
              <Button variant="primary" onClick={handleShowImageModal}>Add Images</Button>
              <Button variant="primary" onClick={handleShowDirectionModal}>Add Direction</Button>
              <Button variant="primary" onClick={handleShowLanguageModal}>Add Language</Button>
              <Button variant="primary" onClick={handleShowUpdateModal}>Update University</Button>
              {user.user.role === "ADMIN" && <Button variant="primary" onClick={handleShowRepresentativeModal}>Create Representative</Button>}
            </>
          )}
          {(user.user.role === "ENROLLEE" || (repInfo && repInfo.UniversityId === university.id)) && (
            <>
            <Button variant="primary" onClick={handleShowSendModal}>Send Request</Button>
            </>
          )}
          <Row>
            <Col md={6}>
              <ScholarshipList universityId={universityId} />
            </Col>
            <Col md={6}>
              <SubjectList universityId={universityId} />
            </Col>
          </Row>
        </Col>

        {/* University Images Section */}
        <Col md={6}>
          <UniImage universityId={universityId} />
        </Col>
      </Row>

      {/* Modals */}
      <UpdateUniversity show={showUpdateModal} onHide={handleCloseUpdateModal} university={university} />
      <CreateScholarship show={showScholarshipModal} onHide={handleCloseScholarshipModal} university={university} />
      <CreateSubject show={showSubjectModal} onHide={handleCloseSubjectModal} universityId={universityId} />
      <AddImageToUniversityModal show={showImageModal} onHide={handleCloseImageModal} university={university} />
      <AddDirectionToUniversity show={showDirectionModal} onHide={handleCloseDirectionModal} university={university} />
      <AddLanguageToUniversity show={showLanguageModal} onHide={handleCloseLanguageModal} university={university} />
      <CreateRepresentative show={showCreateRepresentativeModal} onHide={handleCloseRepresentativeModal} university={university} />
      <SendRequest show={showSendModal} onHide={handleCloseSendModal} university={university} />

      
      {/* Reviews */}
      <Row>
        <Col md={12}>
          <h2>Reviews</h2>
          <ReviewForm universityId={universityId} />
          <ReviewList universityId={universityId} />
        </Col>
      </Row>
    </Container>
  );
};

export default UniversityPage;
