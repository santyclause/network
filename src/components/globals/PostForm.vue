<script setup>
import { AppState } from '@/AppState.js';
import { postsService } from '@/services/PostsService.js';
import Pop from '@/utils/Pop.js';
import { computed, ref } from 'vue';


const account = computed(() => AppState.account);

const editableFormData = ref({
  body: '',
  imgUrl: ''
});

async function createPost() {
  try {
    await postsService.createPost(editableFormData.value);
    editableFormData.value = { body: '', imgUrl: '' }
  }
  catch (error) {
    Pop.error(error);
  }
}

function clearImgText() {
  editableFormData.value.imgUrl = '';
}

</script>


<template>
  <form v-if="account" @submit.prevent="createPost()" class="row post my-5">
    <div class="col-12 mb-3">
      <div class="d-flex align-items-center">
        <div class="me-3">
          <img :src="account.picture" :alt="account.name" class="creatorImg">
        </div>
        <div class="flex-grow-1">
          <textarea v-model="editableFormData.body" id="body" name="body" class="form-control"
            placeholder="Share what's happening" required></textarea>
        </div>
      </div>
    </div>
    <div class="col-1"></div>
    <div class="col-6">
      <button data-bs-toggle="modal" data-bs-target="#imgModal" class="btn btn-primary" type="button"><i
          class="mdi mdi-image"></i>
        Upload Image</button>
    </div>
    <div class="col-5 text-end">
      <button class="btn btn-primary"><i class="mdi mdi-send"></i> Post</button>
    </div>
    <div class="modal" id="imgModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Upload Image URL</h5>
            <button @click="clearImgText()" type="button" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input v-model="editableFormData.imgUrl" type="url" class="form-control" id="imgUrl" name="imgUrl"
              placeholder="Image Url">
          </div>
          <div class="modal-footer">
            <button type="button" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>


<style lang="scss" scoped>
.creatorImg {
  width: 80px;
  height: 80px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

.post {
  box-shadow: 1px 1px 10px #999999;
  background-color: var(--lightest);
  padding: 2rem;
}
</style>