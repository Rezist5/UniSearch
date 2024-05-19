import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createRepresentative } from "../../http/userAPI";

const CreateRepresentative = ({ show, onHide, university }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const universityId = university.id;

    const addRepresentative = () => {
        createRepresentative( email, password, fullName, universityId ).then(data => {
            setEmail('');
            setPassword('');
            setFullName('');
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
                    Добавить представителя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={"Email представителя"}
                    />
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder={"Пароль представителя"}
                        type="password"
                        className="mt-3"
                    />
                    <Form.Control
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder={"Полное имя представителя"}
                        className="mt-3"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addRepresentative}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateRepresentative;