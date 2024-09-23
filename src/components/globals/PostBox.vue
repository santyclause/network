<script setup>
import { Post } from '@/models/Post.js';
import PostElem from './PostElem.vue';
import { AppState } from '@/AppState.js';
import { computed, onMounted, ref, watch } from 'vue';
import { postsService } from '@/services/PostsService.js';
import Pop from '@/utils/Pop.js';
import PostForm from './PostForm.vue';
import { useRoute } from 'vue-router';
import { profilesService } from '@/services/ProfilesService.js';
import { accountService } from '@/services/AccountService.js';


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
const account = computed(() => AppState.account)
const editableProfileFormData = ref({
  name: '',
  bio: '',
  class: '',
  coverImg: '',
  picture: '',
  github: '',
  linkedin: '',
  resume: '',
  graduated: false
})

onMounted(() => {
  getProfile();
})

watch(() => AppState.posts, () => {
  let listElem = document.getElementById('post-list');
  listElem.scrollTop = 0;
})

watch(() => AppState.account, () => {
  if (account.value) {
    editableProfileFormData.value = {
      name: account.value.name,
      bio: account.value.bio,
      class: account.value.class,
      coverImg: account.value.coverImg,
      picture: account.value.picture,
      github: account.value.github,
      linkedin: account.value.linkedin,
      resume: account.value.resume,
      graduated: account.value.graduated
    }
  }
}, { immediate: true })

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

async function updateAccount() {
  try {
    await accountService.updateAccount(editableProfileFormData.value);
  } catch (error) {
    Pop.error(error);
  }
}

let profileShown = true;

function toggleEditProfile() {
  const profileElem = document.getElementById('profile');
  const profileFormElem = document.getElementById('profile-form-cont');
  if (profileShown) {
    profileElem.classList.add('hidden');
    profileFormElem.classList.remove('hidden');
  } else {
    profileElem.classList.remove('hidden');
    profileFormElem.classList.add('hidden');
  }
  profileShown = !profileShown;
}

</script>


<template>
  <section class="row post-box">
    <div class="col-12 p-0">
      <div id="post-list" class="container-fluid post-list px-5">
        <section v-if="activeProfile" id="profile" class="row profile my-5">
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
          <div v-if="account?.id == activeProfile?.id" class="col-12">
            <div class="d-flex justify-content-end">
              <button class="btn btn-outline-primary" type="button" @click="toggleEditProfile()">Edit</button>
            </div>
          </div>
        </section>
        <!-- STUB Edit Profile Form -->
        <section v-if="account" class="row hidden profile my-5" id="profile-form-cont">
          <div class="col-12">
            <form @submit.prevent="updateAccount(), toggleEditProfile()">
              <section class="row p-0">
                <div class="col-12 mb-3">
                  <div class="d-flex justify-content-between">
                    <div class="i-hate-forms">
                      <label>Username: </label>
                      <input v-model="editableProfileFormData.name" name="name" type="text" placeholder="Username"
                        class="form-control">
                    </div>
                    <div class="i-hate-forms">
                      <label>Class Attended:</label>
                      <input v-model="editableProfileFormData.class" name="class" type="text"
                        placeholder="Class Attended" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="col-12 mb-3">
                  <div class="d-flex justify-content-between">
                    <div class="i-hate-forms">
                      <label>Cover Image URL:</label>
                      <input v-model="editableProfileFormData.coverImg" name="coverImg" type="url"
                        placeholder="Cover Image URL" class="form-control">
                    </div>
                    <div class="i-hate-forms">
                      <label>Profile Picture URL</label>
                      <input v-model="editableProfileFormData.picture" name="picture" type="url"
                        placeholder="Profile Picture URL" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="col-12 mb-3">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex">
                      <i class="mdi mdi-github fs-4"></i>
                      <input v-model="editableProfileFormData.github" name="github" type="url" placeholder="Github URL"
                        class="form-control">
                    </div>
                    <div class="d-flex">
                      <i class="mdi mdi-linkedin fs-4"></i>
                      <input v-model="editableProfileFormData.linkedin" name="linkedin" type="url"
                        placeholder="LinkedIn URL" class="form-control">
                    </div>
                    <div class="d-flex">
                      <i class="mdi mdi-file-outline fs-4"></i>
                      <input v-model="editableProfileFormData.resume" name="resume" type="url" placeholder="Resume URL"
                        class="form-control">
                    </div>
                  </div>
                  <div class="col-12 my-3">
                    <!-- <input v-model="editableProfileFormData.bio" name="bio" type="text" placeholder="Bio"> -->
                    <textarea v-model="editableProfileFormData.bio" name="bio" type="text" placeholder="Bio"
                      class="form-control"></textarea>
                  </div>
                  <div class="col-12">
                    <div class="d-flex justify-content-between">
                      <div>
                        <label class="me-3">Graduated?:</label>
                        <input v-model="editableProfileFormData.graduated" name="graduated" type="checkbox">
                      </div>
                      <button type="submit" class="btn btn-primary">Save Changes</button>
                    </div>
                  </div>
                </div>
              </section>
            </form>
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

.hidden {
  display: none;
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

.i-hate-forms {
  width: 45%;
}

.p-rel {
  position: relative;
}
</style>