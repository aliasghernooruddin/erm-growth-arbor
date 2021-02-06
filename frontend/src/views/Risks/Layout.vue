<template>
  <section>
    <v-app-bar app dark color="cyan lighten-1">
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <h3>
        ENTERPRISE RISK MANAGEMENT - RISK {{ currentRouteName.toUpperCase() }}
      </h3>
      <v-spacer></v-spacer>
      <v-btn color="white" text @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <div class="pa-2">
        <div class="title font-weight-bold text-uppercase primary--text">
          Growth Arbor
        </div>
        <div class="overline grey--text">2021</div>
      </div>
      <v-list rounded>
        <v-list-item router to="risks" color="primary">
          <v-list-item-action>
            <v-icon color="primary">mdi-fireplace-off</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>View Risks</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item router :to="currentRouteName" color="primary">
          <v-list-item-action>
            <v-icon color="primary">mdi-pencil</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Create Risk</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-sheet class="rows" color="grey lighten-3">
      <router-view name="portal" v-if="Object.keys(USERINFO).length" />
    </v-sheet>

    <v-dialog v-model="dialog" width="400" persistent>
      <v-card>
        <v-card-title>Please change your password</v-card-title>
        <v-card-text>
          <v-text-field
            @keyup.enter="change"
            type="password"
            v-model="password"
            label="New Password"
            class="mt-4"
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!password || loading" @click="change">Change</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialog: false,
      password: null,
      loading: false
    };
  },
  computed: {
    ...mapGetters(["USERINFO"]),
    currentRouteName() {
      return this.$route.name.toLowerCase();
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
          if (this.USERINFO["isFirstVisit"]) this.dialog = true;
        }
      });
    },
    change() {
      this.loading = true;
      AuthenticationAPIS.changePassword({ data: this.password }).then((res) => {
        if (res["status"]) {
          this.dialog = false;
        }
        this.text = res["message"];
        this.snackbar = true;
        this.loading = false;
      });
    },
  },
  created: function () {
    this.getUserInfo();
  },
};
</script>

<style scoped>
.no-bg {
  background: none !important;
}

.rows {
  /* height: calc(100vh - 64px); */
  min-height: calc(100vh - 64px);
}

.logo {
  width: 60px !important;
}
</style>