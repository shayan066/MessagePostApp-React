import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  }else if (action.type === "ADD_POST"){
    newPostList = [action.payload, ...currPostList]
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList ({
      type: 'ADD_POST',
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: [
          "Engineering",
          "Software Programming",
          "Professional",
          "TechJob",
          "Technology",
        ],
      },
    })
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Work",
    body: "I am a Software Engineer, I am working for microsoft.",
    reactions: 2,
    userId: "user-9",
    tags: [
      "Engineering",
      "Software Programming",
      "Professional",
      "TechJob",
      "Technology",
    ],
  },

  {
    id: "2",
    title: "Going to Mumbai",
    body: "Hi friends, I am going to mumbai for spend time with my family. Hope you wish me enjoy your trip.",
    reactions: 10,
    userId: "user-12",
    tags: ["vacation", "Mumbai", "Enjoying", "Trip"],
  },
];

export default PostListProvider;
