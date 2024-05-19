import React, { useState, useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row, Form } from "react-bootstrap";

const DirectionBar = observer(() => {
    const { university } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState(""); // State для хранения значения поиска

    const filteredDirections = university.directions.filter(direction =>
        direction.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <div style={{ whiteSpace: 'nowrap', maxWidth: '600px', maxHeight: '400px'}}>
                <Row className="d-flex" style={{ border: '1px solid #ccc' }}>
                    {filteredDirections.map(direction => {
                        if (!direction || typeof direction !== 'object' || !('id' in direction)) return null; // Проверка на существование direction и его свойства id
                        const isSelected = university.selectedDirection && direction.id === university.selectedDirection.id;
                        return (
                            <Card
                                style={{ cursor: 'pointer', minWidth: '200px', }} // Добавлен контур
                                key={direction.id}
                                className="p-3 mr-2 mb-2"
                                onClick={() => university.setSelectedDirection(direction)}
                                border={isSelected ? 'danger' : 'light'} // Изменение условия на isSelected
                            >
                                {direction.name}
                            </Card>
                        );
                    })}
                </Row>
            </div>

        </div>
    );
});

export default DirectionBar;
