<script setup>
import { AppState } from '@/AppState.js';
import PostBox from '@/components/globals/PostBox.vue';
import { postsService } from '@/services/PostsService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';


const posts = computed(() => AppState.posts)

onMounted(() => {
  getPosts();
  // superImportantFunction();
})

// function superImportantFunction() {
//   let rand = Math.random();
//   if (rand <= 0.05) {
//     throw new Error(`Cannot access properties of undefined
//     at getPosts (HomePage.vue?t=1726871649238:26:15)`);
//   }
// }

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
  <div class="container-fluid p-0">
    <PostBox :posts="posts" />
  </div>
</template>

<style scoped lang="scss"></style>
