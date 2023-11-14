<template>
    <div class='login-container'>
        <div class="login-form">
            <b-card>
                <h2>Register</h2>
                <div class="register-form">
                    <ValidationObserver tag="form" ref="register-form">
                        <ValidationProvider rules="required|email" #default="{ errors }" name="Tên đăng nhập">
                            <b-form-group label="Tên đăng nhập">
                                <b-form-input v-model="formData.username"></b-form-input>
                                <small class="error">{{ errors[0] }}</small>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider rules="required" #default="{ errors }" name="Tên">
                            <b-form-group label="Tên">
                                <b-form-input v-model="formData.name"></b-form-input>
                                <small class="error">{{ errors[0] }}</small>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider rules="required" #default="{ errors }" name="Mật khẩu">
                            <b-form-group label="Mật khẩu">
                                <b-form-input v-model="formData.password" type="password"></b-form-input>
                                <small class="error">{{ errors[0] }}</small>
                            </b-form-group>
                        </ValidationProvider>
                        <ValidationProvider rules="required|confirmed:Mật khẩu" #default="{ errors }"
                            name="Xác nhận mật khẩu">
                            <b-form-group label="Xác nhận mật khẩu">
                                <b-form-input v-model="formData.comfirmPassword" type="password"></b-form-input>
                                <small class="error">{{ errors[0] }}</small>
                            </b-form-group>
                        </ValidationProvider>
                        <div class="btn">
                            <b-button variant="secondary">Cancel</b-button>
                            <b-button variant="success" @click="validateRegister">Register</b-button>
                        </div>
                        <div class="go-sign-up">
                            <router-link to="/auth/register" class="text-primary">
                                Bạn đã có tài khoản?
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
import { required, confirmed, email } from "@validations";
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
            confirmed,
            email,
            formData: {
                username: "",
                name: "",
                password: "",
                comfirmPassword: "",
            },
        }
    },
    methods: {
        async validateRegister() {
            const valid = await this.$refs["register-form"].validate();
            if (valid) {
                this.register();
            }
        },
        //<!--!--> Fetch: POST /auth/register (register) : Register
        async register() {
            try {

                const respone = await apiService.post("/auth/register", this.formData)
                console.log(respone);
                this.$toast.success(respone.data.message);
                this.$router.push({ name: "login" });

            } catch (error) {
                // console.log(error);/
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