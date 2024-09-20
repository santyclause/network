import { Post } from "@/models/Post.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";

class PostsService {

  async getPosts() {
    const response = await api.get('/api/posts');
    const newPosts = response.data.posts.map(post => new Post(post));
    AppState.posts = newPosts;
  }
}

export const postsService = new PostsService();