import { Post } from "@/models/Post.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";

class PostsService {

  async getPosts(page) {
    let pageToBe;
    if(!page) {
      pageToBe = '';
    } else {
      pageToBe = '?page=' + page;
    }
    const response = await api.get(`/api/posts${pageToBe}`);
    const newPosts = response.data.posts.map(post => new Post(post));
    AppState.posts = newPosts;
    AppState.currentPage = response.data.page;
    AppState.totalPages = response.data.totalPages;
  }

  async getPostsByProfile(page, profileId) {
    let pageToBe;
    if(!page) {
      pageToBe = '';
    } else {
      pageToBe = '?page=' + page;
    }
    const response = await api.get(`/api/profiles/${profileId}/posts${pageToBe}`);
    const newPosts = response.data.posts.map(post => new Post(post));
    AppState.posts = newPosts;
    AppState.currentPage = response.data.page;
    AppState.totalPages = response.data.totalPages;
  }

  async createPost(content) {
    const response = await api.post('/api/posts', content);
    const newPost = new Post(response.data);
    AppState.posts.unshift(newPost);
  }

  // async checkIfLiked(postId) {
  //   const response = await api.get(`/api/posts/${postId}`);
  //   const newPost = new Post(response.data);
  //   let liked = false;
  //   newPost.likes.forEach(like => {
      
  //   })
  //   return liked;
  // }

  async likePost(postId) {
    const response = await api.post(`/api/posts/${postId}/like`);
    const newPost = new Post(response.data);
    const postIndex = AppState.posts.findIndex(post => post.id == postId);
    AppState.posts.splice(postIndex, 1, newPost);
  }

  async deletePost(postId) {
    const response = await api.delete(`/api/posts/${postId}`);
    const postIndex = AppState.posts.findIndex(post => post.id == postId);

    AppState.posts.splice(postIndex, 1)
  }
}

export const postsService = new PostsService();