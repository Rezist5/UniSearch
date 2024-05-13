import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createSubject } from "../../http/universityAPI";

const CreateSubject = ({ show, onHide, universityId }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');

    const addSubject = () => {
        createSubject({ name, type, universityId, description }).then(data => {
            setName('');
            setType('');
            setDescription('');
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
                    Добавить предмет
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Введите название предмета"
                    />
                    <Form.Control
                        value={type}
                        onChange={e => setType(e.target.value)}
                        placeholder="Введите тип предмета"
                    />
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Введите описание предмета"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addSubject}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateSubject;
