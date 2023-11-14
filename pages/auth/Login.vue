<template>
  <div class='login-container'>
    <div class="login-form">
      <b-card>
        <h2>Login</h2>
        <div class="register-form">
          <ValidationObserver tag="form" ref="login-form">
            <ValidationProvider rules="required|email" #default="{ errors }" name="Tên đăng nhập">
              <b-form-group label="Tên đăng nhập">
                <b-form-input v-model="formData.username"></b-form-input>
                <small class="error">{{ errors[0] }}</small>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider rules="required" #default="{ errors }" name="Mật khẩu">
              <b-form-group label="Mật khẩu">
                <b-form-input v-model="formData.password" type="password"></b-form-input>
                <small class="error">{{ errors[0] }}</small>
              </b-form-group>
            </ValidationProvider>
            <div class="btn">
              <b-button variant="secondary">Cancel</b-button>
              <b-button variant="success" @click="validateLogin">Sign in</b-button>
            </div>
            <div class="go-sign-up">
              <router-link to="/auth/register" class="text-primary">
                Sign up
              </router-link>
            </div>
          </ValidationObserver>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { required, email } from "@validations";
import apiService from "@/services/apiService"
export default {
  name: 'LoginVue',
  props: {},
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      required,
      email,
      formData: {
        username: "",
        password: "",
      },
    }
  },
  methods: {
    async validateLogin() {
      const valid = await this.$refs["login-form"].validate();
      if (valid) {
        this.login();
      }
    },
    async login() {
      try {

        const response = await apiService.post("/auth/login", this.formData)
        console.log(response);
        this.$toast.success(response.data.message);
        localStorage.setItem('token',response.data.accessToken);
        this.$router.push({name: "note-list"});
      } catch (error) {
        // console.log(error);
        this.$toast.error(error.response.data.message);
      }
    }
  },
}
</script>

<style lang='scss' scoped>
.login-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 500px;
}

.btn {
  display: flex;
  justify-content: end;
}

h2 {
  text-align: center;
}

button {
  margin: 5px;
}

.go-sign-up {
  display: flex;
  justify-content: end;
  text-decoration: underline;
  color: blue
}

@media (max-width: 768px) {
  .login-form {
    width: 300px;
  }
}
</style>