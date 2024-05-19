import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Badge } from 'react-bootstrap';
import { Context } from '../../index';
import { fetchLanguages, fetchDirections, fetchCountries, fetchCitiesByCountry, fetchOneUniversity, fetchUniversityLanguages, fetchUniversityDirections, fetchCountryByCityId, updateUniversity } from '../../http/universityAPI';
import { observer } from 'mobx-react-lite';

const UpdateUniversity = observer(({ show, onHide, university }) => {
  const { university: universityStore } = useContext(Context);
  const [name, setName] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedDirections, setSelectedDirections] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [yearOfFoundation, setYearOfFoundation] = useState('');
  const [numberOfStudents, setNumberOfStudents] = useState(0);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    fetchLanguages().then(languages => {
      universityStore.setLanguages(languages);
    });
  
    fetchDirections().then(directions => {
      universityStore.setDirections(directions);
    });
  
    fetchCountries().then(countries => {
      setCountries(countries);
    });
  
    if (university) {
      setName(university.name);
      setSelectedCity(university.cityId);
      setYearOfFoundation(university.yearOfFoundation);
      setNumberOfStudents(university.numberOfStudents);
      setPrice(university.price);
  
      if (university.id) {
        fetchUniversityLanguages(university.id).then(languages => {
          setSelectedLanguages(languages.map(lang => lang.id));
        });
  
        fetchUniversityDirections(university.id).then(directions => {
          setSelectedDirections(directions.map(dir => dir.id));
        });
  
        if (university.cityId) {
          fetchCountryByCityId(university.cityId).then(country => {
            setSelectedCountry(country.id);
          });
        }
      }
    }
  }, [university, universityStore]);
  

  useEffect(() => {
    if (selectedCountry) {
      fetchCitiesByCountry(selectedCountry).then(cities => {
        setCities(cities);
      });
    }
  }, [selectedCountry]);

  const handleLanguageChange = (e) => {
    const languageId = e.target.value;
    if (!selectedLanguages.includes(languageId)) {
      setSelectedLanguages([...selectedLanguages, languageId]);
    }
  };

  const handleDirectionChange = (e) => {
    const directionId = e.target.value;
    if (!selectedDirections.includes(directionId)) {
      setSelectedDirections([...selectedDirections, directionId]);
    }
  };

  const removeLanguage = (languageId) => {
    setSelectedLanguages(selectedLanguages.filter(id => id !== languageId));
  };

  const removeDirection = (directionId) => {
    setSelectedDirections(selectedDirections.filter(id => id !== directionId));
  };

  const updateUniversityData = () => {
    const universityData = {
      name,
      languages: selectedLanguages,
      directions: selectedDirections,
      country: selectedCountry,
      cityId: selectedCity,
      yearOfFoundation: yearOfFoundation,
      numberOfStudents: numberOfStudents,
      price,
    };
    updateUniversity(university.id, universityData).then(() => {
      onHide();
    });
  };

  const selectedLanguageNames = selectedLanguages.map(langId => {
    const lang = universityStore.languages.find(language => language.id === langId);
    return lang ? lang.name : '';
  });

  const selectedDirectionNames = selectedDirections.map(dirId => {
    const dir = universityStore.directions.find(direction => direction.id === dirId);
    return dir ? dir.name : '';
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Обновить университет</Modal.Title>
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
              onChange={handleLanguageChange}
            >
              <option value="">Выберите язык обучения</option>
              {universityStore.languages && universityStore.languages.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </Form.Control>
            <div className="mt-2">
              Выбранные языки: {selectedLanguageNames.join(', ')}
              {selectedLanguages.map(langId => (
                <Badge key={langId} pill variant="danger" onClick={() => removeLanguage(langId)}>
                  {universityStore.languages.find(lang => lang.id === langId).name} &times;
                </Badge>
              ))}
            </div>
          </Form.Group>
          <Form.Group controlId="formDirection">
            <Form.Label>Направление</Form.Label>
            <Form.Control
              as="select"
              onChange={handleDirectionChange}
            >
              <option value="">Выберите направление</option>
              {universityStore.directions && universityStore.directions.map((direction) => (
                <option key={direction.id} value={direction.id}>
                  {direction.name}
                </option>
              ))}
            </Form.Control>
            <div className="mt-2">
              Выбранные направления: {selectedDirectionNames.join(', ')}
              {selectedDirections.map(dirId => (
                <Badge key={dirId} pill variant="danger" onClick={() => removeDirection(dirId)}>
                  {universityStore.directions.find(dir => dir.id === dirId).name} &times;
                </Badge>
              ))}
            </div>
          </Form.Group>
          <Form.Group controlId="formCountry">
            <Form.Label>Страна</Form.Label>
            <Form.Control
              as="select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
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
        <Button variant="primary" onClick={updateUniversityData}>
          Обновить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default UpdateUniversity;
