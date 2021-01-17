<template>
  <v-app>
    <v-main class="parallax">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>


<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
.parallax {
  background: url("~@/assets/auth-bg.svg") bottom/cover no-repeat !important;
  height: 100%;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.center {
  text-align: center;
}

@media only screen and (max-device-width: 1366px) {
  .parallax {
    background-attachment: scroll;
  }
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

@media only screen and (min-width: 1900px) {
  .sign-in-btn {
    font-size: 40px;
    padding: 25px;
    width: 65%;
  }
}
</style>
