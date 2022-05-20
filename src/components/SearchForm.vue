<template>
  <form @submit.prevent>
    <label name="search-input">{{ label }}</label>
    <input
      id="search-input"
      ref="input"
      v-model="keyword"
      name="search-input"
      placeholder="영화를 검색해보세요!" 
      autocomplete="off" />
    <button
      aria-label="search"
      @click="goMoviesPage">
      찾기
    </button>
  </form>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '찾고싶은 영화가 있나요?'
    }
  },
  data(){
    return {
      keyword: ''
    };
  },
  mounted(){
    this.focusInput();
  },
  methods: {
    focusInput() {
      this.$refs.input.focus();
    },
    async goMoviesPage(){
      if (!this.keyword) return;
      this.$router.push({ name: 'movies', params : { keyword: `${this.keyword}` } });
    }
  },
};
</script>