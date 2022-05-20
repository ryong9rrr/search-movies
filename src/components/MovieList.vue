<template>
  <Loading v-if="isLoadingPreview" />
  <Modal
    v-model="isShowModal"
    closeable>
    <MoviePreview
      :movie="movieDetailsData" />
  </Modal>
  <section>
    <ul>
      <li
        v-for="movie in movieList"
        :id="movie.imdbID"
        :key="movie.imdbID"
        @click="onClickMovie">
        {{ movie.Title }}
      </li>
    </ul>
    <Loading v-if="isLoadingMore" />
    <button
      v-if="movieList.length < totalResults"
      aria-label="search"
      class="more"
      @click="onClickMore">
      더 보기
    </button>
  </section>
</template>

<script>
import api from '~/utils/api';
import Modal from './Modal';
import Loading from './Loading';
import MoviePreview from './MoviePreview';

export default {
  components: {
    Modal,
    MoviePreview,
    Loading
  },
  props: {
    movieList: {
      type: Array,
      default: () => [],
    },
    keyword: {
      type: String,
      default: '',
    },
    totalResults: {
      type: Number,
      default: 0,
    },
    isLoadingMore: {
      type:Boolean,
      default: false,
    }
  },
  emits: ['update:movieList'],
  data(){
    return {
      isShowModal: false,
      movieDetailsData: null,
      isLoadingMoreButton: false,
      debounceTimer : null,
      isLoadingPreview : false,
    };
  },
  methods: {
    onModal(){
      this.isShowModal = true;
    },
    async onClickMovie(e){
      this.isLoadingPreview = true;
      if (this.debounceTimer){
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(async() => {
        const { id } = e.target;
        if (!id) return;
        const movieDetailsData = await api.getDetailMovie({ id });
        if (movieDetailsData.Response === 'True') {
          this.movieDetailsData = movieDetailsData;
          this.onModal();
        }
        this.isLoadingPreview = false;
      }, 500);
    },
    onClickMore(){
      this.$emit('update:movieList');
    }
  }
};
</script>