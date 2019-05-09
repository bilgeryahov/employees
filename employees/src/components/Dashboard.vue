<template>
  <div class>
    <h3>Dashboard</h3>
    <button class="btn btn-danger btn-sm signout-btn" @click="signOut">Sign Out</button>
    <div class="row">
      <Employee
        v-for="(employee, index) in this.$store.state.employees"
        :employee="employee"
        v-bind:key="index"
      />
    </div>
  </div>
</template>

<script>
import { firebaseApp, secretRef } from "../firebaseApp";

import Employee from "./Employee.vue";

export default {
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
      firebaseApp.auth().signOut();
    },
    fetchEmployees(params) {
      const url = params.employeesEndpoint;
      const headers = {
        Authorization: params.authorizationHeader,
        "Content-Type": "application/json"
      };
      fetch(url, {
        method: "GET",
        headers
      })
        .then(res => res.json())
        .then(jsonRes => this.$store.dispatch("setEmployees", jsonRes));
    }
  },
  components: {
    Employee
  },
  mounted() {
    secretRef.on("value", snap => this.fetchEmployees(snap.val()));
  }
};
</script>
