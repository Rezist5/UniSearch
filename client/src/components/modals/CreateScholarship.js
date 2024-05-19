import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createScholarship } from "../../http/universityAPI";

const CreateScholarship = ({ show, onHide, university }) => {
    const [name, setName] = useState('');
    const [requirements, setRequirements] = useState('');
    const [value, setValue] = useState('');
    const universityId = university.id;
    
    const addScholarship = () => {
        createScholarship({ name, requirements, value , universityId }).then(data => {
            setName('');
            setRequirements('');
            setValue('');
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
                    Добавить стипендию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Название стипендии"}
                    />
                    <Form.Control
                        value={requirements}
                        onChange={e => setRequirements(e.target.value)}
                        placeholder={"Требования к стипендии"}
                        className="mt-3"
                    />
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Значение стипендии"}
                        type="number"
                        className="mt-3"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addScholarship}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateScholarship;
