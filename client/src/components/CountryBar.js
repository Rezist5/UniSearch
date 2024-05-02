import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row } from "react-bootstrap";

const CountryBar = observer(() => {
    const { university } = useContext(Context);

    return (
        <Row className="d-flex">
            {university.countries.map(country =>
                <Card
                    style={{ cursor: 'pointer' }}
                    key={country.id}
                    className="p-3"
                    onClick={() => university.setSelectedCountry(country)}
                    border={country.id === university.selectedCountry.id ? 'danger' : 'light'}
                >
                    {country.name}
                </Card>
            )}
        </Row>
    );
});

export default CountryBar;