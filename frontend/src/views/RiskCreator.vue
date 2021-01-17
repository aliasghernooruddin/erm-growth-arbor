<template>
  <v-container fluid fill-height class="bg">
    <v-row align="center" justify="center">
      <v-col cols="10">
        <v-tabs
          v-model="tab"
          background-color="blue lighten-2"
          dark
          show-arrows
          next-icon="mdi-arrow-right-bold-box-outline"
          prev-icon="mdi-arrow-left-bold-box-outline"
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="n in tabs" :key="n"> Risk {{ n }} </v-tab>
          <v-btn
            class="ma-2"
            @click="tabs = tabs + 1"
            outlined
            fab
            x-small
            color="white"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="n in tabs" :key="n">
           
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-divider inset></v-divider>
                    <h3
                      class="center font-weight-black grey--text text-darken-1 ma-5"
                    >
                      Risk {{ n }}
                    </h3>
                    <v-divider inset></v-divider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="1">
                    <span> Risk Ref </span>
                  </v-col>
                  <v-col cols="2">
                    <v-select :items="options['ref']" dense outlined></v-select>
                  </v-col>
                  <v-col cols="1">
                    <span> Year </span>
                  </v-col>
                  <v-col cols="2">
                    <v-select
                      :items="options['years']"
                      dense
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="2">
                    <span> Risk Category </span>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      :items="options['category']"
                      dense
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="1">
                    <span> Strategy Pillar </span>
                  </v-col>
                  <v-col cols="5">
                    <v-select
                      :items="options['pillar']"
                      dense
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="2">
                    <span> Risk Category </span>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      :items="options['category2']"
                      dense
                      outlined
                    ></v-select>
                  </v-col> </v-row
                ><v-row>
                  <v-col cols="1">
                    <span> Risk Description </span>
                  </v-col>
                  <v-col cols="11">
                    <v-select
                      :items="options['description']"
                      dense
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12"
                    ><v-divider inset></v-divider>
                    <h3
                      class="center font-weight-black grey--text text-darken-1 ma-5"
                    >
                      Inherent Risk Assessment
                    </h3>
                    <v-divider inset></v-divider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2"><span>Root Causes</span></v-col>
                  <v-col cols="4">
                    <v-text-field dense outlined></v-text-field>
                  </v-col>
                  <v-col cols="2"><span>Consequences</span></v-col>
                  <v-col cols="4">
                    <v-text-field dense outlined></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2"><span>Impact</span></v-col>
                  <v-col cols="4">
                    <v-select
                      :items="options['impact']"
                      dense
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col cols="2"><span>Likelihood</span></v-col>
                  <v-col cols="4">
                    <v-select
                      :items="options['likelihood']"
                      dense
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2"
                    ><span>Estimated financial Impact USD</span>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field type="number" dense outlined></v-text-field>
                  </v-col>
                  <v-col cols="2"><span>Inherent Risk Exposure</span></v-col>
                  <v-col cols="4">
                    <v-text-field
                      value="Class III-Control Critical"
                      dense
                      readonly
                      outlined
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-divider inset></v-divider>
                    <h3
                      class="center font-weight-black grey--text text-darken-1 ma-5"
                    >
                      Current Key Controls
                    </h3>
                    <v-divider inset></v-divider>
                  </v-col>
                </v-row>
                <v-row v-for="index in controls" :key="index">
                  <v-col cols="4">
                    <v-text-field
                      dense
                      outlined
                      placeholder="Key Controls"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="4">
                    <v-select
                      :items="options['owners']"
                      dense
                      placeholder="Control Owners"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-select
                      :items="options['frequency']"
                      dense
                      placeholder="Control Frequency"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="1">
                    <v-btn
                      v-if="index == controls"
                      class="ma-1"
                      @click="
                        controls = controls + 1;
                        moveEnd();
                      "
                      outlined
                      fab
                      x-small
                      color="indigo"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn
                      v-else
                      class="ma-1"
                      @click="controls = controls - 1"
                      outlined
                      fab
                      x-small
                      color="teal"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2"><span>Control Rating</span> </v-col>
                  <v-col cols="4">
                    <v-select
                      :items="options['rating']"
                      dense
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="2"><span>Residual Risk Exposure</span> </v-col>
                  <v-col cols="4">
                    <v-text-field
                      dense
                      outlined
                      value="Class III-Control Critical"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-divider inset></v-divider>
                    <h3
                      class="center font-weight-black grey--text text-darken-1 ma-5"
                    >
                      Treatment Plans
                    </h3>
                    <v-divider inset></v-divider>
                  </v-col>
                </v-row>
                <v-row v-for="index in treatments" :key="index">
                  <v-col cols="4">
                    <v-text-field
                      dense
                      outlined
                      placeholder="Risk Treatment Plan"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="4">
                    <v-select
                      :items="options['owners']"
                      dense
                      placeholder="Action Owners"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      dense
                      outlined
                      placeholder="Timing"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <v-btn
                      v-if="index == treatments"
                      class="ma-1"
                      @click="treatments = treatments + 1"
                      outlined
                      fab
                      x-small
                      color="indigo"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn
                      v-else
                      class="ma-1"
                      @click="treatments = treatments - 1"
                      outlined
                      fab
                      x-small
                      color="teal"
                    >
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3">Risk Treatment Plan Status</v-col>
                  <v-col cols="2">
                    <v-select
                      :items="options['status']"
                      dense
                      outlined
                    ></v-select
                  ></v-col>
                </v-row>
                <v-row>
                  <v-col cols="12"
                    ><v-btn
                      class="float-right ma-4 ml-6"
                      depressed
                      tile
                      color="success"
                      >Create</v-btn
                    >
                    <v-btn
                      class="float-right ma-4 ml-6"
                      depressed
                      tile
                      color="primary"
                      >Save</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
        
          </v-tab-item>
        </v-tabs-items>
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
export default {
  name: "Creator",
  components: {},
  data() {
    return {
      data: {},
      controls: 3,
      treatments: 3,
      tab: null,
      tabs: 1,
      options: {
        ref: ["CP", "PH", "AL", "GL"],
        years: [2017, 2018, 2019, 2020, 2021],
        category: [
          "Governance, Legal & Compliance and Reporting",
          "Operations & Infraorganisation",
          "Strategy & Planning",
        ],
        pillar: [
          "Exploration & Growth",
          "Operational & Capital Excellence",
          "Marketing & Sales",
          "HR",
        ],
        category2: [
          "Expansions & Investments",
          "Schedule/Costs (Projects)",
          "Capital & Operating Budget ",
          "Life of Mines & Plants",
          "Price & Demand",
          "Corporate Social Responsibility & Sustainability (CSR)",
          "Political & Government Relations",
          "Financial",
          "Envoinment",
          "Health & Safety",
          "Exploration (Resources & Reserves)",
          "Production",
          "Supply Chain & Logistics",
          "Sales, Marketing & Customer Interaction",
          "Legal & Compliance",
          "Human Resources",
          "Exploration & Mining Licenses",
          "Mergers & Acquisitions",
          "Strategy & Business Planning",
        ],
        description: [
          "No Selection",
          "Risk 2",
          "Exploration & mining licenses not granted for new territories or revoked for existing territories",
          "Failure of exploration to: a) Add/secure new resources, b) Extend life of existing mines (LOM)",
          "Lack of high cost smelter curtailments (Specially in China)",
          "Execution & completion of capital projects within time and cost",
          "Inability to achieve production & growth targets ",
          "Loosing social license to operate",
          "Improper project closeout, handover & operations readiness",
          "Uncertainty with geological resource estimation for new project.",
          "Automotive growth in US & Europe doesn’t materializes",
          "Insurable risks not insured",
          "Beneficiation Plant is not producing Rock Phosphate in sufficient quantity and Quality",
          "Plant Performance is inadequate to meet the production target as per the design",
          "Inability to meet customer requirements",
          "Non-availability of Critical materials/Services or concentration of suppliers",
          "Uninterrupted Power supply",
          "Lack of a proper employee documentation/archiving system that prevent information losses and insecurity",
          "Security Risk (inadequate security arrangements & permits)",
          "Cash Shortage",
          "Caustic Supply to Refinery",
          "Commissioning and Production Risk Rolling Mill ",
          "New Regulation",
          "Diminishing head grades/low grades of mineralization (Grade erosion/depletion)",
          "Mined Ore Delivery ",
          "Utilizing the cash disbursed through advance payment to vendors.",
          "Adverse environmental incident",
          "Non - performance of Insurance to mitigate identified and insured risk (other affiliates)",
          "Failure to renew the insurance policies on a timely basis (other affiliates)",
          "​Delay in claims processing and payments",
          "Information systems are vulnerable to breach of security and inappropriate discloser of sensitive information to unauthorized personnel",
          "​Health & safety breach resulting in personnel injury or casualty",
          "Failure to sustain IT services",
          "Inadequate alignment between business requirement & IT",
          "Inadequate segregation of duties between IT Application Team",
          "Adequate IT governance framework​",
          "Rising costs (cost inflation)",
          "Inadequate Control over Software Licenses expose Ma'aden to legal implication of unauthorized use of unlicensed Software.",
          "Cash/fund management & cost of funding",
          "Availability of sufficient water supplies",
          "Inadequate process to handle emergency changes to the systems",
          "Marketability (Inability to market and sell our products effectively)",
          "Commodity price fluctuations",
          "Inability to attract, develop & retain human resources (Skills shortage)",
        ],
        likelihood: [
          "1 - Rare",
          "2- Unlikely",
          "3- Possible",
          "4- Likely",
          "5- Almost Certain",
        ],
        impact: [
          "1- Very Low",
          "2- Low",
          "3- Moderate",
          "4- High",
          "5- Very High",
        ],
        frequency: ["Daily", "Weekly", "Monthly ", "Quarterly", "Yearly"],
        owners: ["Aliasgher", "Kumail"],
        rating: [
          "Adequate-Excellent - 1 - Effective and efficient systems and processes adequately mitigate the risk",
          "Adequate-Good - 2-4 - Systems and processes exist which adequately mitigate the risk",
          "Inadequate-Partial - 5-7 - Systems and processes exist which only partially mitigates the risk",
          "Inadequate-Poor - 8-9 - Systems and processes exist but do not mitigate the risk",
          "Inadequate-Unsatisfactory - 10 - No systems and processes exist to manage the risk",
        ],
        status: ["On Track", "Off Track"],
      },
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

<style>
.bg{
  background: #eeeeee;
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


