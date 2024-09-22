<script setup>
import { AppState } from '@/AppState.js';
import PostBox from '@/components/globals/PostBox.vue';
import { postsService } from '@/services/PostsService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const posts = computed(() => AppState.posts);

onMounted(() => {
  getPostsByProfile()
})


async function getPostsByProfile() {
  try {
    const profileId = route.params.profileId;
    await postsService.getPostsByProfile(profileId)
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


<style lang="scss" scoped></style>