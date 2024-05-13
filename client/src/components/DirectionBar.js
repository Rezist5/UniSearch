import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row } from "react-bootstrap";

const DirectionBar = observer(() => {
    const { university } = useContext(Context);
    return (
        <Row className="d-flex">
            {university.directions.map(direction =>
                <Card
                    style={{ cursor: 'pointer' }}
                    key={direction.id}
                    className="p-3"
                    onClick={() => university.setSelectedDirection(direction)}
                    border={university.selectedDirections && direction.id === university.selectedDirections.id ? 'danger' : 'light'}
                >
                    {direction.name}
                </Card>
            )}
        </Row>
    );
});

export default DirectionBar;
