<template>
  <section>
    <v-toolbar flat prominent>
      <v-toolbar-title>
        <v-img :src="require('@/assets/logo.png')" class="logo"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn large class="ma-4" color="primary" depressed @click="logOut"
        >Log Out</v-btn
      >
    </v-toolbar>

    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="headline">
              Organisations
              <v-spacer></v-spacer
              ><v-btn large color="primary" text @click="dialog = true"
                >Add</v-btn
              >
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="organisations"
              class="elevation-1"
            >
              <template v-slot:item.creation_date="{ item }">
                {{ item.creation_date | moment("dddd, MMMM Do YYYY, h:mm a") }}
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Create Organisation</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    solo
                    hide-details
                    label="Organisation Name*"
                    v-model="data['name']"
                    :rules="reqRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    solo
                    type="tel"
                    hide-details
                    label="Organisation Phone Number*"
                    v-model="data['phone']"
                    :rules="reqRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    solo
                    hide-details
                    label="Organisation Email*"
                    v-model="data['email']"
                    :rules="reqRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <small>*indicates required field</small>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn
            class="ml-4"
            color="primary"
            :loading="loading"
            :disabled="loading"
            @click="create()"
          >
            Create
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar :multi-line="multiLine" v-model="snackbar" top right>
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </section>
</template>

<script>
import constants from "@/service/constants.js";
import AdminAPIs from "@/service/apis/admin.js";

export default {
  name: "AdminHome",
  components: {},
  data() {
    return {
      data: {},
      organisations: [],
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Creation Date", value: "creation_date" },
      ],
      variables: {
        categories: constants.CATEGORIES,
        pillars: constants.PILLARS,
        sub_categories: constants.SUB_CATEGORIES,
        descriptions: constants.DESCRIPTIONS,
        likelihoods: constants.LIKELIHOODS,
        impacts: constants.IMPACTS,
        frequencies: constants.FREQUENCIES,
        ratings: constants.RATINGS,
        statuses: constants.STATUSES,
      },
      dialog: false,
      loading: false,
      reqRules: constants.REQ_RULES,
      snackbar: false,
      multiLine: true,
      text: "",
    };
  },
  created: function () {
    this.getOrganisations();
  },
  methods: {
    create() {
      if (this.$refs.form.validate()) {
        let data = { ...this.data };
        data["variables"] = this.variables;
        data["form4"] = this.variables;
        this.loading = true;
        AdminAPIs.create(data).then((resp) => {
          if (resp["status"]) {
            this.$refs.form.reset();
            this.dialog = false;
            this.getOrganisations();
          }
          this.text = resp.message;
          this.snackbar = true;
          this.loading = false;
        });
      }
    },
    getOrganisations() {
      AdminAPIs.getOrganisations().then((resp) => {
        if (resp["status"]) {
          this.organisations = resp.data;
        }
      });
    },
    logOut() {
      localStorage.removeItem("admin");
      this.$router.push("/admin-login");
    },
  },
};
</script>

<style>
.logo {
  width: 100px;
  margin-left: 15px;
}
</style>
