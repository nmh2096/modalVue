<template>
  <div class='auth-layout-container'>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AuthLayoutVue',
  props: {},
  components: {},
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang='scss' scoped>
.auth-layout-container{
  background-image: url("../assets/img/background.jpg");
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  position: relative;
  
}
</style>