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
            <img :src="activeProfile.coverImg" :alt="activeProfile.name" class="cover-img">
          </div>
          <div class="col-12 p-rel profile-head">
            <div class="d-flex justify-content-end fs-2 gap-3">
              <a :href="activeProfile.github" :title="activeProfile.github">
                <i class="mdi mdi-github"></i>
              </a>
              <a :href="activeProfile.linkedin" :title="activeProfile.linkedin">
                <i class="mdi mdi-linkedin"></i>
              </a>
              <a :href="activeProfile.resume" :title="activeProfile.resume">
                <i class="mdi mdi-file-outline"></i>
              </a>
            </div>
            <img :src="activeProfile.picture" :alt="activeProfile.name" class="profile-img">
            <div v-if="activeProfile.graduated" class="graduate-icon fs-3">
              <i class="mdi mdi-account-school"></i>
            </div>
          </div>
          <div class="col-12">
            <p>{{ activeProfile.class }}</p>
            <h2>{{ activeProfile.name }}</h2>
            <i>{{ activeProfile.bio }}</i>
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
a {
  color: black;
  text-decoration: none;
}

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

.cover-img {
  width: 100%;
  height: 15rem;
  object-fit: cover;
  object-position: center;
}

.profile-head {
  min-height: 64px;
}

.graduate-icon {
  position: absolute;
  top: 20px;
  left: 90px;
  height: 40px;
  aspect-ratio: 1/1;
  border: 3px solid #cccccc;
  border-radius: 50%;
  background-color: white;
  text-align: center;
}

.profile-img {
  position: absolute;
  top: -40px;
  left: 20px;
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  border: 3px solid #cccccc;
}

.profile {
  box-shadow: 1px 1px 10px #999999;
  background-color: var(--lightest);
  padding: 2rem;
}

.p-rel {
  position: relative;
}
</style>