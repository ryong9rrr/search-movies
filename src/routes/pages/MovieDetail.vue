<template>
  <Loading v-if="isLoading" />
  <article v-else>
    <button @click="goHomePage">
      홈으로
    </button>
    <button @click="goPrevPage">
      뒤로가기
    </button>
    <h1>{{ movie.Title }}</h1>
    <div>
      <img :src="movie.Poster" />
      <div>
        출연 : {{ movie.Actors }}
        장르 : {{ movie.Genre }}
        국가 : {{ movie.Country }}
        소개 : {{ movie.Plot }}
        개봉 : {{ movie.Released }}
        평점 : {{ movie.imdbRating }}
        런타임 : {{ movie.Runtime }}
        타입 : {{ movie.Type }}
        감독 : {{ movie.Director }}
      </div>
    </div>
  </article>
</template>

<script>
import api from '~/utils/api';
import { Loading } from '~/components';

export default {
  components: {
    Loading
  },
  data(){
    return {
      isLoading: false,
      movie: {},
    };
  },
  mounted(){
    this.fetchData();
  },
  methods: {
    goHomePage(){
      this.$router.push({ name: 'home' });
    },
    goPrevPage(){
      window.history.back();
    },
    setLoading(state){
      this.isLoading = state;
    },
    async fetchData(){
      this.setLoading(true);
      const { id } = this.$router.currentRoute.value.params;
      const movieDetailsData = await api.getDetailMovie({ id, full: true });
        if (movieDetailsData.Response === 'True') {
          this.movie = movieDetailsData;
        } else {
          window.alert('잘못된 요청입니다. 홈화면으로 이동합니다.');
          this.goHomePage();          
        }
      this.setLoading(false);
    },
  }
};
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
}
</style>