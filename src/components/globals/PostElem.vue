<script setup>
import { Post } from '@/models/Post.js';
import { postsService } from '@/services/PostsService.js';
import Pop from '@/utils/Pop.js';

defineProps({
  post: { type: Post, required: true }
})

async function likePost(postId) {
  try {
    await postsService.likePost(postId);
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <section class="row my-5 post">
    <div class="col-12">
      <div class="d-flex align-items-center gap-3">
        <div>
          <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
            <img :src="post.creator.picture" :alt="post.creator.name" class="creatorImg">
          </router-link>
        </div>
        <div>
          <h5>{{ post.creator.name }}</h5>
        </div>
      </div>
    </div>
    <div class="col-12 my-3">
      {{ post.body }}
    </div>
    <div v-if="post.imgUrl" class="col-12">
      <img :src="post.imgUrl" alt="image" class="img-fluid">
    </div>
    <div class="col-12">
      <div class="pt-3 d-flex align-items-end justify-content-end fs-3">
        <i class="mdi mdi-heart-outline mx-3" role="button" @click="likePost(post.id)"></i>
        <span>{{ post.likes.length }}</span>
      </div>
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

.post {
  box-shadow: 1px 1px 10px #999999;
  background-color: var(--lightest);
  padding: 2rem;
}
</style>