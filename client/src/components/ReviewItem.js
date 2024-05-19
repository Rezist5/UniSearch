import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { findNameByReview } from "../http/userAPI";
import ReplyForm from './ReplyForm';
import ReplyItem from "./ReplyItem";

const ReviewItem = ({ review, replies }) => {
  const [userName, setUserName] = useState();
  const [showReplyForm, setShowReplyForm] = useState(false); // Новое состояние для отображения формы ответа
  const relevantReplies = replies.filter(reply => reply.parentId === review.id);
  useEffect(() => {
    const getName = async () => {
      try {
        const fetchedName = await findNameByReview(review.userId);
        setUserName(fetchedName)
      } catch (error) {
        console.error('Error fetching name:', error);
      }
    };

    getName();
  }, [review.userId]);

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm); // Переключает состояние формы ответа при нажатии на кнопку
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{userName}</Card.Title>
        <Card.Text>{review.content}</Card.Text>
        <Card.Text>Rating: {review.rating}</Card.Text>
        <Button onClick={handleReplyClick}>Ответить</Button> {/* Кнопка для вызова формы ответа */}
        {showReplyForm && <ReplyForm parentId={review.id} universityId={review.universityId}/>}
         {/* Отображение формы ответа, если showReplyForm равно true */}
         {relevantReplies.map(reply => <ReplyItem key={reply.id} reply={reply} replies={replies} />)}
      </Card.Body>
    </Card>
  );
};

export default ReviewItem;
