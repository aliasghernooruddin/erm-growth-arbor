<template>
  <section>

    <v-container fluid fill-height>
      <v-row align="center" justify="center" id="row">
        <v-col cols="12" md="5"> </v-col>
      </v-row>
    </v-container>

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
// import CreatorAPIS from "@/service/apis/creator.js";
// import { mapGetters } from "vuex";

export default {
  name: "Owner",
  components: {},
  data() {
    return {
      snackbar: false,
      multiLine: true,
      text: "",
    };
  },
  created: function () {
  
  },
  methods: {
    
  },
};
</script>

<style scoped>

</style>
