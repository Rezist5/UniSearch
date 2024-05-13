import React from 'react';
import { Card } from 'react-bootstrap';

const ReplyItem = ({ reply }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{reply.title}</Card.Title>
        <Card.Text>{reply.content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReplyItem;