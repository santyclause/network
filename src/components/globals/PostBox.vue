<script setup>
import { Post } from '@/models/Post.js';
import PostElem from './PostElem.vue';


/**
 * @type {{posts: Post[]}} 
 */
const { posts } = defineProps(['posts'])


</script>


<template>
  <section class="row postBox">
    <div class="col-12">
      <div class="container post-list px-5">
        <PostElem v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
    <div class="col-12">
      <div class="d-flex justify-content-center">
        <div>
          previous
        </div>
        <div>
          Page count
        </div>
        <div>
          next
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
</style>