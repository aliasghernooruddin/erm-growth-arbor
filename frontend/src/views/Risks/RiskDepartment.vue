<template>
  <section>
    <v-container v-if="risks">
      <v-row justify="center" align="center">
        <v-col cols="12" md="10">
          <v-card>
            <v-card-title>
              Risks
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="risks" :search="search">
              <template v-slot:item.risk_owner="{ item }">
                {{ item.risk_owner.name }}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn @click="openRisk(item)" color="primary" icon>
                  <v-icon>mdi-open-in-new</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" width="1200">
      <v-card v-if="dialog">
        <v-card-title class="headline"
          >{{ risk.title }} <v-spacer> </v-spacer>
          <v-chip color="primary">{{ risk.level }}</v-chip>
        </v-card-title>
        <v-card-text>
          <v-container class="subtitle-1 gray--text">
            <v-row>
              <v-col cols="12">
                <h2 class="center font-weight-black grey--text mb-5">
                  Risk Details
                </h2>
              </v-col>
              <v-col cols="12" md="6">Category: {{ risk.category }}</v-col>
              <v-col cols="12" md="6"
                >Sub Category: {{ risk.sub_category }}</v-col
              >
              <v-col cols="12" md="6">Impact: {{ risk.impact }}</v-col>
              <v-col cols="12" md="6">Likelihood: {{ risk.likelihood }}</v-col>
              <v-col cols="12" md="6"
                >Inherent Risk Exposure:
                {{ risk.inherent_risk_exposure }}</v-col
              >
            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-row>
              <v-col cols="12">
                <h2 class="center font-weight-black grey--text mb-5">
                  Inherent Risk Assessment
                </h2>
              </v-col>
              <v-col cols="12" md="6">Causes: {{ risk.causes }}</v-col>
              <v-col cols="12" md="6"
                >Consequences: {{ risk.consequences }}</v-col
              >
              <v-col cols="12" md="6"
                >Financial Impact: {{ risk.financial_impact }}</v-col
              >
              <v-col cols="12" md="6"
                >Risk Owner: {{ risk.risk_owner.name }}</v-col
              > </v-row
            ><v-divider class="my-5"></v-divider>
            <v-row>
              <v-col cols="12">
                <h2 class="center font-weight-black grey--text mb-5">
                  Current Mitigation Controls, Aggregate Financial Cost Control
                </h2>
              </v-col>
              <template v-for="control in risk.controls">
                <v-col cols="12" md="4" :key="control.key_controls"
                  >Key Controls: {{ control.key_controls }}</v-col
                >
                <v-col cols="12" md="4" :key="control.control_owners"
                  >Control Owner: {{ control.control_owners }}</v-col
                >
                <v-col cols="12" md="1" :key="control.fcc"
                  >FCC: {{ control.fcc }}</v-col
                >
                <v-col cols="12" md="3" :key="control.frequencies">
                  Review Frequency: {{ control.frequencies }}</v-col
                >
              </template>
              <v-col cols="12" md="8"
                >Residual Risk Exposure:
                {{ risk.residual_risk_exposure }}</v-col
              >
              <v-col cols="12" md="4"
                >Total FCC: {{ risk.total_fcc_controls }}</v-col
              >
            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-row>
              <v-col cols="12">
                <h2 class="center font-weight-black grey--text mb-5">
                  Treatment Plans
                </h2>
              </v-col>
              <template v-for="treatment in risk.treatments">
                <v-col cols="12" md="4" :key="treatment.plans"
                  >Treatment Plans: {{ treatment.plans }}</v-col
                >
                <v-col cols="12" md="4" :key="treatment.action_owners"
                  >Action Owner: {{ treatment.action_owners }}</v-col
                >
                <v-col cols="12" md="1" :key="treatment.fcc"
                  >FCC: {{ treatment.fcc }}</v-col
                >
                <v-col cols="12" md="3" :key="treatment.review_date"
                  >Review Date:
                  {{
                    treatment.review_date | moment("dddd, MMMM Do YYYY")
                  }}</v-col
                >
              </template>
              <v-col cols="12" md="6"
                >Total FCC: {{ risk.total_fcc_treatments }}</v-col
              >
            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-row>
              <v-col cols="12">
                <h2 class="center font-weight-black grey--text mb-5">
                  Tags & Documents
                </h2>
              </v-col>
              <v-col cols="12" md="6"
                >Tags:
                <span v-for="tag in risk.tags" :key="tag">{{ tag }}</span>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider v-if="show" class="my-5"></v-divider>
        <v-card-actions v-if="show">
          <v-spacer></v-spacer>
          <v-btn depressed tile color="primary" @click="isApprove = true"
            >Approve</v-btn
          >
          <v-btn depressed tile color="error" @click="isReject = true"
            >REJECT</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isApprove" width="400">
      <v-card>
        <v-card-title> Forward to Risk Committee </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed @click="isApprove = false"> No </v-btn>
          <v-btn depressed @click="submit('approve')" :loading="loading"
            >yes</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isReject" width="500">
      <v-card>
        <v-card-title>Rejection Reason</v-card-title>
        <v-card-text>
          <v-text-field
            solo
            placeholder="Comments Please"
            v-model="comments"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
           <v-spacer></v-spacer>
          <v-btn depressed @click="isReject = false"> No </v-btn>
          <v-btn
            depressed
            @click="submit('reject')"
            :disabled="loading || !comments"
            :loading="loading"
            >yes</v-btn
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
import DepartmentAPIs from "@/service/apis/department.js";
import { mapGetters } from "vuex";

export default {
  name: "Owner",
  data() {
    return {
      search: "",
      calories: "",
      risks: [],
      risk: {},
      headers: [
        {
          text: "Title",
          value: "title",
        },
        {
          text: "Category",
          value: "category",
        },
        {
          text: "Level",
          value: "level",
        },
        {
          text: "Risk Owner",
          value: "risk_owner",
        }, {
          text: "Status",
          value: "isApproved",
        },
        { text: "", value: "actions", sortable: false },
      ],
      isApprove: false,
      isReject: false,
      dialog: false,
      comments: "",
      loading: false,
      text: "",
      snackbar: false,
      multiLine: true,
    };
  },
  computed: {
    ...mapGetters(["USERINFO"]),
    show() {
      if (this.risk["level"] == "Risk Department") return true;
      else return false;
    },
  },
  methods: {
    getRisks() {
      let id = this.USERINFO["organisationId"];
      DepartmentAPIs.getRisks(id).then((res) => {
        if (res["status"]) {
          this.risks = res["data"];
        }
      });
    },
    openRisk(item) {
      this.risk = item;
      this.dialog = true;
    },
    submit(type) {
      this.loading = true;
      let data = {
        _id: this.risk["_id"],
        type,
        comments: this.comments,
      };
      DepartmentAPIs.updateRisk(data).then((res) => {
        if (res["status"]) {
          this.comments = "";
          this.isApprove = false;
          this.isReject = false;
          this.dialog = false;
          this.getRisks();
        }
        this.loading = false;
        this.text = res["message"];
        this.snackbar = true;
      });
    },
  },
  created() {
    this.getRisks();
  },
};
</script>
<style>
</style>
bundleRenderer.renderToStream