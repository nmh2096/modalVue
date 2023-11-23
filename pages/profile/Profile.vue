<template>
    <div class='profile-container'>
        <div class="profile-list">
            <b-card>
                <h2>Profile</h2>
                <div class="profile-form">

                </div>
                <b-card-text>
                    Tên đăng nhập:
                </b-card-text>
                <b-card-text>
                    {{ formData.username }}
                </b-card-text>
                <b-card-text>
                    Tên:
                </b-card-text>
                <b-card-text>
                    {{ formData.name }}
                </b-card-text>
                <b-card-text>
                    Mật khẩu:
                </b-card-text>
                <b-card-text>
                    ********
                </b-card-text>
                <div style="display: flex; justify-content: center;" @click="openPostModal">
                    <b-button variant="primary">Update</b-button>
                </div>
            </b-card>

            <b-modal v-model="postModal" ok-title="Update" title="Profile" @ok="validateProfile">
                <ValidationObserver tag="form" ref="profile">
                    <ValidationProvider rules="required" #default="{ errors }" name="Tên đăng nhập">
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
                    <ValidationProvider rules="required" #default="{ errors }" name="Nhập lại mật khẩu">
                        <b-form-group label="Nhập lại mật khẩu">
                            <b-form-input v-model="formData.password" type="password"></b-form-input>
                            <small class="error">{{ errors[0] }}</small>
                        </b-form-group>
                    </ValidationProvider>
                    <!-- <ValidationProvider rules="required" #default="{ errors }" name="Nhập mật khẩu mới">
                        <b-form-group label="Nhập mật khẩu mới">
                            <b-form-input v-model="formData.newPassword" type="password"></b-form-input>
                            <small class="error">{{ errors[0] }}</small>
                        </b-form-group>
                    </ValidationProvider> -->
                    <!-- <ValidationProvider rules="required|confirmed:Mật khẩu" #default="{ errors }" name="Xác nhận mật khẩu">
                        <b-form-group label="Xác nhận mật khẩu">
                            <b-form-input v-model="formData.comfirmPassword" type="password"></b-form-input>
                            <small class="error">{{ errors[0] }}</small>
                        </b-form-group>
                    </ValidationProvider> -->
                </ValidationObserver>
            </b-modal>

        </div>
    </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { required, confirmed } from "@validations";
import apiService from "@/services/apiService";
export default {
    name: 'ProfileVue',
    props: {},
    components: {
        ValidationObserver,
        ValidationProvider,
    },
    data() {
        return {
            required,
            confirmed,
            postModal: false,
            formData: {
                username: "",
                name: "",
                password: "",
            },
        }
    },
    mounted() {
        this.getProfile()
    },
    methods: {
        closePostModal() {
            this.postModal = false
            this.resetForm()
        },
        resetForm() {
            this.formData = {
                _id: "",
                username: "",
                name: "",
                password: "",
            }
        },
        openPostModal() {
            this.postModal = true;
            console.log(this.formData);
        },

        async validateProfile(e) {
            e.preventDefault()
            const valid = await this.$refs["profile"].validate();
            if (valid) {
                this.updateProfile();
            }
        },
        async getProfile() {
            try {
                const response = await apiService.get(`/auth`)
                this.formData = response.data.user
            } catch (error) {
                console.log(error);
            }
        },

        async updateProfile() {
            try {
                const response = await apiService.put(`profile/update/${this.formData._id}`, this.formData)
                console.log(response);
                this.closePostModal()
                this.getProfile()
            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>

<style lang='scss' scoped>
.profile-container {
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-form {
    width: 500px;
}

.btn {
    display: flex;
    justify-content: center;
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