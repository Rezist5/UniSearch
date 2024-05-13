import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createLanguage } from "../../http/universityAPI";

const CreateLanguage = ({ show, onHide }) => {
    const [value, setValue] = useState('');

    const addLanguage = () => {
        createLanguage({ name: value }).then(data => {
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
                    Добавить язык
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название языка"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addLanguage}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateLanguage;
