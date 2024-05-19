import React, { useState } from 'react';
import { Button, Form, Modal} from "react-bootstrap";
import { addImageToUniversity } from "../../http/universityAPI";

const AddImageToUniversityModal = ({ show, onHide, university }) => {
    const [image, setImage] = useState(null);
    const universityId = university.id;

    
    const addImage = () => {
        console.log(image)
        addImageToUniversity(universityId, image).then(data => {
            setImage(null);
            onHide();
        });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить изображение к университету
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Control 
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addImage}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddImageToUniversityModal;
