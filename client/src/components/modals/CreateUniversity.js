import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Badge } from 'react-bootstrap';
import { Context } from '../../index';
import { createUniversity, fetchLanguages, fetchDirections, fetchCountries, fetchCitiesByCountry } from '../../http/universityAPI'; // Импорт функций для получения данных
import { observer } from 'mobx-react-lite';

const CreateUniversity = observer(({ show, onHide }) => {
  const { university } = useContext(Context);
  const [name, setName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedDirection, setSelectedDirection] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedDirections, setSelectedDirections] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [yearOfFoundation, setYearOfFoundation] = useState('');
  const [numberOfStudents, setNumberOfStudents] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // Получение данных о языках и установка их в состояние при монтировании компонента
    fetchLanguages().then(languages => {
      university.setLanguages(languages);
    });
    
    // Получение данных о направлениях и установка их в состояние при монтировании компонента
    fetchDirections().then(directions => {
      university.setDirections(directions);
    });

    // Получение списка стран и установка их в состояние
    fetchCountries().then(countries => {
      setCountries(countries);
    });
  }, [university]); // Зависимость от хранилища, чтобы useEffect вызывался при его изменении

  // Обработчик выбора страны
  const handleCountryChange = (countryId) => {
    setSelectedCountry(countryId);
    // Загрузка городов для выбранной страны
    fetchCitiesByCountry(countryId).then(cities => {
      setCities(cities);
    });
  };

  const addUniversity = () => {
    const universityData = {
      name,
      languages: selectedLanguages,
      directions: selectedDirections,
      country: selectedCountry,
      cityId: selectedCity,
      YearOfFoundation: yearOfFoundation,
      NumberOfStudents: numberOfStudents,
      price,
    };
    createUniversity(universityData).then(() => {
      onHide();
    });
  };

  const selectedLanguageNames = selectedLanguages.map(langId => {
    const lang = university.languages.find(language => language.id === langId);
    return lang ? lang.name : '';
  });

  const selectedDirectionNames = selectedDirections.map(dirId => {
    const dir = university.directions.find(direction => direction.id === dirId);
    return dir ? dir.name : '';
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить университет</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUniversityName">
            <Form.Label>Название университета</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите название университета"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formLanguage">
            <Form.Label>Язык обучения</Form.Label>
            <Form.Control
              as="select"
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                setSelectedLanguages([...selectedLanguages, e.target.value]);
              }}
            >
              <option value="">Выберите язык обучения</option>
              {university.languages && university.languages.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </Form.Control>
            <div className="mt-2">
              Выбранные языки: {selectedLanguageNames.join(', ')}
            </div>
          </Form.Group>
          <Form.Group controlId="formDirection">
            <Form.Label>Направление</Form.Label>
            <Form.Control
              as="select"
              value={selectedDirection}
              onChange={(e) => {
                setSelectedDirection(e.target.value);
                setSelectedDirections([...selectedDirections, e.target.value]);
              }}
            >
              <option value="">Выберите направление</option>
              {university.directions && university.directions.map((direction) => (
                <option key={direction.id} value={direction.id}>
                  {direction.name}
                </option>
              ))}
            </Form.Control>
            <div className="mt-2">
              Выбранные направления: {selectedDirectionNames.join(', ')}
            </div>
          </Form.Group>
          <Form.Group controlId="formCountry">
            <Form.Label>Страна</Form.Label>
            <Form.Control
              as="select"
              value={selectedCountry}
              onChange={(e) => handleCountryChange(e.target.value)}
            >
              <option value="">Выберите страну</option>
              {countries && countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formCity">
            <Form.Label>Город</Form.Label>
            <Form.Control
              as="select"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Выберите город</option>
              {cities && cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formYearOfFoundation">
            <Form.Label>Год основания</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите год основания"
              value={yearOfFoundation}
              onChange={(e) => setYearOfFoundation(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formNumberOfStudents">
            <Form.Label>Количество студентов</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите количество студентов"
              value={numberOfStudents}
              onChange={(e) => setNumberOfStudents(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Стоимость обучения</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите стоимость обучения"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={addUniversity}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateUniversity;
