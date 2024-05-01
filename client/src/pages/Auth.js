import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState(''); // Add state for Fullname
    const [age, setAge] = useState(''); // Add state for age
    const [school, setSchool] = useState(''); // Add state for school
    const [cityId, setCityId] = useState(''); // Add state for cityId
    const [grade, setGrade] = useState(''); // Add state for grade

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password, fullname, age, school, cityId, grade); // Pass additional data for registration
            }
            user.setUser(user);
            user.setIsAuth(true);
            history.push(MAIN_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    {!isLogin && ( // Render additional inputs for registration only
                        <>
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваше полное имя..."
                                value={fullname}
                                onChange={e => setFullname(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш возраст..."
                                value={age}
                                onChange={e => setAge(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите вашу школу..."
                                value={school}
                                onChange={e => setSchool(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ID вашего города..."
                                value={cityId}
                                onChange={e => setCityId(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш класс/курс..."
                                value={grade}
                                onChange={e => setGrade(e.target.value)}
                            />
                        </>
                    )}
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ? (
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                        ) : (
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        )}
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;