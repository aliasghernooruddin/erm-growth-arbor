<template>
  <section>
    <v-toolbar class="no-bg" flat>
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
                <h1 class="center heading">Admin Login</h1>
                <v-row>
                  <v-col cols="12">
                    <label for="email">Email</label>
                    <v-text-field
                      @keyup.enter="login"
                      outlined
                      v-model="email"
                      :rules="emailRules"
                    />
                  </v-col>
                  <v-col cols="12">
                    <label for="password">Password</label>
                    <v-text-field
                      @keyup.enter="login"
                      outlined
                      v-model="password"
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
import constants from "@/service/constants.js";

export default {
  name: "AdminLogin",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      show1: false,
      emailRules: constants.EMAIL_RULES,
      reqRules: constants.REQ_RULES,
      snackbar: false,
      multiLine: true,
      text: "",
    };
  },
  created: function () {},
  methods: {
    login: function () {
      if (this.$refs.form.validate()) {
        this.loading = true;
        if (this.email == "admin@admin.com" && this.password == "12345678") {
          localStorage.setItem("admin", true);
          this.$router.push("/admin-home");
          return;
        }
        this.text = "Invalid Credentials";
        this.snackbar = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style>
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
}

.no-bg {
  background: none !important;
  padding-top: 30px;
}

.text {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #292d34;
  margin-right: 20px;
  letter-spacing: 1px;
  color: grey;
}

.v-text-field {
  border-radius: 7px !important;
}

input,
.v-select__selection {
  font-weight: 600 !important;
}
</style>
