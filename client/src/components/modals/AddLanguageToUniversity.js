import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { addLanguageToUniversity, fetchLanguages } from "../../http/universityAPI";

const AddLanguageToUniversity = ({ show, onHide, university }) => {
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const universityId = university.id;
    useEffect(() => {
        const fetchLanguagesData = async () => {
            try {
                const data = await fetchLanguages();
                setLanguages(data);
            } catch (error) {
                console.error('Failed to fetch languages:', error);
            }
        };
        fetchLanguagesData();
    }, []);

    const addLanguage = () => {
        addLanguageToUniversity(universityId, selectedLanguage).then(data => {
            setSelectedLanguage('');
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
                    Добавить язык к университету
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        as="select"
                        value={selectedLanguage}
                        onChange={e => setSelectedLanguage(e.target.value)}
                    >
                        <option value="">Выберите язык</option>
                        {languages.map(language => (
                            <option key={language.id} value={language.id}>{language.name}</option>
                        ))}
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addLanguage}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddLanguageToUniversity;
