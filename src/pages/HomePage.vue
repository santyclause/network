<script setup>
import { AppState } from '@/AppState.js';
import PostBox from '@/components/globals/PostBox.vue';
import { postsService } from '@/services/PostsService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';


const posts = computed(() => AppState.posts)

onMounted(() => {
  getPosts();
})

async function getPosts() {
  try {
    await postsService.getPosts();
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>

<template>
  <div class="container-fluid">
    <PostBox :posts="posts" />
  </div>
</template>

<style scoped lang="scss"></style>
