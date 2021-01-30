<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4" v-for="i in cards" :key="i.variable">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{ i.name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ i.text }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
              @click="openDialog(i.name, i.variable)"
            >
              open
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar :multi-line="multiLine" v-model="snackbar" top right>
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>

    <v-dialog v-model="show" width="600">
      <v-card>
        <v-card-title>{{ dialog["name"] }}</v-card-title>
        <v-card-subtitle>
          <v-btn depressed small class="mt-5 mr-5" @click="all"
            >Select All</v-btn
          >
          <v-btn depressed small class="mt-5" @click="none"
            >Un Select All</v-btn
          >
        </v-card-subtitle>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                class="ma-0 pa-0"
                cols="12"
                md="6"
                v-for="i in dialog['values']"
                :key="i"
              >
                <v-checkbox
                  v-model="dialog['selectedValues']"
                  :label="i"
                  :value="i"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" plain @click="show = false">Close</v-btn>
          <v-btn color="blue" text :loading="loading" @click="submit"
            >Update</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
import constants from "@/service/constants.js";
import OrganisationApi from "@/service/apis/organisation.js";

export default {
  name: "Details",
  components: {},
  data() {
    return {
      organisationInfo: {},
      data: {},
      loading: false,
      cards: [
        {
          name: "Risk Categories",
          text:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, corrupti similique. Quaerat laboriosam",
          variable: "categories",
        },
        {
          name: "Risk Sub Categories",
          text:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, corrupti similique. Quaerat laboriosam",
          variable: "sub_categories",
        },
        {
          name: "Risk Descriptions",
          text:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, corrupti similique. Quaerat laboriosam",
          variable: "descriptions",
        },
        {
          name: "Risk Likelihoods",
          text:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, corrupti similique. Quaerat laboriosam",
          variable: "likelihoods",
        },
        {
          name: "Risk Impacts",
          text:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, corrupti similique. Quaerat laboriosam",
          variable: "impacts",
        },
        {
          name: "Risk Frequencies",
          text:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, corrupti similique. Quaerat laboriosam",
          variable: "frequencies",
        },
        {
          name: "Risk Ratings",
          text:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, corrupti similique. Quaerat laboriosam",
          variable: "ratings",
        },
        {
          name: "Risk Statuses",
          text:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, corrupti similique. Quaerat laboriosam",
          variable: "statuses",
        },
      ],
      // These are Variables constants
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
      dialog: {
        name: null,
        values: [],
        selectedValues: [],
        variable: null,
      },
      show: false,
      reqRules: constants.REQ_RULES,
      text: "",
      snackbar: false,
      multiLine: true,
    };
  },
  created: function () {
    this.getOrganisation();
  },
  methods: {
    getOrganisation() {
      OrganisationApi.getOrganisation().then((resp) => {
        if (resp["status"]) {
          this.organisationInfo = resp["data"];
          if (resp["data"]["form4"]) this.data = resp["data"]["form4"];
        }
      });
    },
    openDialog(name, variable) {
      this.dialog["name"] = name;
      this.dialog["values"] = this.variables[variable];
      this.dialog["selectedValues"] = this.data[variable];
      this.dialog["variable"] = variable;
      this.show = true;
    },
    submit() {
      this.loading = true;
      this.data["id"] = this.organisationInfo["_id"];
      this.data["form"] = "form4";
      this.data[this.dialog["variable"]] = this.dialog["selectedValues"];
      OrganisationApi.updateOrganisation(this.data).then((resp) => {
        this.text = resp["message"];
        this.snackbar = true;
        this.loading = false;
        this.show = false;
      });
    },
    all() {
      this.dialog["selectedValues"] = this.dialog["values"];
    },
    none() {
      this.dialog["selectedValues"] = [];
    },
  },
};
</script>