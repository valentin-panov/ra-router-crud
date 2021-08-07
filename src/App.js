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
  const basURL = '/ra-router-crud';

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
    history.push(basURL + `/posts/${id}`);
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
    history.push(basURL + '/');
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
    history.push(basURL + '/');
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
    history.push(basURL + '/');
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
            <CreatePostHeader basURL={basURL} />
            {loading && <Loading />}

            <Switch>
              {posts.length && (
                <Route
                  path={basURL + '/'}
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
                path={basURL + '/posts/new'}
                exact
                render={(props) => (
                  <PostCreator
                    {...props}
                    onNewPostSubmitHandler={onNewPostSubmitHandler}
                    basURL={basURL}
                  />
                )}
              />

              <Route
                path={basURL + '/posts/:id'}
                exact
                render={(props) => (
                  <PostViewer
                    {...props}
                    onDeleteHandler={onDeleteHandler}
                    basURL={basURL}
                  />
                )}
              />

              <Route
                path={basURL + '/posts/edit/:id'}
                exact
                render={(props) => (
                  <PostEditor
                    {...props}
                    onSaveHandler={onSaveHandler}
                    basURL={basURL}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </PostContext.Provider>
    </Router>
  );
}
