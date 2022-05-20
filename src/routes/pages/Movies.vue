<template>
  <SearchForm
    label="다른 영화를 찾아볼까요?" />
  <Loading v-if="isLoadingMovieList" />
  <div v-else>
    <h1>{{ msg }}</h1>
    <MovieList
      :movie-list="movieList"
      :keyword="keyword"
      :total-results="totalResults"
      :is-loading-more="isLoadingMore"
      @update:movie-list="fetchMoreMovies" />
  </div>
  <button
    class="go-top"
    @click="onClickGoTop">
    맨 위로
  </button>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SearchForm, MovieList, Loading } from '~/components';
import api from '~/utils/api';

export default {
  components: {
    MovieList,
    SearchForm,
    Loading,
  },
  data(){
    return {
      isLoadingMovieList: true,
      movieList: [],
      totalResults: 0,
      page: 1,
      debounceTimer: null,
      isLoadingMore: false,
    };
  },
  computed: {
    ...mapState(['searched']),
    msg(){
      return this.movieList.length === 0 ? 
      `${this.keyword} 에 일치하는 영화가 없어요.` :
      `${this.keyword} 과 관련있는 ${this.totalResults} 건의 영화를 찾았어요!`;
    },
    keyword(){
      const { keyword } = this.$router.currentRoute.value.params;
      return keyword;
    },
  },
  watch: {
    $route(){
      this.fetchMovieList();
    }
  },
  mounted(){
    this.fetchMovieList();
  },
  methods: {
    ...mapActions(['saveSearchedKeyWord']),
    onClickGoTop(){
      window.scrollTo(0, 0);
    },
    updateView({movieList, totalResults}){
      const isSavedData = this.$store.state.searched[this.keyword];
      if (isSavedData) {
        this.movieList = [...this.$store.state.searched[this.keyword].movieList];
      } else {
        this.movieList = [ ...movieList ];
      }
      this.totalResults = Number(totalResults);
    },
    async fetchMovieList(){
      this.isLoadingMovieList = true;
      const { Search: movieList, Response, totalResults } = await api.getMovies({ keyword: this.keyword });
      if (Response === 'True') {
        this.updateView({ movieList, totalResults });
      } else {
        this.updateView({movieList: [], totalResults: 0});
      }
      this.isLoadingMovieList = false;
    },
    async fetchMoreMovies(){
      this.isLoadingMore = true;
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(async() => {
        this.page += 1;
        const { Search: loadedMovies } = await api.getMovies({ keyword: this.keyword, page: this.page });
        this.movieList = [...this.movieList, ...loadedMovies];
        this.saveSearchedKeyWord({
          keyword: this.keyword,
          page: this.page,
          movieList: this.movieList,
        });
        this.isLoadingMore = false;
      }, 500);
    },
  }
};
</script>