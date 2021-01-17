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

              <v-divider></v-divider>

              <v-stepper-step step="4"> Edit Variables </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-container>
                  <v-row align="center" justify="center">
                    <v-col cols="12" md="8">
                      <v-card>
                        <v-card-text>
                          <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                              v-model="data['com_name']"
                              :rules="reqRules"
                              label="Company Name"
                            ></v-text-field>

                            <v-select
                              v-model="data['employees']"
                              :items="employees"
                              :rules="reqRules"
                              label="Number of Employees"
                            ></v-select>

                            <v-select
                              v-model="data['country']"
                              :items="countries"
                              :rules="reqRules"
                              label="Country"
                            ></v-select>

                            <v-select
                              v-model="data['currency']"
                              :items="currency"
                              :rules="reqRules"
                              label="Default Currency for Company"
                            ></v-select>

                            <v-text-field
                              v-model="data['turnover']"
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
                          <v-btn color="primary" class="ma-2" @click="e4 = 2">
                            Save & Next
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
                          <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                              v-model="data['high_users']"
                              :rules="reqRules"
                              label="Number of High Impact Users"
                            ></v-text-field>

                            <v-text-field
                              v-model="data['medium_users']"
                              :rules="reqRules"
                              label="Number of Medium Impact Users"
                            ></v-text-field>

                            <v-text-field
                              v-model="data['low_users']"
                              :rules="reqRules"
                              label="Number of Low Impact Users"
                            ></v-text-field>
                          </v-form>
                        </v-card-text>

                        <v-card-actions>
                          <v-btn text @click="e4 = 1"> Back </v-btn>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" class="ma-2" @click="e4 = 3">
                            Save & Next
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
                          <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                              v-model="data['workdays']"
                              :rules="reqRules"
                              label="Workdays per Year"
                              type="number"
                            >
                            </v-text-field>

                            <v-text-field
                              v-model="data['salary_highusers']"
                              :rules="reqRules"
                              label="Average Salary of High Impact Users"
                              type="number"
                            >
                              <v-icon slot="append" color="blue">
                                {{ getIcon() }}
                              </v-icon>
                            </v-text-field>

                            <v-text-field
                              v-model="data['salary_medium_users']"
                              :rules="reqRules"
                              label="Average Salary of Medium Impact Users"
                              type="number"
                            >
                              <v-icon slot="append" color="blue">
                                {{ getIcon() }}
                              </v-icon>
                            </v-text-field>

                            <v-text-field
                              v-model="data['salary_low_users']"
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
                          <v-btn color="primary" class="ma-2" @click="e4 = 4">
                            Save & Next
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-stepper-content>

              <v-stepper-content step="4">
                <v-card class="mb-12" height="200px"></v-card>
                <v-btn color="primary" class="ma-2" @click="e4 = 1">
                  Save
                </v-btn>
                <v-btn text @click="e4 = 3"> Back </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
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
import constants from "@/service/constants.js";

export default {
  name: "Committee",
  components: {},
  data() {
    return {
      data: {},
      valid: false,
      employees: ["1-50", "51-500", "500-1000", "1000+"],
      e4: 1,
      icon: "",
      emailRules: constants.EMAIL_RULES,
      reqRules: constants.REQ_RULES,
      countries: constants.COUNTRIES,
      currency: ["USD", "PKR", "AUD", "GBP"],
      snackbar: false,
      multiLine: true,
      text: "",
    };
  },
  created: function () {
    this.isUserLoggedIn();
  },
  methods: {
    isUserLoggedIn() {},
    getIcon() {
      let currency = this.data["currency"];
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
