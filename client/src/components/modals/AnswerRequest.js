import React, { useState, useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { answerRequest } from "../../http/requestAPI";
import { Context } from "../../index";

const AnswerModal = ({ show, onHide, request }) => {
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('accepted'); 
    const requestId = request.id;
    const { user } = useContext(Context);
    
    const submitAnswer = () => {
        answerRequest(requestId, status, description).then(data => {
            setDescription('');
            setStatus('accepted');
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
                    Ответить на запрос
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        as="select"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="mt-3"
                    >
                        <option value="accepted">Принять</option>
                        <option value="rejected">Отклонить</option>
                    </Form.Control>
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder={"Описание ответа"}
                        className="mt-3"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={submitAnswer}>Отправить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AnswerModal;
