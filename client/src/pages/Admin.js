import React , {useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CreateCity from '../components/modals/CreateCity';
import CreateDirection from '../components/modals/CreateDirection';
import CreateLanguage from '../components/modals/CreateLanguage';
import CreateUniversity from '../components/modals/CreateUniversity';

const Admin = () => {
    const [showCreateCityModal, setShowCreateCityModal] = useState(false);
  const [showCreateDirectionModal, setShowCreateDirectionModal] = useState(false);
  const [showCreateLanguageModal, setShowCreateLanguageModal] = useState(false);
  const [showCreateUniversityModal, setShowCreateUniversityModal] = useState(false);
  return (
    <Container>
        <Row className="mb-3">
            <Col>
            <h2>Admin Panel</h2>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col>
            <h4>Create City</h4>
            <Button variant="primary" onClick={() => setShowCreateCityModal(true)}>Create City</Button>
            <CreateCity show={showCreateCityModal} onHide={() => setShowCreateCityModal(false)} />
            </Col>
            <Col>
            <h4>Create Direction</h4>
            <Button variant="primary" onClick={() => setShowCreateDirectionModal(true)}>Create Direction</Button>
            <CreateDirection show={showCreateDirectionModal} onHide={() => setShowCreateDirectionModal(false)} />
            </Col>
        </Row>
        <Row className="mb-3">
            <Col>
            <h4>Create Language</h4>
            <Button variant="primary" onClick={() => setShowCreateLanguageModal(true)}>Create Language</Button>
            <CreateLanguage show={showCreateLanguageModal} onHide={() => setShowCreateLanguageModal(false)} />
            </Col>
        </Row>
        <Row className="mb-3">
            <Col>
            <h4>Create University</h4>
            <Button variant="primary" onClick={() => setShowCreateUniversityModal(true)}>Create University</Button>
            <CreateUniversity show={showCreateUniversityModal} onHide={() => setShowCreateUniversityModal(false)} />
            </Col>
        </Row>
    </Container>

  );
};

export default Admin;
