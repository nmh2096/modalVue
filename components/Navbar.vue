<template>
    <div class='Navbar-container'>
        <div class="nav-menu">

            <img width="40px" height="30px" :src="logo" alt="logo">
            <router-link to="/note/list">Note</router-link>
            <router-link to="/linkcard/list">Link card</router-link>
        </div>
        <div class="user-info">
      <b-dropdown
        size="lg"
        variant="link"
        toggle-class="text-decoration-none"
        no-caret
        right
      >
        <template #button-content>
          <b-avatar variant="primary" text="BV" class="mr-3"></b-avatar>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#" @click="logout">Log out</b-dropdown-item>
      </b-dropdown>
    </div>
    </div>
</template>

<script>
import logo from "@/assets/img/9panda.jpg"
export default {
    name: 'NavbarVue',
    props: {},
    components: {

    },
    data() {
        return {
            logo
        }
    },
    mounted() {
        console.log(this.$store.state.auth.isAuthenticated);
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$router.push({name:'login'});
        }
    },
}
</script>

<style lang='scss' scoped>
.Navbar-container {
    display: flex;
    background-color: green;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
};
.nav-menu{
    gap: 5px;
}
</style>