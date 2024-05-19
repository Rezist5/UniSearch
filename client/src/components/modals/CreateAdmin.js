import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createAdmin, createRepresentative } from "../../http/userAPI";

const CreateAdmin = ({ show, onHide }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Fullname, setFullName] = useState('');

    const addAdmin = () => {
        createAdmin(email, password, Fullname ).then(data => {
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
                    Добавить администратора
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={"Email администратора"}
                    />
                    <Form.Control
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder={"Пароль администратора"}
                        type="password"
                        className="mt-3"
                    />
                    <Form.Control
                        value={Fullname}
                        onChange={e => setFullName(e.target.value)}
                        placeholder={"Полное имя администратора"}
                        className="mt-3"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addAdmin}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateAdmin