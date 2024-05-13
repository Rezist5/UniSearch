import React, { useContext, useState, useEffect } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchCountries, fetchCitiesByCountry } from '../http/universityAPI';

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [age, setAge] = useState('');
    const [school, setSchool] = useState('');
    const [countryId, setCountryId] = useState('');
    const [cityId, setCityId] = useState('');
    const [grade, setGrade] = useState('');
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = async () => {
        try {
            fetchCountries(countryId).then(data => setCountries(data))
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const getCities = async (countryId) => {
        try { 
            fetchCitiesByCountry(countryId).then(data => setCities(data))
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const handleCountryChange = (e) => {
        const selectedCountryId = e.target.value;
        setCountryId(selectedCountryId);
        getCities(selectedCountryId);
    };

    const click = async () => {
        try {
            
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password, fullname, age, school, cityId, grade);
            }
            console.log(data);
            user.setUser(data.user);
            user.setIsAuth(true);
            navigate(MAIN_ROUTE);
        } catch (e) {
            alert(e);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
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
                    {!isLogin && (
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
                                as="select"
                                className="mt-3"
                                value={countryId}
                                onChange={handleCountryChange}
                            >
                                <option value="">Выберите страну...</option>
                                {countries.map(country => (
                                    <option key={country.id} value={country.id}>{country.name}</option>
                                ))}
                            </Form.Control>
                            <Form.Control
                                as="select"
                                className="mt-3"
                                value={cityId}
                                onChange={e => setCityId(e.target.value)}
                            >
                                <option value="">Выберите город...</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </Form.Control>
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
