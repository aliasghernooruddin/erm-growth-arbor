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
                      <v-form ref="form1" v-model="valid[0]">
                        <v-card-text>
                          <h2 class="center font-weight-black grey--text mb-5">
                            Risk Details
                          </h2>
                          <v-text-field
                            :rules="reqRules"
                            v-model="data['title']"
                            label="Risk Title"
                            outlined
                          ></v-text-field>
                          <v-select
                            :rules="reqRules"
                            v-model="data['category']"
                            :items="options['categories']"
                            label="Risk Category"
                            outlined
                          ></v-select>
                          <v-select
                            :rules="reqRules"
                            v-model="data['sub_category']"
                            :items="options['sub_categories']"
                            label="Risk Sub Category"
                            outlined
                          ></v-select>
                          <v-select
                            @change="step1()"
                            :rules="reqRules"
                            v-model="data['likelihood']"
                            :items="options['likelihoods']"
                            label="Risk Likelihood"
                            outlined
                          ></v-select>
                          <v-select
                            :rules="reqRules"
                            @change="step1()"
                            v-model="data['impact']"
                            :items="options['impacts']"
                            label="Risk Impacts"
                            outlined
                          ></v-select>
                          <v-text-field
                            v-model="data['inherent_risk_exposure']"
                            label="Inherent Risk Exposure"
                            readonly
                            outlined
                          >
                          </v-text-field>
                        </v-card-text>
                      </v-form>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          @click="e1 = 2"
                          :disabled="!valid[0]"
                        >
                          Next
                        </v-btn>
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
                      <v-form ref="form2" v-model="valid[1]">
                        <v-card-text>
                          <h2 class="center font-weight-black grey--text mb-5">
                            Inherent Risk Assessment
                          </h2>
                          <v-text-field
                            :rules="reqRules"
                            label="Root Causes"
                            v-model="data['causes']"
                            outlined
                          >
                          </v-text-field>
                          <v-text-field
                            :rules="reqRules"
                            label="Consequences"
                            v-model="data['consequences']"
                            outlined
                          >
                          </v-text-field>
                          <v-text-field
                            :rules="reqRules"
                            v-model="data['financial_impact']"
                            outlined
                            type="number"
                            label="Estimated financial Impact"
                            prepend-inner-icon="mdi-currency-usd"
                          ></v-text-field>
                          <v-autocomplete
                            :rules="reqRules"
                            v-model="data['risk_owner']"
                            :items="employees"
                            item-text="name"
                            outlined
                            :filter="filterObject"
                            label="Risk Owner"
                            return-object
                          >
                            <template v-slot:item="data">
                              <v-list-item-content>
                                <v-list-item-title
                                  v-html="data.item.name"
                                ></v-list-item-title>
                                <v-list-item-subtitle
                                  v-html="data.item.department"
                                ></v-list-item-subtitle>
                              </v-list-item-content>
                            </template>
                          </v-autocomplete>
                        </v-card-text>
                      </v-form>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="e1 = 1"> Back </v-btn>
                        <v-btn
                          color="primary"
                          @click="e1 = 3"
                          :disabled="!valid[1]"
                        >
                          Next
                        </v-btn>
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
                      <v-form ref="form3" v-model="valid[2]">
                        <v-card-text>
                          <h2 class="center font-weight-black grey--text mb-5">
                            Current Mitigation Controls, Aggregate Financial
                            Cost Control - FCC
                          </h2>
                          <v-row
                            v-for="(key, index) of data['controls']"
                            :key="index"
                          >
                            <v-col cols="3">
                              <v-text-field
                                :rules="reqRules"
                                v-model="
                                  data['controls'][index]['key_controls']
                                "
                                outlined
                                label="Key Controls"
                              ></v-text-field
                            ></v-col>
                            <v-col cols="3">
                              <v-autocomplete
                                :rules="reqRules"
                                v-model="
                                  data['controls'][index]['control_owners']
                                "
                                :items="employees"
                                item-text="name"
                                outlined
                                :filter="filterObject"
                                label="Control Owners"
                              >
                                <template v-slot:item="data">
                                  <v-list-item-content>
                                    <v-list-item-title
                                      v-html="data.item.name"
                                    ></v-list-item-title>
                                    <v-list-item-subtitle
                                      v-html="data.item.department"
                                    ></v-list-item-subtitle>
                                  </v-list-item-content>
                                </template>
                              </v-autocomplete>
                            </v-col>
                            <v-col cols="2">
                              <v-text-field
                                :rules="reqRules"
                                type="number"
                                v-model="data['controls'][index]['fcc']"
                                outlined
                                label="FCC"
                              ></v-text-field
                            ></v-col>
                            <v-col cols="3">
                              <v-select
                                :rules="reqRules"
                                v-model="data['controls'][index]['frequencies']"
                                :items="options['frequencies']"
                                label="Control Review Frequency"
                                outlined
                              ></v-select>
                            </v-col>
                            <v-col class="mt-4">
                              <v-btn
                                @click="deleteControl(index)"
                                icon
                                v-if="index != 0"
                                small
                                color="error"
                              >
                                <v-icon>mdi-minus</v-icon>
                              </v-btn>
                              <v-btn
                                @click="addControl"
                                color="blue"
                                v-if="
                                  index ==
                                  Object.keys(data['controls']).length - 1
                                "
                                icon
                                small
                              >
                                <v-icon>mdi-plus</v-icon></v-btn
                              >
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="6">
                              <v-text-field
                                readonly
                                outlined
                                label="Residual Risk Exposure"
                                v-model="data['residual_risk_exposure']"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                              <v-text-field
                                readonly
                                outlined
                                label="Total FCC"
                                :value="data['total_fcc_controls']"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-form>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="e1 = 2"> Back </v-btn>
                        <v-btn
                          color="primary"
                          class="mr-4"
                          @click="e1 = 4"
                          :disabled="!valid[2]"
                        >
                          Next
                        </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-card>
                <v-container>
                  <v-row justify="center" align="center">
                    <v-col cols="12">
                      <v-form ref="form4" v-model="valid[3]">
                        <v-card-text>
                          <h2 class="center font-weight-black grey--text mb-5">
                            Treatment Plans
                          </h2>
                          <v-row
                            v-for="(key, index) of data['treatments']"
                            :key="index"
                          >
                            <v-col cols="3">
                              <v-text-field
                                :rules="reqRules"
                                v-model="data['treatments'][index]['plans']"
                                outlined
                                label="Risk Treatment Plan"
                              ></v-text-field
                            ></v-col>
                            <v-col cols="3">
                              <v-autocomplete
                                :rules="reqRules"
                                v-model="
                                  data['treatments'][index]['action_owners']
                                "
                                :items="employees"
                                item-text="name"
                                outlined
                                :filter="filterObject"
                                label="Action Owners"
                              >
                                <template v-slot:item="data">
                                  <v-list-item-content>
                                    <v-list-item-title
                                      v-html="data.item.name"
                                    ></v-list-item-title>
                                    <v-list-item-subtitle
                                      v-html="data.item.department"
                                    ></v-list-item-subtitle>
                                  </v-list-item-content>
                                </template>
                              </v-autocomplete>
                            </v-col>
                            <v-col cols="2">
                              <v-text-field
                                :rules="reqRules"
                                type="number"
                                v-model="data['treatments'][index]['fcc']"
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
                                    :rules="reqRules"
                                    v-model="
                                      data['treatments'][index]['review_date']
                                    "
                                    outlined
                                    label="Next Review Date"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="
                                    data['treatments'][index]['review_date']
                                  "
                                  no-title
                                  scrollable
                                >
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col class="mt-4">
                              <v-btn
                                @click="deleteTreatment(index)"
                                icon
                                v-if="index != 0"
                                small
                                color="error"
                              >
                                <v-icon>mdi-minus</v-icon>
                              </v-btn>
                              <v-btn
                                @click="addTreatment"
                                color="blue"
                                v-if="
                                  index ==
                                  Object.keys(data['treatments']).length - 1
                                "
                                icon
                                small
                              >
                                <v-icon>mdi-plus</v-icon></v-btn
                              >
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="6"> </v-col>
                            <v-col cols="2">
                              <v-text-field
                                readonly
                                outlined
                                label="Total FCC"
                                :value="data['total_fcc_treatments']"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-form>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="e1 = 3"> Back </v-btn>
                        <v-btn
                          color="primary"
                          class="mr-4"
                          @click="e1 = 5"
                          :disabled="!valid[3]"
                        >
                          Next
                        </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
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
                  <v-btn
                    color="primary"
                    class="mr-4"
                    :disabled="loading"
                    :loading="loading"
                    @click="createRisk()"
                  >
                    Submit for Review
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
import constants from "@/service/constants.js";
import { mapGetters } from "vuex";

