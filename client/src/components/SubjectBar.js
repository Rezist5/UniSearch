import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const SubjectBar = observer(() => {
    const {university} = useContext(Context)
    return (
        <ListGroup>
            {university.subjects.map(subject =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={subject.id === university.selectedSubjects.id}
                    onClick={() => university.setSelectedSubject(subject)}
                    key={subject.id}
                >
                    {subject.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default SubjectBar;