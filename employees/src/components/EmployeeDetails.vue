<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{this.employeeDetails.first_name}}</h5>
      <p class="card-text">Some quick info for this employee.</p>
    </div>
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item"
        v-for="(employee_detail, index) in Object.keys(this.employeeDetails)"
        v-bind:key="index"
      >{{employee_detail}} - {{employeeDetails[employee_detail]}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["employeeDetails"]
};
</script>