import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
  }
  return req
});

// const url = "http://localhost:5000/posts";

export const fetchPosts = () => {
  return API.get("/posts");
};

export const createPost = (newPost) => {
  return API.post("/posts", newPost);
};

export const updatePost = (id, postData) => {
  return API.patch(`/posts/${id}`, postData);
};

export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
};

export const likePost = (id) => {
  return API.patch(`/posts/${id}/likePost`);
};

export const signIn = (form) => API.post("/users/singin", form);
export const signUp = (form) => API.post("/users/singup", form);
