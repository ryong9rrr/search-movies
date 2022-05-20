<template>
  <article>
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
    <button @click="goMoviePage">
      자세히 보기
    </button>
  </article>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => {
        return {
          Response: 'False',
          imdbID: '',
          Poster: '',
          Title: '',
          Actors: '',
          Country: '',
          Director: '',
          Genre: '',
          Language: '',
          Plot: '',
          Released: '',
          Runtime: '',
          Type: '',
        };
      },
    }
  },
  methods: {
    goMoviePage(){
      this.$router.push({name: 'movie', params: { id: `${this.movie.imdbID}` }});
    }
  }
};
</script>

<style lang="scss" scoped>

</style>