import React from 'react';
import { Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import {findNameByReview} from "../http/userAPI";

const ReplyItem = ({ reply, replies }) => {

  const [userName, setUserName] = useState();
  const relevantReplies = replies.filter(r => r.parentId === reply.id);
  useEffect(() => {
    const getName = async () => {
      try {
        const fetchedName = await findNameByReview(reply.userId);
        setUserName(fetchedName);
      } catch (error) {
        console.error('Error fetching name:', error);
      }
    };

    getName();
  }, [reply.userId]);
  
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{userName}</Card.Title>
        <Card.Text>{reply.content}</Card.Text>
        {relevantReplies.map(r => <ReplyItem key={r.id} reply={r} replies={replies} />)}
      </Card.Body>
    </Card>
  );
};

export default ReplyItem;