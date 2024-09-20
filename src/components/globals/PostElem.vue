<script setup>
import { Post } from '@/models/Post.js';



defineProps({
  post: { type: Post, required: true }
})

</script>


<template>
  <section class="row">
    <div class="col-12">
      <div class="d-flex">
        <div>
          <img :src="post.creator.picture" :alt="post.creator.name" class="creatorImg">
        </div>
        <div>
          <h5>{{ post.creator.name }}</h5>
        </div>
      </div>
    </div>
    <div class="col-12">
      Post content
    </div>
    <div class="col-12">
      Img
    </div>
  </section>
</template>


<style lang="scss" scoped>
.creatorImg {
  width: 80px;
  height: 80px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}
</style>