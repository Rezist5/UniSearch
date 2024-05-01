import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const BrandBar = observer(() => {
    const {university} = useContext(Context)

    return (
        <Row className="d-flex">
            {university.directions.map(direction =>
                <Card
                    style={{cursor:'pointer'}}
                    key={direction.id}
                    className="p-3"
                    onClick={() => device.setSelectedBrand(direction)}
                    border={direction.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    {direction.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;