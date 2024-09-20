<script setup>
import { Post } from '@/models/Post.js';
import PostElem from './PostElem.vue';


/**
 * @type {{posts: Post[]}} 
 */
const { posts } = defineProps(['posts'])


</script>


<template>
  <section class="row">
    <div class="col-12">
      <div class="container">
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


<style lang="scss" scoped></style>