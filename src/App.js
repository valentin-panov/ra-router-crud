import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import createReq from './utils/createReq';
import CreatePostHeader from './components/CreatePostHeader';
import Loading from './components/Loading';
import Posts from './components/Posts/Posts';
import PostCreator from './components/PostCreator';
import PostViewer from './components/PostViewer';
import PostContext from './components/PostContext';
import PostEditor from './components/PostEditor';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPosts = () => {
    setLoading(true);
    createReq({
      query: 'posts',
      method: 'GET',
    }).then((data) => {
      setPosts(data);
      setLoading(false);
    }); // знаю, как реализовать подгрузку только новых сообщений, но в условии этого нет, пока пропустим
  };

  const onPostClickHandler = ({ id, history }) => {
    history.push(`/posts/${id}`);
  };

  const onNewPostSubmitHandler = ({ event, post, history }) => {
    event.preventDefault();
    if (post) {
      createReq({
        query: 'posts',
        method: 'POST',
        content: post,
      });
    }
    history.push('/');
    getPosts();
  };

  const onDeleteHandler = ({ id, history }) => {
    if (id) {
      createReq({
        query: 'posts/',
        method: 'DELETE',
        id,
      });
    }
    history.push('/');
    getPosts();
  };

  const onSaveHandler = ({ event, id, post, history }) => {
    event.preventDefault();
    if (post) {
      createReq({
        query: 'posts',
        method: 'POST',
        content: post,
        id: id,
      });
    }
    history.push('/');
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Router>
      <PostContext.Provider value={posts}>
        <div className='wrapper>'>
          <div className='container'>
            <CreatePostHeader />
            {loading && <Loading />}

            <Switch>
              {posts.length && (
                <Route
                  path='/'
                  exact
                  render={(props) => (
                    <Posts
                      {...props}
                      posts={posts}
                      onPostClickHandler={onPostClickHandler}
                    />
                  )}
                />
              )}
              <Route
                path='/posts/new'
                exact
                render={(props) => (
                  <PostCreator
                    {...props}
                    onNewPostSubmitHandler={onNewPostSubmitHandler}
                  />
                )}
              />

              <Route
                path='/posts/:id'
                exact
                render={(props) => (
                  <PostViewer {...props} onDeleteHandler={onDeleteHandler} />
                )}
              />

              <Route
                path='/posts/edit/:id'
                exact
                render={(props) => (
                  <PostEditor {...props} onSaveHandler={onSaveHandler} />
                )}
              />
            </Switch>
          </div>
        </div>
      </PostContext.Provider>
    </Router>
  );
}
