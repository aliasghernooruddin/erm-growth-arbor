<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" md="9">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">
              step 1
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">
              step 2
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 3" step="3">
              Step 3
            </v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 4" step="4">
              step 4
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="5"> Step 5 </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card>
                <v-container>
                  <v-row justify="center" align="center">
                    <v-col cols="12" md="8">
                      <v-card-text>
                        <h2 class="center font-weight-black grey--text mb-5">
                          Risk Details
                        </h2>
                        <v-text-field
                          v-model="data['title']"
                          label="Risk Title"
                          outlined
                        ></v-text-field>
                        <v-select
                          v-model="data['categories']"
                          :items="options['categories']"
                          label="Risk Category"
                          outlined
                        ></v-select>
                        <v-select
                          v-model="data['sub_categories']"
                          :items="options['categories_2']"
                          label="Risk Sub Category"
                          outlined
                        ></v-select>
                        <v-select
                          v-model="data['likelihoods']"
                          :items="options['likelihoods']"
                          label="Risk Likelihood"
                          outlined
                        ></v-select>
                        <v-select
                          v-model="data['impacts']"
                          :items="options['impacts']"
                          label="Risk Impacts"
                          outlined
                        ></v-select>
                        <v-text-field
                          value="Class III-Control Critical"
                          label="Inherent Risk Exposure"
                          readonly
                          outlined
                        >
                        </v-text-field>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="e1 = 2"> Next </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card>
                <v-container>
                  <v-row justify="center" align="center">
                    <v-col cols="12" md="8">
                      <v-card-text>
                        <h2 class="center font-weight-black grey--text mb-5">
                          Inherent Risk Assessment
                        </h2>
                        <v-text-field
                          label="Root Causes"
                          v-model="data['causes']"
                          outlined
                        >
                        </v-text-field>
                        <v-text-field
                          label="Consequences"
                          v-model="data['consequences']"
                          outlined
                        >
                        </v-text-field>
                        <v-text-field
                          v-model="data['financial_impact']"
                          outlined
                          type="number"
                          label="Estimated financial Impact"
                          prepend-inner-icon="mdi-currency-usd"
                        ></v-text-field>
                        <v-text-field
                          v-model="data['risk_owner']"
                          label="Risk Owner"
                          outlined
                        >
                        </v-text-field>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="e1 = 1"> Back </v-btn>
                        <v-btn color="primary" @click="e1 = 3"> Next </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card>
                <v-container>
                  <v-row justify="center" align="center">
                    <v-col cols="12">
                      <v-card-text>
                        <h2 class="center font-weight-black grey--text mb-5">
                          Current Mitigation Controls, Aggregate FCC
                        </h2>
                        <v-row v-for="index in controls" :key="index">
                          <v-col cols="3">
                            <v-text-field
                              v-model="data['controls']['key_controls']"
                              outlined
                              label="Key Controls"
                            ></v-text-field
                          ></v-col>
                          <v-col cols="3">
                            <v-autocomplete
                              v-model="data['controls']['control_owners']"
                              :items="people"
                              outlined
                              item-text="name"
                              label="Control Owners"
                            >
                              <template v-slot:item="data">
                                <template v-if="typeof data.item !== 'object'">
                                  <v-list-item-content
                                    v-text="data.item"
                                  ></v-list-item-content>
                                </template>
                                <template v-else>
                                  <v-list-item-content>
                                    <v-list-item-title
                                      v-html="data.item.name"
                                    ></v-list-item-title>
                                    <v-list-item-subtitle
                                      v-html="data.item.group"
                                    ></v-list-item-subtitle>
                                  </v-list-item-content>
                                </template>
                              </template>
                            </v-autocomplete>
                          </v-col>
                          <v-col cols="3">
                            <v-text-field
                              v-model="data['controls']['fcc']"
                              outlined
                              label="FCC"
                            ></v-text-field
                          ></v-col>
                          <v-col cols="3">
                            <v-select
                              v-model="data['controls']['frequencies']"
                              :items="options['frequencies']"
                              label="Control Review Frequency"
                              outlined
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-text-field
                          readonly
                          outlined
                          label="Residual Risk Exposure"
                          value="Class III-Control Critical"
                        ></v-text-field>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="e1 = 2"> Back </v-btn>
                        <v-btn color="primary" class="mr-4" @click="e1 = 4">
                          Next
                        </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-container>
                <v-row justify="center" align="center">
                  <v-col cols="12">
                    <v-card-text>
                      <h2 class="center font-weight-black grey--text mb-5">
                        Treatment Plans
                      </h2>
                      <v-row v-for="index in controls" :key="index">
                        <v-col cols="3">
                          <v-text-field
                            v-model="data['treatment']['plans']"
                            outlined
                            label="Risk Treatment Plan"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="3">
                          <v-autocomplete
                            v-model="data['treatment']['action_owners']"
                            :items="people"
                            outlined
                            item-text="name"
                            label="Action Owners"
                          >
                            <template v-slot:item="data">
                              <template v-if="typeof data.item !== 'object'">
                                <v-list-item-content
                                  v-text="data.item"
                                ></v-list-item-content>
                              </template>
                              <template v-else>
                                <v-list-item-content>
                                  <v-list-item-title
                                    v-html="data.item.name"
                                  ></v-list-item-title>
                                  <v-list-item-subtitle
                                    v-html="data.item.group"
                                  ></v-list-item-subtitle>
                                </v-list-item-content>
                              </template>
                            </template>
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            v-model="data['treatment']['fcc']"
                            outlined
                            label="FCC"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="3">
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="data['treatment']['review_date']"
                                outlined
                                label="Next Review Date"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title scrollable>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn text @click="e1 = 3"> Back </v-btn>
                      <v-btn color="primary" class="mr-4" @click="e1 = 5">
                        Next
                      </v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-container>
            </v-stepper-content>

            <v-stepper-content step="5">
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row justify="center" align="center">
                      <v-col cols="12" md="5">
                        <v-combobox
                          v-model="data['tags']"
                          :items="tags"
                          label="Add Tags"
                          multiple
                          outlined
                          chips
                        ></v-combobox>
                        <v-file-input
                          v-model="data['files']"
                          outlined
                          show-size
                          counter
                          multiple
                          chips
                          label="Add Supporting Documents"
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="e1 = 4"> Back </v-btn>
                  <v-btn color="primary" class="mr-4" @click="e1 = 1">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
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
  </v-container>
