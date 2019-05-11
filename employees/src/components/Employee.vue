<template>
  <div class>
    <h3>Employee.</h3>
    <div v-if="this.employeeDetails">
      <EmployeeDetails :employeeDetails="this.employeeDetails"/>
    </div>
    <button class="btn btn-danger btn-sm signout-btn" @click="signOut">Sign Out</button>
    <br>
    <p>{{ error.message }}</p>
    <br>
  </div>
</template>

<script>
import { firebaseApp } from "../firebaseApp";
import { SERVICE_URL } from "../configs";
import * as mutationTypes from "../store/mutation-types";
import EmployeeDetails from "./EmployeeDetails.vue";

export default {
  data() {
    return {
      error: {
        message: ""
      },
      employeeDetails: null
    };
  },
  components: {
    EmployeeDetails
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
      firebaseApp.auth().signOut();
    },
    fetchEmployeeDetails() {
      fetch(
        SERVICE_URL + "/getOne?id=" + this.$store.state.empoyee_for_details.id,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + this.$store.state.user.fetchedIdToken
          }
        }
      )
        .then(res => res.json())
        .then(jsonRes => (this.employeeDetails = jsonRes))
        .catch(error => (this.error = error));
    }
  },
  mounted() {
    if (this.$store.state.empoyee_for_details) {
      this.fetchEmployeeDetails();
    } else {
      this.$store.subscribe(mutation => {
        if (mutation.type === mutationTypes.SET_EMPLOYEE_FOR_DETAILS) {
          this.fetchEmployeeDetails();
        }
      });
    }
  }
};
</script>
