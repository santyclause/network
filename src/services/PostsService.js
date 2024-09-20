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
}

export const postsService = new PostsService();