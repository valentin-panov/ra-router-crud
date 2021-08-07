import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PostContext from './PostContext';
import moment from 'moment';
import 'moment/locale/ru';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';

export default function PostViewer({ match, onDeleteHandler, basURL }) {
  let history = useHistory();
  const id = match.params.id;
  return (
    <div className='card'>
      <div className='head-holder'>
        <Link to={basURL + '/'}>
          <CloseIcon style={{ cursor: 'pointer' }} />
        </Link>
      </div>
      <PostContext.Consumer>
        {(posts) => {
          const { created, content } = posts.find((i) => i.id === id);
          return (
            <>
              <span className='card_time'>{moment(created).fromNow()}</span>
              <span className='card_content'>{content}</span>
            </>
          );
        }}
      </PostContext.Consumer>
      <div className='btn-holder'>
        <Link to={basURL + `/posts/edit/${id}`}>
          <Button variant='contained' color='primary'>
            Изменить
          </Button>
        </Link>
        &nbsp;
        <Button
          variant='contained'
          color='secondary'
          onClick={() => onDeleteHandler({ id, history })}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
}
