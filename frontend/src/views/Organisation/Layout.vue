<template>
  <section>
    <v-app-bar clipped-left app flat dark color="cyan">
      <v-toolbar-title>
        <v-img src="../../assets/logo.png" class="logo mr-5"></v-img>
      </v-toolbar-title>
      <h3>ENTERPRISE RISK MANAGEMENT - ORGANISATION SETTINGS</h3>
      <v-spacer></v-spacer>
      <v-btn color="white" text @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-navigation-drawer clipped v-model="drawer" app color="grey lighten-3">
      <v-list>
        <v-list-item router to="details" color="primary">
          <v-list-item-action>
            <v-icon color="primary">mdi-pencil</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Details</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="variables" color="primary">
          <v-list-item-action>
            <v-icon color="primary">mdi-slope-downhill</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Variables</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="departments" color="primary">
          <v-list-item-action>
            <v-icon color="primary">mdi-microsoft-office</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Departments</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-sheet class="rows">
      <router-view
        name="organisation"
        v-if="
          Object.keys(USERINFO).length && Object.keys(ORGANISATIONINFO).length
        "
      />
    </v-sheet>
  </section>
</template>

<script>
import AuthenticationAPIS from "@/service/apis/authentication.js";
import OrganisationApi from "@/service/apis/organisation.js";
import { mapGetters } from "vuex";

export default {
  name: "Layout",
  data() {
    return {
      drawer: true,
    };
  },
  computed: {
    ...mapGetters(["USERINFO", "ORGANISATIONINFO"]),
    show() {
      if (
        Object.keys(this.USERINFO).length &&
        Object.keys(this.ORGANISATIONINFO).length
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    logout() {
      AuthenticationAPIS.logout();
    },
    getUserInfo() {
      OrganisationApi.getEmployee().then((res) => {
        if (res["status"]) {
          this.$store.dispatch("SAVE_USERINFO", res["data"]);
        }
      });
    },
    getOrganisationInfo() {
      OrganisationApi.getOrganisation().then((res) => {
        if (res["status"]) {
          this.$store.dispatch("SAVE_ORGANISATIONINFO", res["data"]);
        }
      });
    },
  },
  created: function () {
    this.getUserInfo();
    this.getOrganisationInfo();
  },
};
</script>

<style >
.rows {
  min-height: calc(100vh - 64px);
}

.logo {
  width: 60px !important;
}
</style>