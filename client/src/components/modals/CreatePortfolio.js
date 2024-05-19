
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createPortfolio } from '../../http/portfolioAPI';

const CreatePortfolio = ({ show, onHide, enrolleeId }) => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');


    const addImage = () => {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('description', description);
      formData.append('name', name);
      formData.append('enrolleeId', enrolleeId);

      createPortfolio(formData).then(data => {
        setImage(null);
        setDescription('');
        setName('');
        onHide();
      });
    };
  
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Image to Portfolio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control 
              type="file"
              onChange={e => setImage(e.target.files[0])}
            />
            <Form.Control 
              as="textarea"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Form.Control 
              as="textarea"
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button variant="primary" onClick={addImage}>Add Image</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  export default CreatePortfolio