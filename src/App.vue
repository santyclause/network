<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';
import { computed, onMounted } from 'vue';
import { adsService } from './services/AdsService.js';
import Pop from './utils/Pop.js';

const ads = computed(() => AppState.ads);

onMounted(() => {
  getAds();
})

async function getAds() {
  try {
    await adsService.getAds();
  }
  catch (error) {
    Pop.error(error);
  }
}

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
          <div v-for="ad in ads" :key="ad.title" class="my-3">
            <img :src="ad.tallImg" :alt="ad.title" class="img-fluid">
          </div>
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
