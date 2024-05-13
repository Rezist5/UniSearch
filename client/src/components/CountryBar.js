import React, { useState, useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row, Form } from "react-bootstrap";

const CountryBar = observer(() => {
    const { university } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState(""); // State для хранения значения поиска

    const filteredCountries = university.countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Поле поиска */}
            <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-3"
            />

            {/* Полоса с возможностью прокрутки */}
            <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                <Row className="d-flex">
                    {filteredCountries.map(country => {
                        if (!country || typeof country !== 'object' || !('id' in country)) return null; // Проверка на существование country и его свойства id
                        const isSelected = university.selectedCountry && country.id === university.selectedCountry.id;
                        return (
                            <Card
                                style={{ cursor: 'pointer', minWidth: '200px' }} // Минимальная ширина для карточки
                                key={country.id}
                                className="p-3 mr-2 mb-2"
                                onClick={() => university.setSelectedCountry(country)}
                                border={isSelected ? 'danger' : 'light'} // Изменение условия на isSelected
                            >
                                {country.name}
                            </Card>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
});

export default CountryBar;

