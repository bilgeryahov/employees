<template>
  <div class>
    <h3>Dashboard</h3>
    <button class="btn btn-danger btn-sm signout-btn" @click="signOut">Sign Out</button>
    {{$store.state}}
  </div>
</template>

<script>
import { firebaseApp, secretRef } from "../firebaseApp";

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
        .then(jsonRes => console.log(jsonRes));
    }
  },
  mounted() {
    secretRef.on("value", snap => this.fetchEmployees(snap.val()));
  }
};
</script>
