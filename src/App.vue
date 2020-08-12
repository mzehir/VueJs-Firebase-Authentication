<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("initAuth");
    // Sayfa yenilenmesine karşın bu fonksiyon le store.js'deki otomatik oturum kapatma sorununun önüne geçen fonksiyon tetiklenir.
  },
};
</script>

<style>
</style>
