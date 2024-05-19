import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Row, Col } from "react-bootstrap";
import ReplyItem from "./ReplyItem"; 
import { fetchReviews, fetchReplies } from "../http/universityAPI";
import ReviewItem from './ReviewItem';

const ReviewList = observer(({ universityId }) => {
  const [reviews, setReviews] = useState([]);
  const [replies, setReplies] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const getReviews = async () => {
      try {
        const fetchedReviews = await fetchReviews(universityId, sortDirection);
        setReviews(fetchedReviews);
        
        const reviewIds = fetchedReviews.map(review => review.id);
        console.log(reviewIds)
        const fetchedReplies = await fetchReplies(reviewIds);
        
        setReplies(fetchedReplies);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    getReviews();
  }, [universityId, sortDirection]);

  
  

  const handleSortChange = (event) => {
    setSortDirection(event.target.value);
  };

  return (
    <>
      <select value={sortDirection} onChange={handleSortChange}>
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
      </select>
      <Row>
        {reviews.map(review => <ReviewItem key={review.id} review={review} replies={replies} />)}
      </Row>
    </>
  );
});

export default ReviewList;
