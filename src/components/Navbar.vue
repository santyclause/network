<script setup>
import { computed, onMounted, ref } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';
import { AppState } from '@/AppState.js';

// const theme = ref(loadState('theme') || 'light')

// onMounted(() => {
//   document.documentElement.setAttribute('data-bs-theme', theme.value)
// })

// function toggleTheme() {
//   theme.value = theme.value == 'light' ? 'dark' : 'light'
//   document.documentElement.setAttribute('data-bs-theme', theme.value)
//   saveState('theme', theme.value)
// }

const account = computed(() => AppState.account);

</script>

<template>
  <nav class="navbar navbar-expand-sm navbar-dark bgm-dark">
    <div class="sidebar pt-5">
      <div class="d-flex justify-content-center">
        <Login />
      </div>
      <div v-if="account" class="d-flex flex-column mx-5">
        <p>{{ account.class }}</p>
        <h3>{{ account.name }}</h3>
        <a v-if="account.github" :href="account.github" :title="account.github">
          <i class="mdi mdi-github fs-2"></i>
        </a>
        <a v-if="account.linkedin">
          <i class="mdi mdi-linkedin fs-2"></i>
        </a>
        <a v-if="account.resume">
          <i class="mdi mdi-resume fs-2"></i>
        </a>
      </div>
    </div>
    <div class="w-100 d-flex justify-content-between align-items-center nav-pad">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <div class="d-flex flex-column align-items-center">
          <img alt="logo" src="/img/cw-logo.png" height="45" />
        </div>
      </router-link>
      <div>
        <form>
          <input type="text" placeholder="Search">
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-pad {
  padding-left: 21vw;
  padding-right: 1vw;
}

a {
  color: black;
}

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.sidebar {
  position: fixed;
  width: 20vw;
  height: 100vh;
  top: 0;
  background-color: var(--lightest);
  border-right: 1px solid #999999;
}

@media screen and (min-width: 576px) {
  nav {
    height: 64px;
  }
}
</style>
