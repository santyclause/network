<script setup>
import { AppState } from '@/AppState.js';
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
    <!-- SECTION this could be the post-box component -->
    <section class="row">
      <!-- STUB this could be the post component-->
      <div class="col-12">
        <div>
          Post content
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
    <!-- !SECTION -->
  </div>
</template>

<style scoped lang="scss"></style>
