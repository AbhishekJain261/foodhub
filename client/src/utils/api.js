import axios from 'axios';

// Create an Axios instance for reusable config
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Environment variable for API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

const api = {
  getProducts: () => apiClient.get('/recipes'),
  getProductById: (id) => apiClient.put(`/recipes/likes/${id}`),
  getProductDetail: (id) => apiClient.get(`/recipes/${id}`),
  getProductByViews: (id) => apiClient.put(`/recipes/views/${id}`),
  getProductByComments: (id) => apiClient.get(`/recipes/comments/${id}`),
  postComment: (id, comment) => apiClient.post(`/recipes/comments/${id}`, comment),
  deleteComment: (id, commentId) => apiClient.delete(`/recipes/comments/${id}/${commentId}`),
  replyComment: (id, commentId,reply) => apiClient.post(`/recipes/replies/${id}/${commentId}`,reply),
  deletereply: (id, commentId , replyId) => apiClient.delete(`/recipes/replies/${id}/${commentId}/${replyId}`),
};

export default api;
