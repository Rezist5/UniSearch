import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { addDirectionToUniversity, fetchDirections } from "../../http/universityAPI";

const AddDirectionToUniversity = ({ show, onHide, university }) => {
    const [selectedDirection, setSelectedDirection] = useState('');
    const [directions, setDirections] = useState([]);
    const universityId = university.id;
    useEffect(() => {
        const fetchDirectionsData = async () => {
            const directionsData = await fetchDirections();
            setDirections(directionsData);
        };
        fetchDirectionsData();
    }, []);

    const addDirection = () => {
        addDirectionToUniversity(universityId, selectedDirection).then(data => {
            setSelectedDirection('');
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
                    Добавить направление к университету
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        as="select"
                        value={selectedDirection}
                        onChange={e => setSelectedDirection(e.target.value)}
                    >
                        <option value="">Выберите направление</option>
                        {directions.map(direction => (
                            <option key={direction.id} value={direction.id}>{direction.name}</option>
                        ))}
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDirection}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddDirectionToUniversity;
