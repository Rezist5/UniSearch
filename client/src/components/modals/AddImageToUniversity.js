import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import { addImageToUniversity } from '../../http/universityAPI';

const AddImageToUniversity = ({ show, onHide, university }) => {
  const [images, setImages] = useState([]);
  const universityId = university.id;
  const handleChange = (e) => {
    // Обработчик изменения выбранных изображений
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const uploadImages = () => {
    // Функция для загрузки изображений на сервер
    Promise.all(images.map(image => addImageToUniversity(universityId, image)))
        .then(() => {
            // Успешная загрузка всех изображений
            setImages([]); // Сбрасываем выбранные изображения
            onHide(); // Закрываем модальное окно
        })
        .catch((error) => {
            // Обработка ошибок загрузки
            console.error('Error uploading images:', error);
            // Можно добавить обработку ошибок или отобразить сообщение об ошибке
        });
    };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить изображения к университету</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.File
            multiple
            accept="image/*"
            onChange={handleChange}
            label="Выберите изображения для загрузки"
            custom
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={uploadImages}>Загрузить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddImageToUniversity;
