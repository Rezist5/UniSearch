import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { createDirection, fetchDirections } from "../../http/universityAPI";
import UniversityStore from '../../store/UniversityStore';


const CreateDirection = ({ show, onHide }) => {
    const [value, setValue] = useState('');
    
    const addDirection = async () => {
        try {
            const data = await createDirection({ name: value });
            setValue('');
            onHide();
            const updatedDirections = await fetchDirections(); // Добавляем await здесь
            UniversityStore.setDirections(updatedDirections);
        } catch (error) {
            console.error('Error adding direction:', error);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить направление
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название направления"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDirection}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDirection;
