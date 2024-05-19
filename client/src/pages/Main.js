import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DirectionBar from "../components/DirectionBar";
import CountryBar from "../components/CountryBar";
import SubjectBar from "../components/SubjectBar";
import SortBar from '../components/SortBar';
import '../App.css';

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
        fetchUniversities(null).then(data => {
            console.log(data);
            university.setUniversities(data)
            university.setTotalCount(data.count)
            
        })
    }, [])

    useEffect(() => {
        if (university.selectedDirections || university.selectedSubjects || university.selectedCountries) {
            const filters = {
                directionId: university.selectedDirections.id,
                subjectId: university.selectedSubjects.id,
                countryId: university.selectedCountries.id,
                sortBy: university.sortBy, 
                sortOrder: university.sortOrder,
                
            };
            console.log(filters)
            fetchUniversities(filters).then(data => {
                university.setUniversities(data);
                university.setTotalCount(data.count);
            });
        }
    }, [university.selectedDirections, university.selectedSubjects, university.selectedCountries, university.page, university.sortBy, university.sortOrder]);
    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <DirectionBar/>
                    <SortBar/>
                    <CountryBar />
                </Col>
                <Col md={9}>
                    
                    <UniversityList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Main;