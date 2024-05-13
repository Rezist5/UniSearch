import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createReview } from '../http/reviewAPI';

const ReviewForm = ({ universityId }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview(universityId, text, rating );
      // Успешно отправлено, можно добавить дополнительную логику, например очистку полей формы или обновление списка отзывов
      setText('');
      setRating(0);
      alert('Отзыв успешно отправлен!');
    } catch (error) {
      // Обработка ошибок, например, вывод сообщения об ошибке
      console.error('Ошибка при отправке отзыва:', error.message);
      alert('Ошибка при отправке отзыва. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formReviewText">
        <Form.Label>Текст отзыва:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formRating">
        <Form.Label>Оценка:</Form.Label>
        <Form.Control
          as="select"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        >
          <option value={0}>Выберите оценку</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Оставить отзыв
      </Button>
    </Form>
  );
};

export default ReviewForm;