export default {
  name: "Creator",
  components: {},
  data() {
    return {
      e1: 1,
      valid: [false, false, false, false],
      data: {
        treatments: [
          { plans: "", action_owners: "", fcc: "", review_date: "" },
        ],
        controls: [
          { key_controls: "", control_owners: "", fcc: "", frequencies: "" },
        ],
        residual_risk_exposure: "Class III-Control Critical",
      },
      loading: false,
      date: "",
      menu: false,
      tags: [],
      employees: [],
      options: {},
      risk_exposure: constants.RISK_EXPOSURE,
      reqRules: constants.REQ_RULES,
      snackbar: false,
      multiLine: true,
      text: "",
    };
  },
  watch: {
    data: {
      handler() {
        this.calculateFccControl();
        this.calculateFccTreatment();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(["USERINFO"]),
  },
  created: function () {
    this.getOrganisationVariables();
    this.getOrganisationEmployees();
  },
  methods: {
    getOrganisationVariables() {
      let id = this.USERINFO["organisationId"];
      CreatorAPIS.getOrganisationVariables(id).then((res) => {
        if (res["status"]) {
          this.options = res["data"]["form4"];
        }
      });
    },
    step1() {
      if (this.data["likelihood"] && this.data["impact"]) {
        let first = this.risk_exposure.filter((e) =>
          e.includes(this.data["impact"])
        );
        let second = first.filter((e) => e.includes(this.data["likelihood"]));
        this.data["inherent_risk_exposure"] = second[0][2];
      }
    },
    getOrganisationEmployees() {
      let id = this.USERINFO["organisationId"];
      CreatorAPIS.getEmployeesDropdown(id).then((res) => {
        if (res["status"]) {
          this.employees = res["data"];
        }
      });
    },
    filterObject(item, queryText) {
      return (
        item.name.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1 ||
        item.department
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      );
    },
    addControl() {
      this.data["controls"].push({
        key_controls: "",
        control_owners: "",
        fcc: "",
        frequencies: "",
      });
    },
    deleteControl(i) {
      this.data["controls"].splice(i, 1);
    },
    calculateFccControl() {
      let temp = 0;
      this.data["controls"].forEach((e) => {
        if (e.fcc) {
          temp = parseInt(e.fcc) + temp;
        }
      });
      this.data["total_fcc_controls"] = temp;
    },
    addTreatment() {
      this.data["treatments"].push({
        plans: "",
        action_owners: "",
        fcc: "",
        review_date: "",
      });
    },
    deleteTreatment(i) {
      this.data["treatments"].splice(i, 1);
    },
    calculateFccTreatment() {
      let temp = 0;
      this.data["treatments"].forEach((e) => {
        if (e.fcc) {
          temp = parseInt(e.fcc) + temp;
        }
      });
      this.data["total_fcc_treatments"] = temp;
    },
    createRisk() {
      this.data["organisationId"] = this.USERINFO["organisationId"];
      CreatorAPIS.createRisk(this.data).then((res) => {
        this.loading = true;
        if (res["status"]) {
          this.data = {
            treatments: [
              { plans: "", action_owners: "", fcc: "", review_date: "" },
            ],
            controls: [
              {
                key_controls: "",
                control_owners: "",
                fcc: "",
                frequencies: "",
              },
            ],
            residual_risk_exposure: "Class III-Control Critical",
          };
          this.$refs.form1.reset();
          this.$refs.form2.reset();
          this.$refs.form3.reset();
          this.$refs.form4.reset();
          this.e1 = 1;
        }
        this.loading = false;
        this.text = res["message"];
        this.snackbar = true;
      });
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
</style>
