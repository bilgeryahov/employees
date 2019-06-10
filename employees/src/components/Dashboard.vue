<template>
  <div class>
    <h3>Dashboard.</h3>
    <button class="btn btn-danger btn-sm signout-btn" @click="signOut">Sign Out</button>
    <div id="vue-table" v-if="this.$store.state.employees[0]">
      <input type="text" v-model="search" class="form-control">
      <table class="table table-striped">
        <thead>
          <tr>
            <th
              v-for="(employee_attribute, index) in Object.keys(this.$store.state.employees[0])"
              v-bind:key="index"
              @click="setSortValue(employee_attribute)"
              v-bind:style="{cursor: 'pointer'}"
            >{{ employee_attribute }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(employee, index) in filteredEmployees"
            v-bind:key="index"
            @click="setEmployeeForDetails(employee)"
            v-bind:style="{cursor: 'pointer'}"
          >
            <td>{{ employee.first_name }}</td>
            <td>{{ employee.id }}</td>
            <td>{{ employee.surname }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>
    <p>{{ error.message }}</p>
    <br>
  </div>
</template>

<script>
import { firebaseApp } from "../firebaseApp";
import { SERVICE_URL } from "../configs";
import { EMPLOYEE_ROUTE } from "../routes";
import * as mutationTypes from "../store/mutation-types";

export default {
  data() {
    return {
      error: {
        message: ""
      },
      search: "",
      sortValue: ""
    };
  },
  computed: {
    filteredEmployees() {
      return this.search
        ? this.doSort(
            this.$store.state.employees.filter(
              employee =>
                employee.first_name.toLowerCase().includes(this.search) ||
                employee.surname.toLowerCase().includes(this.search)
            )
          )
        : this.doSort(this.$store.state.employees);
    }
  },
  methods: {
    doSort(arr) {
      if (this.sortValue) {
        return arr.sort((a, b) => {
          if (typeof a[this.sortValue] === "string") {
            return a[this.sortValue].localeCompare(b[this.sortValue]);
          }
          return a[this.sortValue] - b[this.sortValue];
        });
      }
      return arr;
    },
    setSortValue(value) {
      this.sortValue = value;
    },
    signOut() {
      this.$store.dispatch("signOut");
      firebaseApp.auth().signOut();
    },
    setEmployeeForDetails(employee) {
      this.$store
        .dispatch("setEmployeeForDetails", employee)
        .then(this.$router.push(EMPLOYEE_ROUTE + "/" + employee.id));
    },
    fetchEmployees() {
      fetch(SERVICE_URL + "/getAll", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.fetchedIdToken
        }
      })
        .then(res => res.json())
        .then(jsonRes => this.$store.dispatch("setEmployees", jsonRes))
        .catch(error => (this.error = error));
    }
  },
  mounted() {
    if (this.$store.state.user) {
      this.fetchEmployees();
    } else {
      this.$store.subscribe(mutation => {
        if (mutation.type === mutationTypes.SIGN_IN) {
          this.fetchEmployees();
        }
      });
    }
  }
};
</script>
