<template>
  <section>
    <v-container fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" md="10">
          <v-stepper v-model="e4">
            <v-stepper-header>
              <v-stepper-step step="1"> Company Information </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="2"> Employee Information </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3"> Salary Information </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-container>
                  <v-row align="center" justify="center">
                    <v-col cols="12" md="8">
                      <v-card>
                        <v-card-text>
                          <v-form ref="form" v-model="valid[0]">
                            <v-text-field
                              v-model="organisationInfo['name']"
                              readonly
                              label="Company Name"
                            ></v-text-field>

                            <v-select
                              v-model="form[0]['employees']"
                              :items="employees"
                              :rules="reqRules"
                              label="Number of Employees"
                            ></v-select>

                            <v-select
                              v-model="form[0]['country']"
                              :items="countries"
                              :rules="reqRules"
                              label="Country"
                            ></v-select>

                            <v-select
                              v-model="form[0]['currency']"
                              :items="currency"
                              :rules="reqRules"
                              label="Default Currency for Company"
                            ></v-select>

                            <v-text-field
                              v-model="form[0]['turnover']"
                              :rules="reqRules"
                              label="Annual Company Turnover"
                              type="number"
                            >
                              <v-icon slot="append" color="blue">
                                {{ getIcon() }}
                              </v-icon>
                            </v-text-field>
                          </v-form>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            :loading="loading"
                            class="ma-2"
                            :disabled="loading || !valid[0]"
                            @click="submitForm(0)"
                          >
                            Save & Next
                            <template v-slot:loader>
                              <span class="custom-loader">
                                <v-icon light>mdi-cached</v-icon>
                              </span>
                            </template>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-container>
                  <v-row align="center" justify="center">
                    <v-col cols="12" md="8">
                      <v-card>
                        <v-card-text>
                          <v-form ref="form" v-model="valid[1]">
                            <v-text-field
                              v-model="form[1]['high_users']"
                              :rules="reqRules"
                              label="Number of High Impact Users"
                            ></v-text-field>

                            <v-text-field
                              v-model="form[1]['medium_users']"
                              :rules="reqRules"
                              label="Number of Medium Impact Users"
                            ></v-text-field>

                            <v-text-field
                              v-model="form[1]['low_users']"
                              :rules="reqRules"
                              label="Number of Low Impact Users"
                            ></v-text-field>
                          </v-form>
                        </v-card-text>

                        <v-card-actions>
                          <v-btn text @click="e4 = 1"> Back </v-btn>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            :loading="loading"
                            class="ma-2"
                            :disabled="loading || !valid[1]"
                            @click="submitForm(1)"
                          >
                            Save & Next
                            <template v-slot:loader>
                              <span class="custom-loader">
                                <v-icon light>mdi-cached</v-icon>
                              </span>
                            </template>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-container>
                  <v-row align="center" justify="center">
                    <v-col cols="12" md="8">
                      <v-card>
                        <v-card-text>
                          <v-form ref="form" v-model="valid[2]">
                            <v-text-field
                              v-model="form[2]['workdays']"
                              :rules="reqRules"
                              label="Workdays per Year"
                              type="number"
                            >
                            </v-text-field>

                            <v-text-field
                              v-model="form[2]['salary_high_users']"
                              :rules="reqRules"
                              label="Average Salary of High Impact Users"
                              type="number"
                            >
                              <v-icon slot="append" color="blue">
                                {{ getIcon() }}
                              </v-icon>
                            </v-text-field>

                            <v-text-field
                              v-model="form[2]['salary_medium_users']"
                              :rules="reqRules"
                              label="Average Salary of Medium Impact Users"
                              type="number"
                            >
                              <v-icon slot="append" color="blue">
                                {{ getIcon() }}
                              </v-icon>
                            </v-text-field>

                            <v-text-field
                              v-model="form[2]['salary_low_users']"
                              :rules="reqRules"
                              label="Number of Low Impact Users"
                              type="number"
                            >
                              <v-icon slot="append" color="blue">
                                {{ getIcon() }}
                              </v-icon>
                            </v-text-field>
                          </v-form>
                        </v-card-text>

                        <v-card-actions>
                          <v-btn text @click="e4 = 2"> Back </v-btn>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            :loading="loading"
                            class="ma-2"
                            :disabled="loading || !valid[2]"
                            @click="submitForm(2)"
                          >
                            Save
                            <template v-slot:loader>
                              <span class="custom-loader">
                                <v-icon light>mdi-cached</v-icon>
                              </span>
                            </template>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" width="400" persistent>
      <v-card>
        <v-card-title>Please change your password</v-card-title>
        <v-card-text>
          <v-text-field
            type="password"
            v-model="password"
            label="New Password"
            class="mt-4"
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!password || loading1" @click="change"
            >Change</v-btn
          >
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
import OrganisationApi from "@/service/apis/organisation.js";
import AuthenticationAPIS from "@/service/apis/authentication.js";

