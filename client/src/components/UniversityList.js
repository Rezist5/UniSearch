import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import UniversityItem from "./UniversityItem";

const UniversityList = observer(() => {
    const {university} = useContext(Context)

    return (
        <Row className="d-flex">
            {university.universities.map(university =>
                <UniversityItem key={university.id} university={university}/>
            )}
        </Row>
    );
});

export default UniversityList;