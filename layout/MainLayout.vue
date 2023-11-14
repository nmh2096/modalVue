<template>
  <div class='main-layout-container'>
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'MainLayoutVue',
  props: {},
  components: {
    Navbar
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang='scss' scoped></style>