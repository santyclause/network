<script setup>
import { Post } from '@/models/Post.js';
import PostElem from './PostElem.vue';
import { AppState } from '@/AppState.js';
import { computed, onMounted, watch } from 'vue';
import { postsService } from '@/services/PostsService.js';
import Pop from '@/utils/Pop.js';
import PostForm from './PostForm.vue';
import { useRoute } from 'vue-router';
import { profilesService } from '@/services/ProfilesService.js';


// const props = defineProps({
//   posts: { type: Array, required: true },
//   profile: { type: String }
// })

/**
 * @type {{posts: Post[]}} 
 */
const { posts } = defineProps(['posts']);
const route = useRoute();

const currentPage = computed(() => AppState.currentPage);
const totalPages = computed(() => AppState.totalPages);
const activeProfile = computed(() => AppState.activeProfile);

onMounted(() => {
  getProfile();
})

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

async function getProfile() {
  try {
    const profileId = route.params.profileId;
    if (!profileId) {
      AppState.activeProfile = null;
      return
    }
    await profilesService.getProfileById(profileId);
  } catch (error) {
    Pop.error(error);
  }

}

</script>


<template>
  <section class="row post-box">
    <div class="col-12 p-0">
      <div id="post-list" class="container-fluid post-list px-5">
        <section v-if="activeProfile" class="row profile my-5">
          <div class="col-12">
            <img :src="activeProfile.coverImg">
          </div>
        </section>
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

.creatorImg {
  width: 80px;
  height: 80px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

.profile {
  position: relative;
  box-shadow: 1px 1px 10px #999999;
  background-color: var(--lightest);
  padding: 2rem;
}
</style>