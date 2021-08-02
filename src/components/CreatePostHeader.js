import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function CreatePostHeader() {
  return (
    <div className='card'>
      <div className='btn-holder'>
        <Link to='/posts/new'>
          <Button variant='contained' color='primary'>
            Создать пост
          </Button>
        </Link>
      </div>
    </div>
  );
}
