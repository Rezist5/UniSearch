import React, { useState, useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { sendRequest } from "../../http/requestAPI";
import { Context } from "../../index";

const SendRequest = ({ show, onHide, university }) => {
    const [description, setDescription] = useState('');
    const universityId = university.id;
    const { user } = useContext(Context);
    const enrolleeId = user.user.id;
    
    const submitRequest = () => {
        sendRequest(universityId, enrolleeId, description).then(data => {
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
                    Отправить запрос
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder={"Описание запроса"}
                        className="mt-3"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={submitRequest}>Отправить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SendRequest;
