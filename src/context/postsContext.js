import { createContext, useCallback, useReducer, useState } from "react";

const PostsContext = createContext({});

export default PostsContext;

function postReducer(state, action) {
  switch (action.type) {
    case "ADD_POST": {
      const newPosts = [...state];
      action.posts.forEach((post) => {
        const exists = newPosts.find((p) => p._id === post._id);
        if (!exists) {
          newPosts.push(post);
        }
      });
      return newPosts;
    }

    case "DELETE_POST": {
      const newPosts = [];
      state.forEach((post) => {
        if (post._id !== action.postId) {
          newPosts.push(post);
        }
      });
      return newPosts;
    }
    default:
      return state;
  }
}

export const PostsProvider = ({ children }) => {
  const [posts, dispatch] = useReducer(postReducer, []);
  const [noMorePosts, setNoMorePosts] = useState(false);

  const setPostsFromSSR = useCallback((postsFromSSR = []) => {
    dispatch({
      type: "ADD_POST",
      posts: postsFromSSR,
    });
  }, []);

  const getPosts = useCallback(
    async ({ lastPostDate, getNewerPosts = false }) => {
      const result = await fetch(`/api/getPosts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lastPostDate, getNewerPosts }),
      });
      // console.log(getNewerPosts);
      const json = await result.json();
      const postsResult = json.posts || [];
      // console.log(postsResult);
      if (postsResult.length < 5) {
        setNoMorePosts(true);
      }
      dispatch({
        type: "ADD_POST",
        posts: postsResult,
      });
    },
    [],
  );

  const removePost = useCallback((postId) => {
    dispatch({
      type: "DELETE_POST",
      postId,
    });
  }, []);

  return (
    <PostsContext.Provider
      value={{ posts, setPostsFromSSR, getPosts, noMorePosts, removePost }}
    >
      {children}
    </PostsContext.Provider>
  );
};
