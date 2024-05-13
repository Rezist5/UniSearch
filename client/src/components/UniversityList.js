import React, { useContext, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import UniversityItem from "./UniversityItem";
import {fetchUniversities, fetchOneCity} from "../http/universityAPI";

const UniversityList = observer(() => {
    const { university } = useContext(Context);
    console.log(university.universities)
    return (
        <Row className="d-flex">
            {university.universities.rows.map(university =>
                <UniversityItem key={university.id} university={university}/>
            )}
        </Row>
    );
});




export default UniversityList;