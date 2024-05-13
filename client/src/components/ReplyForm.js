import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createReview } from '../http/universityAPI';

const ReplyForm = ({ reviewId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview(reviewId, { content });
      // Успешно отправлено, можно добавить дополнительную логику, например очистку полей формы или обновление списка ответов на комментарий
      setContent('');
      alert('Ответ успешно отправлен!');
    } catch (error) {
      // Обработка ошибок, например, вывод сообщения об ошибке
      console.error('Ошибка при отправке ответа на комментарий:', error.message);
      alert('Ошибка при отправке ответа на комментарий. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formReplyContent">
        <Form.Label>Текст ответа:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Отправить ответ
      </Button>
    </Form>
  );
};

export default ReplyForm;