export default {
  name: "Details",
  components: {},
  data() {
    return {
      organisationInfo: {},
      userInfo: {},
      password: null,
      form: [{}, {}, {}],
      selected_variables: {},
      valid: [false, false, false],
      employees: ["1-50", "51-500", "500-1000", "1000+"],
      currency: ["USD", "PKR", "AUD", "GBP"],
      e4: 1,
      icon: "",

      // These are Variables constants
      variables: {
        categories: constants.CATEGORIES,
        pillars: constants.PILLARS,
        categories_2: constants.CATEGORIES_2,
        descriptions: constants.DESCRIPTIONS,
        likelihoods: constants.LIKELIHOODS,
        impacts: constants.IMPACTS,
        frequencies: constants.FREQUENCIES,
        ratings: constants.RATINGS,
        statuses: constants.STATUSES,
      },
      // These are views constants
      reqRules: constants.REQ_RULES,
      countries: constants.COUNTRIES,
      dialog: false,
      loading: false,
      loading1: false,
      text: "",
      snackbar: false,
      multiLine: true,
    };
  },
  created: function () {
    this.getOrganisation();
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.userInfo = JSON.parse(localStorage.getItem("organisation"));
      if (this.userInfo["isFirstVisit"]) {
        this.dialog = true;
      }
    },
    getOrganisation() {
      OrganisationApi.getOrganisation().then((resp) => {
        if (resp["status"]) {
          this.organisationInfo = resp["data"];
          if (resp["data"]["form1"]) this.form[0] = resp["data"]["form1"];
          if (resp["data"]["form2"]) this.form[1] = resp["data"]["form2"];
          if (resp["data"]["form3"]) this.form[2] = resp["data"]["form3"];
        }
      });
    },
    getIcon() {
      let currency = this.form[0]["currency"];
      if (currency == "USD") {
        return "mdi-currency-usd";
      } else if (currency == "AUD") {
        return "mdi-currency-usd";
      } else if (currency == "GBP") {
        return "mdi-currency-gbp";
      } else if (currency == "PKR") {
        return "mdi-currency-usd";
      }
    },
    submitForm(i) {
      this.loading = true;
      let data = this.form[i];
      data["id"] = this.organisationInfo["_id"];
      data["form"] = "form" + (i + 1);
      OrganisationApi.updateOrganisation(data).then((resp) => {
        if (resp["status"]) {
          if (i != 2) this.e4 = i + 2;
        }
        this.text = resp["message"];
        this.snackbar = true;
        this.loading = false;
      });
    },
    change() {
      this.loading1 = true;
      AuthenticationAPIS.changePassword({ data: this.password }).then((res) => {
        if (res["status"]) {
          this.dialog = false;
          this.userInfo["isFirstVisit"] = false;
          localStorage.setItem("organisation", JSON.stringify(this.userInfo));
        }
        this.text = res["message"];
        this.snackbar = true;
        this.loading1 = false;
      });
    },
  },
};
</script>

<style lang="sass">
.v-stepper__header
  box-shadow: none !important

.no-bg
  background: none !important

.custom-loader
  animation: loader 1s infinite

@-moz-keyframes loader
  from
  transform: rotate(0)

  to
  transform: rotate(360deg)

@-webkit-keyframes loader
  from
  transform: rotate(0)

  to
  transform: rotate(360deg)

@-o-keyframes loader
  from
  transform: rotate(0)

  to
  transform: rotate(360deg)

@keyframes loader
  from
    transform: rotate(0)

  to
    transform: rotate(360deg)
</style>
