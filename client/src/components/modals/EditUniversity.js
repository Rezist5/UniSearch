import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { editUniversity } from "../../http/universityAPI";
import { fetchCountries, fetchCitiesByCountry } from "../../http/cityAPI";

const EditUniversity = ({ show, onHide, university }) => {
    const [editedUniversity, setEditedUniversity] = useState({
        name: university.name,
        cityId: university.cityId,
        yearOfFoundation: university.yearOfFoundation,
        numberOfStudents: university.numberOfStudents
    });
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState('');

    useEffect(() => {
        fetchCountries().then(data => {
            setCountries(data);
        });
    }, []);

    useEffect(() => {
        if (selectedCountryId) {
            fetchCitiesByCountry(selectedCountryId).then(data => {
                setCities(data);
            });
        }
    }, [selectedCountryId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUniversity(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCountryChange = (e) => {
        const countryId = e.target.value;
        setSelectedCountryId(countryId);
        setEditedUniversity(prevState => ({
            ...prevState,
            cityId: '' 
        }));
    };

    const saveChanges = () => {
        editUniversity(university.id, editedUniversity).then(data => {
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
                    Редактировать университет
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Название университета</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={editedUniversity.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCountry">
                        <Form.Label>Страна</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedCountryId}
                            onChange={handleCountryChange}
                        >
                            <option value="">Выберите страну</option>
                            {countries.map(country => (
                                <option key={country.id} value={country.id}>{country.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formCity">
                        <Form.Label>Город</Form.Label>
                        <Form.Control
                            as="select"
                            name="cityId"
                            value={editedUniversity.cityId}
                            onChange={handleChange}
                            disabled={!selectedCountryId}
                        >
                            <option value="">Выберите город</option>
                            {cities.map(city => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formYearOfFoundation">
                        <Form.Label>Год основания</Form.Label>
                        <Form.Control
                            type="text"
                            name="yearOfFoundation"
                            value={editedUniversity.yearOfFoundation}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNumberOfStudents">
                        <Form.Label>Количество студентов</Form.Label>
                        <Form.Control
                            type="number"
                            name="numberOfStudents"
                            value={editedUniversity.numberOfStudents}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={saveChanges}>Сохранить изменения</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUniversity;
