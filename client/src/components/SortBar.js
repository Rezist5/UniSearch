import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row } from "react-bootstrap";

const SortBar = observer(() => {
    const { university } = useContext(Context);

    const handleSort = (order) => {
        university.setSortOrder(order);
    };

    return (
        <Row className="d-flex">
            <Card
                style={{ cursor: 'pointer' }}
                className="p-3"
                onClick={() => handleSort('asc')}
                border={university.sortOrder === 'asc' ? 'danger' : 'light'}
            >
                Ascending
            </Card>
            <Card
                style={{ cursor: 'pointer' }}
                className="p-3"
                onClick={() => handleSort('desc')}
                border={university.sortOrder  === 'desc' ? 'danger' : 'light'}
            >
                Descending
            </Card>
        </Row>
    );
});

export default SortBar;
