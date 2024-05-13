import React from 'react';
import { Card } from 'react-bootstrap';

const ReviewItem = ({ review }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{review.title}</Card.Title>
        <Card.Text>{review.content}</Card.Text>
        <Card.Text>Rating: {review.rating}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReviewItem;
