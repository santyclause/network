<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container-fluid">
      <section class="row">
        <div class="col-10">
          <router-view />
        </div>
        <div class="col-2">
          Ads
        </div>
      </section>
    </div>
  </main>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

main {
  padding-left: 21vw;
  padding-right: 1vw;
}
</style>
