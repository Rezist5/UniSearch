import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DirectionBar from "../components/DirectionBar";
import CountryBar from "../components/CountryBar";
import SubjectBar from "../components/SubjectBar";

import UniversityList from "../components/UniversityList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCountries, fetchDirections, fetchSubjects, fetchUniversities} from "../http/universityAPI";
import Pages from "../components/Pages";

const Main = observer(() => {
    const {university} = useContext(Context)

    useEffect(() => {
        fetchCountries().then(data => university.setCountries(data))
        fetchDirections().then(data => university.setDirections(data))
        fetchSubjects().then(data => university.setSubjects(data))
        fetchUniversities(null, null, 1, 2).then(data => {
            university.setUniversities(data.rows)
            university.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchUniversities(university.selectedDirections.id, university.selectedSubjects.id, university.idselectedCountries.id,university.page, 2).then(data => {
            university.setUniversities(data.rows)
            university.setTotalCount(data.count)
        })
    }, [university.page, university.selectedType, university.selectedBrand,])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <DirectionBar/>
                </Col>
                <Col md={9}>
                    <SubjectBar/>
                    <CountryBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Main;