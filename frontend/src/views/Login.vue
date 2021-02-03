<template>
  <section>
    <v-toolbar flat>
      <v-toolbar-title>
        <v-img :src="require('@/assets/logo.png')" class="logo"></v-img>
      </v-toolbar-title>
    </v-toolbar>

    <v-container fluid fill-height>
      <v-row align="center" justify="center" id="row">
        <v-col cols="12" md="5">
          <div class="content-box col-md-10">
            <v-form ref="form">
              <v-container fluid>
                <h1 class="center heading">Welcome back!</h1>
                <v-row>
                  <v-col cols="12">
                    <label for="email">Email</label>
                    <v-text-field
                      id="email"
                      outlined
                      hide-details
                      v-model="data['email']"
                      :rules="emailRules"
                    />
                  </v-col>
                  <v-col cols="12">
                    <label for="password">Password</label>
                    <v-text-field
                      outlined
                      id="password"
                      hide-details
                      v-model="data['password']"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="reqRules"
                      :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12 center">
                    <v-btn
                      class="sign-in-btn"
                      color="primary"
                      :loading="loading"
                      :disabled="loading"
                      @click="login()"
                    >
                      Login
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>mdi-cached</v-icon>
                        </span>
                      </template>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </div>
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
import AuthenticationAPIS from "@/service/apis/authentication.js";
import constants from "@/service/constants.js";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      data: {
        email: "",
        password: "",
      },
      loading: false,
      show1: false,
      emailRules: constants.EMAIL_RULES,
      reqRules: constants.REQ_RULES,
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
    login: function () {
      if (this.$refs.form.validate()) {
        this.loading = true;
        AuthenticationAPIS.login(this.data).then((resp) => {
          if (resp["status"]) {
            if (resp["isHead"]) {
              localStorage.setItem("organisation", true);
              this.$router.push("organisation/details");
            } else {
              let view = resp["views"];
              localStorage.setItem("views", view);
              if (view == "Risk Creator") this.$router.push("portal/creator");
              if (view == "Risk Department")
                this.$router.push("portal/department");
              if (view == "Risk Owner") this.$router.push("portal/owner");
              if (view == "Risk Committee")
                this.$router.push("portal/committee");
              if (view == "CEO") this.$router.push("portal/ceo");
            }
          } else {
            this.text = resp.message;
            this.snackbar = true;
          }
          this.loading = false;
        });
      }
    },
  },
};
</script>

<style scoped>
#row {
  height: 87vh;
}

.title {
  font-size: 2rem !important;
  margin: 20px;
}

.content-box {
  background: #fff;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: 0 25px 75px rgba(16, 30, 54, 0.25);
}

.sign-in-btn {
  letter-spacing: 2px;
  font-size: 17px !important;
  height: 55px !important;
  width: 55%;
  line-height: 32px;
  outline: none;
  transition: background-color 0.2s linear, color 0.2s linear,
    border-color 0.2s linear;
}

.sign-in-btn:hover {
  background-color: #8395f1 !important;
  color: #000000 !important;
  transition: 0.5s;
  opacity: 1;
}

.btn:hover {
  background-color: #8395f1 !important;
  color: #000000 !important;
  transition: 0.5s;
  opacity: 1;
}

.center {
  text-align: center;
}

label {
  color: black;
  font-size: 1rem;
  font-weight: 500 !important;
  padding: 0 0 8px 2px;
}

.heading {
  font-weight: 700;
  font-size: 32px;
  line-height: 46px;
  color: #292d34;
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  width: 100px;
  margin-left: 15px;
  margin-top: 70px;
}

.v-text-field {
  border-radius: 7px !important;
}
</style>
