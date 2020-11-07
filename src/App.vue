<template>
  <div id="app">
    <router-view />
    <!-- <frame /> -->
    <loading  v-if="$store.state.isshow"></loading>
  </div>
</template>
<script>
import frame from './components/Frame';
import loading from './components/loading.vue';
import mea from './util/meiqia'
export default {
  components: { frame,loading },
  data() {
    return {};
  },

  created() {},
  mounted() {
    document.links
  },
  methods: {},
  watch:{
    $route(to){
      document.title=to.meta.title
      sessionStorage.setItem('active',to.meta.active)
    }
  }
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
  font-size: 0.13rem;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
