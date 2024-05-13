import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Row, Col } from "react-bootstrap";
import ReplyItem from "./ReplyItem"; // Импортируем компонент для отображения ответов
import { fetchReviews } from "../http/universityAPI";

const ReviewList = observer(({ universityId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const fetchedReviews = await fetchReviews(universityId);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    getReviews();
  }, [universityId]);

  // Функция для построения древовидной структуры комментариев
  const buildTree = (reviews) => {
    const reviewMap = new Map();
    const rootReviews = [];

    // Сначала создаем хэш-мап, где ключом является rootId
    for (const review of reviews) {
      if (!review.rootId) {
        rootReviews.push(review);
      } else {
        const parent = reviewMap.get(review.rootId);
        if (!parent.replies) {
          parent.replies = [];
        }
        parent.replies.push(review);
      }
      reviewMap.set(review.id, review);
    }

    return rootReviews;
  };

  return (
    <Row>
      {buildTree(reviews).map(review => (
        <Col key={review.id} md={6}>
          {/* Отображаем комментарий */}
          <ReplyItem key={review.id} review={review} />

          {/* Отображаем ответы на комментарий (реплаи) */}
          {review.replies && review.replies.map(reply => (
            <ReplyItem key={reply.id} review={reply} />
          ))}
        </Col>
      ))}
    </Row>
  );
});

export default ReviewList;
