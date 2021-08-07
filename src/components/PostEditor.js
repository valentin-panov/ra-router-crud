import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PostContext from './PostContext';
import moment from 'moment';
import 'moment/locale/ru';
import CloseIcon from '@material-ui/icons/Close';
import { Button, TextField } from '@material-ui/core';

export default function PostEditor({ match, onSaveHandler, basURL }) {
  const [post, setPost] = useState('');
  let history = useHistory();
  const id = match.params.id;
  return (
    <div className='card'>
      <div className='head-holder'>
        <span className='post-editor_header'>Редактировать публикацию</span>
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

              <form
                className={'new-post-input'}
                noValidate
                autoComplete='off'
                onSubmit={(event) => {
                  onSaveHandler({ event, id, post, history });
                  setPost('');
                }}
              >
                <TextField
                  defaultValue={content}
                  onInput={(e) => setPost(e.target.value)}
                  id='outlined-basic'
                  label=''
                  variant='outlined'
                  style={{ width: '100%' }}
                />
                <div className='btn-holder'>
                  <Button variant='contained' color='primary' type='submit'>
                    Сохранить
                  </Button>
                </div>
              </form>
            </>
          );
        }}
      </PostContext.Consumer>
    </div>
  );
}
