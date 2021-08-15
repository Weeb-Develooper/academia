<template>
  <v-container fluid fill-height>
    <div class="text-body-1 font-weight-medium">Files</div>
    <div class="ms-auto">
      <v-btn
        color="blue-grey"
        class="text-capitalize"
        plain
        text
        :ripple="false"
        @click="fileDialog = true"
      >
        <span
          class="iconify mr-2"
          data-icon="majesticons:applications-add-line"
          data-width="20"
          data-height="20"
        ></span>
        New File
      </v-btn>
    </div>

    <v-row class="mt-2">
      <v-col cols="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Code
                </th>
                <th class="text-left">
                  Title
                </th>
                <th class="text-left">
                  Unit
                </th>
                <th class="text-left">
                  Lecturers
                </th>
                <th class="text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, d) in files" :key="d">
                <td>{{ item.code }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.units }}</td>
                <td>{{ item.teachers.length }}</td>
                <td class="text-right">
                  <v-menu transition="slide-x-transition" bottom right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>

                    <v-list dense>
                      <v-list-item
                        link
                        @click="
                          setEdit(item.code, item.title, item.units, item.id)
                        "
                      >
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item link @click="remove(item.id)">
                        <v-list-item-title>Delete</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="blue darken-1" class="pt-2" dark>
        <v-card-text>
          {{ modalMsg }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="fileDialog"
      transition="slide-y-transition"
      max-width="700"
    >
      <v-card>
        <v-form ref="fileform" v-model="valid" lazy-validation>
          <v-toolbar color="blue darken-1" class="subtitle-1" dark>
            Upload a File
            <v-icon
              class="ml-auto mx-3"
              plain
              :ripple="false"
              text
              @click="fileDialog = false"
            >
              mdi-close
            </v-icon>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="select"
                  :rules="formRules"
                  :hint="`${select.code}, ${select.title}`"
                  :items="courses"
                  item-text="code"
                  item-color="text"
                  color="text"
                  :item-value="`${select.id}`"
                  label="Course"
                  persistent-hint
                  return-object
                  outlined
                  dense
                  :disable="loading"
                ></v-select>
                <v-file-input
                  v-model="doc"
                  @change="upload"
                  :rules="formRules"
                  color="text"
                  label="Select File"
                  show-size
                  outlined
                  dense
                  required
                ></v-file-input>
                <v-btn @click="validate" block :ripple="false" color="blue" dark
                  >Upload</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "TeacherFiles",
  data() {
    return {
      courses: [],
      files: [],
      select: { code: "Course Code", title: "Course Title" },
      loading: false,
      valid: true,
      dialog: false,
      fileDialog: false,
      modalMsg: "",
      doc: {},
      editCode: "",
      editTitle: "",
      editUnit: "",
      editId: "",
      formRules: [(v) => !!v || "Required field"],
    };
  },
  methods: {
    validate() {
      if (this.$refs.fileform.validate()) {
        this.upload();
      }
    },
    getCourses() {
      this.loading = true;
      axios
        .get(
          `${
            process.env.VUE_APP_API_BASE_URL
          }/courses?department=${this.$store.state.user.teacher.department.toString()}`
        )
        .then((response) => {
          // Handle success.
          this.loading = false;
          this.courses = response.data;
        })
        .catch((error) => {
          // Handle error.
          this.loading = false;
          console.log("An error occurred:", error.response);
        });
    },
    uploadFile() {
      this.modalMsg = "Uploading file...";
      this.dialog = true;
      this.loading = true;
      axios
        .post(`${process.env.VUE_APP_API_BASE_URL}/upload`, this.doc)
        .then((response) => {
          // Handle success.
          console.log(response.data);
          this.dialog = false;
          this.loading = false;
        })
        .catch((error) => {
          // Handle error.
          this.dialog = false;
          this.loading = false;
          console.log("An error occurred:", error.response);
        });
    },
    upload() {
      console.log("files", this.doc);
      let formData = new FormData();

      formData.append("files", this.doc);

      this.uploadFile();
    },
    remove(id) {
      axios
        .delete(`${process.env.VUE_APP_API_BASE_URL}/courses/${id}`)
        .then(() => {
          // Handle success.
          this.getCourses();
        })
        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error.response);
        });
    },
    setEdit(code, name, unit, id) {
      this.editCode = code;
      this.editTitle = name;
      this.editUnit = unit;
      this.editId = id;
      this.editDialog = true;
    },
  },
  mounted() {
    this.getCourses();
  },
};
</script>
