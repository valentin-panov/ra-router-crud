import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function PostCreator({ onNewPostSubmitHandler, basURL }) {
  const [post, setPost] = useState('');
  let history = useHistory();
  return (
    <div className='card'>
      <div className='head-holder'>
        <Link to={basURL + '/'}>
          <CloseIcon style={{ cursor: 'pointer' }} />
        </Link>
      </div>
      <form
        className={'new-post-input'}
        noValidate
        autoComplete='off'
        onSubmit={(event) => {
          onNewPostSubmitHandler({ event, post, history });
          setPost('');
        }}
      >
        <TextField
          value={post}
          onInput={(e) => setPost(e.target.value)}
          id='outlined-basic'
          label='Новая публикация'
          variant='outlined'
          style={{ width: '100%' }}
        />
        <div className='btn-holder'>
          <Button variant='contained' color='primary' type='submit'>
            Опубликовать
          </Button>
        </div>
      </form>
    </div>
  );
}
