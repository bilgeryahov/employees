<template>
    <div class="col-md-4">
        <div class="employee-card">
            <h4 class="card-title">{{employee.id}}</h4>
            <p class="card-text">{{employee.first_name}}</p>
            <p class="card-text">{{employee.surname}}</p>
        </div>
    </div>    
</template>

<script>
    export default {
        props: ['employee']
    }
</script>