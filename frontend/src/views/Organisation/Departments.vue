<template>
  <section>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="blue white--text headline">
              Organsiation Hierarchy View
              <v-spacer></v-spacer>
              <v-btn @click="departmentDialog = true" color="white" class="mr-3"
                >Add Department</v-btn
              >
              <v-btn @click="employeeDialog = true" color="white"
                >Add Employee</v-btn
              >
            </v-card-title>

            <v-row class="pa-4" justify="space-between">
              <v-col cols="5">
                <v-treeview
                  :active.sync="active"
                  :items="items"
                  :load-children="fetchUsers"
                  :open.sync="open"
                  activatable
                  color="warning"
                  open-on-click
                  transition
                >
                  <template v-slot:prepend="{ item }">
                    <v-icon v-if="!item.children"> mdi-account </v-icon>
                  </template>
                </v-treeview>
              </v-col>

              <v-divider vertical></v-divider>

              <v-col class="d-flex text-center">
                <v-scroll-y-transition mode="out-in">
                  <div
                    v-if="!selected"
                    class="title grey--text text--lighten-1 font-weight-light"
                    style="align-self: center"
                  >
                    Select a User
                  </div>
                  <v-card
                    v-else
                    :key="selected.id"
                    class="pt-6 mx-auto"
                    flat
                    max-width="400"
                  >
                    <v-card-text>
                      <v-avatar v-if="avatar" size="88">
                        <v-img
                          :src="`https://avataaars.io/${avatar}`"
                          class="mb-6"
                        ></v-img>
                      </v-avatar>
                      <h3 class="headline mb-2">
                        {{ selected.name }}
                      </h3>
                      <div class="blue--text mb-2">
                        {{ selected.email }}
                      </div>
                      <div class="blue--text subheading font-weight-bold">
                        {{ selected.department }}
                      </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-row class="text-left" tag="v-card-text">
                      <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                        Company:
                      </v-col>
                      <v-col>{{ selected.company }}</v-col>
                      <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                        Position:
                      </v-col>
                      <v-col>
                        {{ selected.position }}
                      </v-col>
                      <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                        Phone:
                      </v-col>
                      <v-col>{{ selected.phone }}</v-col>
                    </v-row>
                  </v-card>
                </v-scroll-y-transition>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="employeeDialog" width="500" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Add Employee</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    solo
                    hide-details
                    label=" Name"
                    v-model="employee['name']"
                    :rules="reqRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    solo
                    hide-details
                    label=" Email"
                    v-model="employee['email']"
                    :rules="reqRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    solo
                    hide-details
                    type="tel"
                    label=" Phone Number"
                    v-model="employee['phone']"
                    :rules="reqRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    solo
                    hide-details
                    label=" Position"
                    v-model="employee['position']"
                    :rules="reqRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    hide-details
                    v-model="employee['department']"
                    :rules="reqRules"
                    :items="departments"
                    label="Department"
                    solo
                  ></v-select>
                </v-col>

                <v-col cols="12" v-if="employee.isUser">
                  <v-select
                    hide-details
                    :rules="reqRules"
                    v-model="employee.views"
                    :items="views"
                    label="ِAccess Level"
                    solo
                  >
                  </v-select>
                </v-col>

                <v-col cols="12">
                  <v-radio-group v-model="employee.isUser" row>
                    <template v-slot:label>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <span
                            class="subtitle-2 font-weight-bold"
                            v-bind="attrs"
                            v-on="on"
                          >
                            Login
                          </span>
                        </template>
                        <span>Allow employee to login and view risks</span>
                      </v-tooltip>
                    </template>
                    <v-radio :value="true">
                      <template v-slot:label>
                        <div>Allow</div>
                      </template>
                    </v-radio>
                    <v-radio :value="false" color="red darken-3">
                      <template v-slot:label>
                        <div>Not Allow</div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="employeeDialog = false">Cancel</v-btn>
          <v-btn
            color="primary"
            :loading="loading"
            :disabled="loading || !valid"
            @click="addEmployee()"
          >
            Add
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="departmentDialog" width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Add Department</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            solo
            hide-details
            label="Department"
            v-model="department"
            :rules="reqRules"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :loading="loading"
            :disabled="loading || !department"
            @click="addDepartment()"
          >
            Add
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
import OrganisationApi from "@/service/apis/organisation.js";
import constants from "@/service/constants.js";
import { mapGetters } from "vuex";

const avatars = [
  "?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban",
  "?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun",
  "?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong",
  "?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair",
  "?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly",
];

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  data() {
    return {
      active: [],
      valid: false,
      avatar: null,
      open: [],
      items: [],
      views: [
        "Risk Creator",
        "Risk Owner",
        "Risk Department",
        "Risk Committee",
        "CEO",
      ],
      loading: false,
      employee: {
        isUser: false,
      },
      department: null,
      employeeDialog: false,
      departmentDialog: false,
      departments: [],
      employees: [],
      reqRules: constants.REQ_RULES,
      snackbar: false,
      text: "",
      multiLine: true,
    };
  },
  computed: {
    ...mapGetters(["ORGANISATIONINFO"]),
    selected() {
      if (!this.active.length) return undefined;

      const id = this.active[0];
      if (id <= 4 && id >= 1) {
        return this.items.find((user) => user.id === id);
      } else {
        return this.items.find((user) => user.id === id);
      }
    },
  },
  watch: {
    selected: "randomAvatar",
  },
  methods: {
    addDepartment() {
      let data = { department: this.department };
      OrganisationApi.addDepartment(data).then((res) => {
        if (res["status"]) {
          this.departmentDialog = false;
          this.department = null;
          this.getDepartments();
        }
        this.loading = false;
        this.text = res["message"];
        this.snackbar = true;
      });
    },
    addEmployee() {
      let data = this.employee;

      data["organisationId"] = this.ORGANISATIONINFO["_id"];

      if (!data["isUser"]) delete data["views"];

      OrganisationApi.addEmployee(this.employee).then((res) => {
        if (res["status"]) {
          this.employeeDialog = false;
          this.$refs.form.reset();
          this.getEmployees();
        }
        this.loading = false;
        this.text = res["message"];
        this.snackbar = true;
      });
    },
    getDepartments() {
      OrganisationApi.getDepartmentsDropdown().then((res) => {
        if (res["status"]) {
          this.departments = res["data"]["departments"];
          this.items = [];
          this.departments.forEach((element) => {
            let data = { name: element, children: [] };
            this.items.push(data);
          });
        }
      });
    },
    getEmployees() {
      OrganisationApi.getEmployees().then((res) => {
        if (res["status"]) {
          this.employees = res["data"];
        }
      });
    },
    async fetchUsers(item) {
     await pause(1500);

      let data = this.employees.filter((e) => e.department == item.name);
      item.children = data;
      return item.children;
    },
    randomAvatar() {
      this.avatar = avatars[Math.floor(Math.random() * avatars.length)];
    },
  },
  created() {
    this.getDepartments();
    this.getEmployees();
  },
};
</script>

<style scoped></style>
