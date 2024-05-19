import React, { useContext, useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { fetchPortfolioByEnrolleeId } from '../http/portfolioAPI';
import { Context } from "../index";
import CreatePortfolio from '../components/modals/CreatePortfolio';

const PortfolioPage = () => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [portfolios, setPortfolios] = useState([]); 
  const { user } = useContext(Context);
  const enrolleeId = user.user.id;

  useEffect(() => {
    fetchPortfolioByEnrolleeId(enrolleeId)
      .then(data => {
        setPortfolios(data); 
      })
      .catch(error => console.error('Error fetching student:', error));
  }, [enrolleeId]);

  const handleShowImageModal = () => setShowImageModal(true);
  const handleCloseImageModal = () => setShowImageModal(false);
  console.log(portfolios);
  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <h1>Your Portfolio</h1>
          <Button variant="primary" onClick={handleShowImageModal}>Add Image</Button>
          <div style={{ display: 'flex'}}>
            {portfolios.map((portfolio, index) => (
              <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                <h3>{portfolio.name}</h3>
                <p>{portfolio.description}</p>
                <img src={`${process.env.REACT_APP_API_URL}${portfolio.image}`} style={{ maxWidth: '500px', maxHeight: '500px', margin: '0 auto' }} alt={portfolio.title} />
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <CreatePortfolio show={showImageModal} onHide={handleCloseImageModal} enrolleeId= {enrolleeId}/>
    </Container>
  );
};

export default PortfolioPage;
