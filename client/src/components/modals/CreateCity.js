import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createCity, fetchCountries } from "../../http/universityAPI";

const CreateCity = ({ show, onHide }) => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [cityName, setCityName] = useState('');

    useEffect(() => {
        const fetchCountriesData = async () => {
            const countriesData = await fetchCountries();
            setCountries(countriesData);
        };
        fetchCountriesData();
    }, []);

    const addCity = () => {
        if (selectedCountry && cityName) {
            createCity({ name: cityName, countryId: selectedCountry }).then(data => {
                setCityName('');
                setSelectedCountry('');
                onHide();
            });
        } else {
            alert("Выберите страну и введите название города");
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
                    Добавить город
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCountry">
                        <Form.Label>Страна</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedCountry}
                            onChange={e => setSelectedCountry(e.target.value)}
                        >
                            <option value="">Выберите страну</option>
                            {countries.map(country => (
                                <option key={country.id} value={country.id}>{country.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formCity">
                        <Form.Label>Название города</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название города"
                            value={cityName}
                            onChange={e => setCityName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addCity}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCity;
