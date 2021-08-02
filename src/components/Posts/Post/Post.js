import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';

export default function Post({ item, onPostClickHandler }) {
  let history = useHistory();
  const { id, content, created } = item;
  return (
    <div
      className='card'
      style={{ cursor: 'pointer' }}
      onClick={() => onPostClickHandler({ id, history })}
    >
      <span className='card_time'>{moment(created).fromNow()}</span>
      <span className='card_content'>{content}</span>
    </div>
  );
}
