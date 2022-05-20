<template>
  <header>
    <h1 @click="goHomePage">
      🎞 영화를 검색해보세요!
    </h1>
  </header>
  <RouterView />
</template>

<script>
export default {
  methods: {
    goHomePage(){
      this.$router.push({ name: 'home' });
    }
  }
};
</script>
