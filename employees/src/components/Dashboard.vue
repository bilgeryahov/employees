<template>
  <div class>
    <h3>Dashboard</h3>
    <button class="btn btn-danger btn-sm signout-btn" @click="signOut">Sign Out</button>
    <div class="row row-employees">
      <Employee
        v-for="(employee, index) in this.$store.state.employees"
        :employee="employee"
        v-bind:key="index"
      />
    </div>
    <br>
    <p>{{ error.message }}</p>
    <br>
  </div>
</template>

<script>
import { firebaseApp } from "../firebaseApp";
import { SERVICE_URL } from "../configs";

import * as mutationTypes from "../store/mutation-types";

import Employee from "./Employee.vue";

export default {
  data() {
    return {
      error: {
        message: ""
      }
    };
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
      firebaseApp.auth().signOut();
    },
    fetchEmployees(token) {
      fetch(SERVICE_URL + "/getAll", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      })
        .then(res => res.json())
        .then(jsonRes => this.$store.dispatch("setEmployees", jsonRes))
        .catch(error => (this.error = error));
    }
  },
  components: {
    Employee
  },
  beforeCreate() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === mutationTypes.SIGN_IN) {
        this.$store.state.user
          .getIdToken(true)
          .then(token => this.fetchEmployees(token))
          .catch(error => (this.error = error));
      }
    });
  }
};
</script>
