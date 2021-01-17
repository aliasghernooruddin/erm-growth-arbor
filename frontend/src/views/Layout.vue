<template>
  <section>
    <v-app-bar clipped-left app flat dark color="cyan lighten-1">
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title>
        <v-img src="../assets/logo.png" class="logo"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="white" text @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-navigation-drawer clipped v-model="drawer" app color="grey lighten-5">
      <v-list>
        <v-list-item router to="creator" color="primary">
          <v-list-item-action>
            <v-icon color="primary">mdi-pencil</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Risk Creator</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="owner" color="primary">
          <v-list-item-action>
            <v-icon color="primary">mdi-slope-downhill</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Risk Owner</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="department" color="primary">
          <v-list-item-action>
            <v-icon color="primary">mdi-bus-clock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Risk Department</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="committee" color="primary">
          <v-list-item-action>
            <v-icon color="primary">mdi-source-commit</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Risk Committee</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="ceo" color="primary">
          <v-list-item-action>
            <v-icon color="primary">mdi-fireplace-off</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>CEO</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="organisation" color="primary">
          <v-list-item-action>
            <v-icon color="primary">mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-sheet class="rows" color="grey lighten-3">
      <router-view name="portal" />
    </v-sheet>
  </section>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      drawer: true,
    };
  },
  methods: {
    logout() {
      this.$router.push("/login");
    },
  },
  created: function () {},
};
</script>

<style>
.rows {
  height: calc(100vh - 64px);
}

.logo {
  width: 60px;
}
</style>