</template>

<script>
import CreatorAPIS from "@/service/apis/creator.js";

export default {
  name: "Creator",
  components: {},
  data() {
    return {
      e1: 1,
      data: {
        treatment: [],
        controls: [],
      },
      date: "",
      menu: false,
      tags: [],
      people: [
        { header: "Human Resource" },
        { name: "Aliasgher Nooruddin", group: "Human Resource" },
        { name: "Hussain Abbas", group: "Human Resource" },
        { divider: true },
        { header: "Accounts" },
        { name: "Yasir Ahmed", group: "Accounts" },
        { name: "Tahir Yusuf", group: "Accounts" },
      ],
      organisationId: null,
      controls: 3,
      treatments: 3,
      options: {},
      snackbar: false,
      multiLine: true,
      text: "",
    };
  },
  created: function () {
    this.organisationId = JSON.parse(localStorage.getItem("organisation"))[
      "organisationId"
    ];
    this.getOrganisationVariables();
  },
  methods: {
    getOrganisationVariables() {
      CreatorAPIS.getOrganisationVariables(this.organisationId).then((res) => {
        if (res["status"]) {
          this.options = res["data"]["form4"];
        }
      });
    },
    moveEnd() {
      console.log("k");
      window.scrollTo(
        0,
        document.body.scrollHeight || document.documentElement.scrollHeight
      );
    },
  },
};
</script>

<style scoped>
.v-stepper__content {
  padding: 0px 24px 16px 24px;
}

.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 0;
}

.custom-loader {
  animation: loader 1s infinite;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>


