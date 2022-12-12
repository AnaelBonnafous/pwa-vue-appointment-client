<script setup lang="ts">
import { reactive } from "vue";

const form = reactive({
  firstname: "",
  lastname: "",
  email: "",
  password: "",
});
</script>

<template>
  <h1>Register</h1>
  <v-form>
    <v-text-field v-model="form.firstname" type="text" placeholder="John" />
    <v-text-field v-model="form.lastname" type="text" placeholder="Doe" />
    <v-text-field
      v-model="form.email"
      type="email"
      placeholder="john.doe@mail.com"
    />
    <v-text-field
      v-model="form.password"
      type="password"
      placeholder="******"
    />
    <v-btn block>submit</v-btn>
  </v-form>
</template>
