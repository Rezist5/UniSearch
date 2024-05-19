import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createReview } from '../http/universityAPI';

const ReplyForm = ({ parentId , universityId}) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview({ content, parentId }, universityId);
      setContent('');
      alert('Ответ успешно отправлен!');
    } catch (error) {
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
