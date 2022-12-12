<script setup lang="ts">
import { reactive } from "vue";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { updateCurrentUserProfile } from "vuefire";
import { auth } from "@/plugins/firebase";

const form = reactive({
  firstname: "",
  lastname: "",
  email: "",
  password: "",
});

const register = async () => {
  try {
    await createUserWithEmailAndPassword(auth, form.email, form.password);

    await signInWithEmailAndPassword(auth, form.email, form.password);

    await updateCurrentUserProfile({
      displayName: `${form.firstname} ${form.lastname}`,
    });
  } catch (error) {
    //
  }
};
</script>

<template>
  <h1>Register</h1>
  <v-form @submit.prevent="register">
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
    <v-btn type="submit" block>submit</v-btn>
  </v-form>
</template>
