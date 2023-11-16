<template>
    <div class='linkcard-container'>
        <div class="link-card" v-for="(item, index) in linkcardList" :key="index"
            :class="item.status === 'IMPORTANT' ? 'class-danger' : item.status === 'HIGHLIGHT' ? 'class-warn' : 'class-success'">
            <div class="first">
                <div class="title">
                    {{ item.title }}
                </div>
                <div class="title-icon">
                    <img @click="openPostModal(true, item)" width="20" height="20" :src="edit" alt="logo">
                    <img @click="deletePostModal(item)" width="20" height="20" :src="deleteIcon" alt="logo">
                </div>
            </div>
            <div class="badges">
                <b-badge class="badge-item"
                    :variant="item.status === 'IMPORTANT' ? 'danger' : item.status === 'HIGHLIGHT' ? 'warning' : 'success'">
                </b-badge>
            </div>
            <div class="url">{{ item.url }}</div>
        </div>

        <div class="footerButton">
            <button class="addButton" @click="openPostModal(false)">+</button>
        </div>

        <b-modal v-model="deleteModal" title="Delete Card" ok-title="Submit" @ok="deleteNote" @hidden="cancelModal">
            <p class="my-4">
                Are you sure you want to delete this card!</p>
        </b-modal>
        <b-modal v-model="postModal" :ok-title="isUpdate ? 'Update' : 'Create'" :title="isUpdate ? 'Eidt' : 'Create'"
            @hidden="closePostModal" @ok="validateCreateCard">
            <!-- <template #modal-title>Create2</template> -->
            <ValidationObserver tag="form" ref="create">
                <ValidationProvider rules="required" #default="{ errors }" name="Title">
                    <b-form-group label="Title">
                        <b-form-input v-model="createForm.title"></b-form-input>
                        <small class="error">{{ errors[0] }}</small>
                    </b-form-group>
                </ValidationProvider>
                <!-- <ValidationProvider rules="required" #default="{ errors }" name="Status">
                    <b-form-group label="Status">
                        <b-form-select v-model="createForm.status" :options="options"></b-form-select>
                        <small class="error">{{ errors[0] }}</small>
                    </b-form-group>
                </ValidationProvider> -->
                <ValidationProvider rules="required" #default="{ errors }" name="Url">
                    <b-form-group label="Url">
                        <b-form-input rows="4" v-model="createForm.url" type="text"></b-form-input>
                        <small class="error">{{ errors[0] }}</small>
                    </b-form-group>
                </ValidationProvider>
            </ValidationObserver>
        </b-modal>
    </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { required } from "@validations";
import apiService from "@/services/apiService";
import edit from "@/assets/icon/edit.png";
import deleteIcon from "@/assets/icon/deleteIcon.png";
export default {
    name: 'LinkCardVue',
    props: {},
    components: {
        ValidationObserver,
        ValidationProvider,
    },
    data() {
        return {
            deleteModal: false,
            postModal: false,
            isUpdate: false,
            required,
            edit,
            deleteIcon,
            linkcardList: [],
            linkcard: {},
            postList: [],
            createForm: {
                title: "",
                url: "",
                status: "",
            },
            options: [
                { value: "TO LEARN", text: "To learn" },
                { value: "LEARNING", text: "Learning" },
                { value: "LEARNED", text: "Learned" },
            ],
        }
    },
    mounted() {
        this.getCardList()
    },
    methods: {
        closePostModal() {
            this.postModal = false
            this.resetForm()
        },
        resetForm() {
            this.isUpdate = false
            this.linkcard = {}
            this.createForm = {
                _id: "",
                title: "",
                status:"",
                url: "",
            }
        },
        openPostModal(isUpdate = false, item) {
            this.isUpdate = isUpdate;
            console.log(this.isUpdate);
            if (this.isUpdate) {
                this.getCardDetail(item._id)
            }
            this.postModal = true;
        },
        deletePostModal(item) {
            this.deleteModal = true
            this.getCardDetail(item._id)
            // this.createModal
        },
        cancelModal() {
            this.resetForm()
        },
        async validateCreateCard(e) {
            e.preventDefault()
            const valid = await this.$refs["create"].validate();
            if (valid) {
                if (this.isUpdate) {
                    this.updateCard()
                } else {
                    this.createLinkCard();
                }
            }
        },
        async getCardList() {
            try {
                const respone = await apiService.get("/linkcard/list");
                console.log(respone);
                this.linkcardList = respone.data.linkcards
                console.log(this.linkcardList);
            } catch (error) {
                console.log(error);
                this.$toast.error(error);
            }
        },
        async createLinkCard() {
            console.log(this.createForm);
            try {
                const response = await apiService.post("/linkcard/create", this.createForm)
                console.log(response);
                this.$toast.success(response.data.message);
                this.closePostModal()
                this.getCardList()
            } catch (error) {
                console.log(error);
                this.$toast.error(error);
            }
        },
        
        async getCardDetail(id) {
            try {
                const response = await apiService.get(`note/detail/${id}`);
                this.createForm = response.data.note;
                this.linkcard = response.data.note;
            } catch (error) {
                this.$toast.error(error);
            }
        },
        async updateCard() {
            try {
                const response = await apiService.put(`linkcard/update/${this.createForm._id}`, this.createForm);
                this.$toast.success(response.data.message);
                console.log(response);
                this.closePostModal()
                this.getCardList()
            } catch (error) {
                this.$toast.error(error);
            }
        },
        async deleteNote() {
            try {
                const response = await apiService.delete(`linkcard/delete/${this.createForm._id}`);
                console.log(response);
                this.$toast.success = response.data.message;
                this.getCardList()
            } catch (error) {
                this.$toast.error(error);
            }
        }
        
    }
}
</script>

<style lang='scss' scoped>
.addButton {
    // border-radius: 100%;
    width: 70px;
    height: 70px;
    padding: 10px 16px;
    border-radius: 35px;
    font-size: 24px;
    line-height: 1.33;
}

.footerButton {
    position: fixed;
    bottom: 20px;
    right: 20px;
}

.linkcard-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px 5%;

    .link-card {
        width: 30%;
        background-color: white;
        border-radius: 4px;
        padding: 20px;
    }

    .title-icon img {
        cursor: pointer;
        margin: 5px;
    }

    .first {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            font-size: 16px;
            font-weight: 700;
        }
    }

    .badges {
        margin: 10px 0;

        .badge-item {
            padding: 5px;
            font-size: 10px;
        }
    }

    .class-danger {
        border: 3px solid red;
    }

    .class-warn {
        border: 3px solid yellow;
    }

    .class-success {
        border: 3px solid green;
    }

}
</style>