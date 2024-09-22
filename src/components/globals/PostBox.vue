<script setup>
import { Post } from '@/models/Post.js';
import PostElem from './PostElem.vue';
import { AppState } from '@/AppState.js';
import { computed, watch } from 'vue';
import { postsService } from '@/services/PostsService.js';
import Pop from '@/utils/Pop.js';
import PostForm from './PostForm.vue';


/**
 * @type {{posts: Post[]}} 
 */
const { posts } = defineProps(['posts']);

const currentPage = computed(() => AppState.currentPage);
const totalPages = computed(() => AppState.totalPages);

watch(() => AppState.posts, () => {
  let listElem = document.getElementById('post-list');
  listElem.scrollTop = 0;
})

async function getPosts(page) {
  try {
    await postsService.getPosts(page);
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <section class="row post-box">
    <div class="col-12 p-0">
      <div id="post-list" class="container-fluid post-list px-5">
        <PostForm />
        <PostElem v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
    <div class="col-12">
      <div class="d-flex justify-content-center align-items-center gap-3 nav-holder">
        <div>
          <button @click="getPosts(currentPage - 1)" :disabled="currentPage <= 1"
            class="btn btn-outline-primary">Previous</button>
        </div>
        <p> Page {{ currentPage }} of {{ totalPages }}</p>
        <div>
          <button @click="getPosts(currentPage + 1)" :disabled="currentPage >= totalPages"
            class="btn btn-outline-primary">Next</button>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.post-box {
  max-height: calc(100vh - 64px);
}

.post-list {
  max-height: calc(100vh - 64px - 64px);
  overflow: auto;
}

.nav-holder {
  height: 64px;
}
</style>