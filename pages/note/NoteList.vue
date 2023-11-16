<template>
  <div class='note-list-container'>


    <div class="note-card" v-for="(item, index) in noteList" :key="index"
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
          {{ item.status }}
        </b-badge>
      </div>
      <div class="content">{{ item.content }}</div>
    </div>

    <div class="footerButton">
      <button class="addButton" @click="openPostModal(false)">+</button>
    </div>

    <b-modal v-model="deleteModal" title="Delete Card" ok-title="Submit" @ok="deleteNote" @hidden="cancelModal">
      <p class="my-4">
        Are you sure you want to delete this card!</p>
    </b-modal>
    <b-modal v-model="postModal" :ok-title="isUpdate ? 'Update' : 'Create'" :title="isUpdate ? 'Eidt' : 'Create'"
      @hidden="closePostModal" @ok="validateCreateNote">
      <!-- <template #modal-title>Create2</template> -->
      <ValidationObserver tag="form" ref="create">
        <ValidationProvider rules="required" #default="{ errors }" name="Title">
          <b-form-group label="Title">
            <b-form-input v-model="createForm.title"></b-form-input>
            <small class="error">{{ errors[0] }}</small>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider rules="required" #default="{ errors }" name="Content">
          <b-form-group label="Content">
            <b-form-textarea rows="4" v-model="createForm.content" type="text"></b-form-textarea>
            <small class="error">{{ errors[0] }}</small>
          </b-form-group>
        </ValidationProvider>
        <ValidationProvider rules="required" #default="{ errors }" name="Status">
          <b-form-group label="Status">
            <b-form-select v-model="createForm.status" :options="options"></b-form-select>
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
  name: 'NoteListVue',
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
      noteList: [],
      note: {},
      postList: [],
      createForm: {
        title: "",
        content: "",
        status: "",
      },
      options: [
        { value: "IMPORTANT", text: "Important" },
        { value: "HIGHLIGHT", text: "Highlight" },
        { value: "NORMAL", text: "Normal" }
      ]
    }
  },
  mounted() {
    this.getNoteList()
  },
  methods: {
    closePostModal() {
      this.postModal = false
      this.resetForm()
    },
    resetForm() {
      this.isUpdate = false
      this.note = {}
      this.createForm = {
        _id: "",
        title: "",
        content: "",
        status: "",
      }
    },
    openPostModal(isUpdate = false, item) {
      this.isUpdate = isUpdate;
      console.log(this.isUpdate);
      if (this.isUpdate) {
        this.getNoteDetail(item._id)
      }
      this.postModal = true;
    },
    deletePostModal(item) {
      this.deleteModal = true
      this.getNoteDetail(item._id)
      // this.createModal
    },
    cancelModal() {
      this.resetForm()
    },
    async validateCreateNote(e) {
      e.preventDefault()
      const valid = await this.$refs["create"].validate();
      if (valid) {
        if (this.isUpdate) {
          this.updateNote()
        } else {
          this.createNote();
        }
      }
    },
    async getNoteList() {
      try {
        const respone = await apiService.get("/note/list");
        this.noteList = respone.data.notes
      } catch (error) {
        // console.log(error);
        this.$toast.error(error);
      }
    },
    async createNote() {
      try {
        const response = await apiService.post("/note/create", this.createForm)
        console.log(response);
        this.$toast.success(response.data.message);
        this.closePostModal()
        this.getNoteList()
      } catch (error) {
        console.log(error);
        this.$toast.error(error);
      }
    },
    async getNoteDetail(id) {
      try {
        const response = await apiService.get(`note/detail/${id}`);
        this.createForm = response.data.note;
        this.note = response.data.note;
      } catch (error) {
        this.$toast.error(error);
      }
    },
    async updateNote() {
      try {
        const response = await apiService.put(`note/update/${this.note._id}`, this.createForm);
        this.$toast.success(response.data.message);
        console.log(response);
        this.closePostModal()
        this.getNoteList()
      } catch (error) {
        this.$toast.error(error);
      }
    },
    async deleteNote() {
      try {
        const response = await apiService.delete(`note/delete/${this.createForm._id}`);
        console.log(response);
        this.$toast.success = response.data.message;
        this.getNoteList()
      } catch (error) {
        this.$toast.error(error);
      }
    }
  },
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

.note-list-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px 5%;

  .note-card {
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